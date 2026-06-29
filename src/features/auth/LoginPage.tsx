import { useState } from "react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/app/auth-context";
import * as styles from "./LoginPage.css";

function GoogleMark() {
  return (
    <svg className={styles.gIcon} viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72A5.41 5.41 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}

const ERROR_COPY: Record<string, string> = {
  "auth/popup-closed-by-user": "Você fechou a janela antes de entrar.",
  "auth/cancelled-popup-request": "Tente entrar de novo.",
  "auth/popup-blocked": "O navegador bloqueou a janela. Libere os pop-ups e tente de novo.",
};

export function LoginPage() {
  const { signInWithGoogle } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function enter() {
    setBusy(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      const code = (err as { code?: string })?.code ?? "";
      setError(ERROR_COPY[code] ?? "Não deu pra entrar agora. Tente de novo.");
      setBusy(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Logo className={styles.logo} />
        <div>
          <h1 className={styles.title}>Bem-vindo de volta</h1>
          <p className={styles.subtitle}>
            Entre com sua conta Google para abrir seu painel de prospecção.
          </p>
        </div>
        <button className={styles.googleButton} onClick={enter} disabled={busy}>
          <GoogleMark />
          {busy ? "Entrando…" : "Continuar com o Google"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export function NoAccessPage() {
  const { user, signOut } = useAuth();
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Logo className={styles.logo} />
        <div>
          <h1 className={styles.title}>Sem acesso</h1>
          <p className={styles.subtitle}>
            A conta {user?.email ?? "atual"} não está autorizada a usar o Oubble.
            Fale com quem te convidou para liberar seu acesso.
          </p>
        </div>
        <button className={styles.signOut} onClick={() => void signOut()}>
          Sair e tentar com outra conta
        </button>
      </div>
    </div>
  );
}
