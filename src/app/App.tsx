import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { AppShell } from "@/components/AppShell";
import { HomePage } from "@/features/home/HomePage";
import { SearchPage } from "@/features/search/SearchPage";
import { ClientsPage } from "@/features/clients/ClientsPage";
import { LeadPage } from "@/features/clients/LeadPage";
import { SearchesPage } from "@/features/searches/SearchesPage";
import { MessagesPage } from "@/features/messages/MessagesPage";
import { SettingsPage } from "@/features/settings/SettingsPage";
import { LoginPage, NoAccessPage } from "@/features/auth/LoginPage";
import { Spinner } from "@/components/State";
import { useAuth } from "@/app/auth-context";
import { api, ApiError } from "@/lib/api";

type Access = "checking" | "allowed" | "denied";

export function App() {
  const { user, loading } = useAuth();
  const [access, setAccess] = useState<Access>("checking");

  useEffect(() => {
    if (!user) {
      setAccess("checking");
      return;
    }
    let active = true;
    setAccess("checking");
    api
      .me()
      .then(() => active && setAccess("allowed"))
      .catch((err) => {
        if (!active) return;
        // Só barra de fato quando o servidor nega acesso (403). Erros de rede
        // deixam o app abrir — as telas tratam a falha por conta própria.
        setAccess(err instanceof ApiError && err.status === 403 ? "denied" : "allowed");
      });
    return () => {
      active = false;
    };
  }, [user]);

  if (loading) return <Spinner label="Carregando" />;
  if (!user) return <LoginPage />;
  if (access === "checking") return <Spinner label="Entrando" />;
  if (access === "denied") return <NoAccessPage />;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="buscar" element={<SearchPage />} />
          <Route path="clientes" element={<ClientsPage />} />
          <Route path="clientes/:id" element={<LeadPage />} />
          <Route path="historico" element={<SearchesPage />} />
          <Route path="mensagens" element={<MessagesPage />} />
          <Route path="ajustes" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
