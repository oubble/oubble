import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { useTheme } from "@/app/theme-context";
import { useAuth } from "@/app/auth-context";
import { iconSwap, iconSlot } from "@/styles/motion.css";
import { NAV_ITEMS } from "./nav";
import * as styles from "./AppShell.css";

function titleFor(pathname: string): string {
  const item = NAV_ITEMS.find(
    (n) => n.to === pathname || (n.to !== "/" && pathname.startsWith(n.to)),
  );
  return item?.label ?? "Oubble";
}

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { signOut } = useAuth();
  const { pathname } = useLocation();

  return (
    <div className={styles.shell}>
      {menuOpen && (
        <div className={styles.scrim} onClick={() => setMenuOpen(false)} />
      )}

      <aside className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.brand}>
          <Logo className={styles.brandLogo} />
        </div>

        <nav className={styles.navList}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className={styles.main}>
        <header className={styles.header}>
          <button
            className={styles.menuButton}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            <span className={iconSwap} data-state={menuOpen ? "b" : "a"}>
              <span className={iconSlot} data-icon="a">
                <Icon name="columns" />
              </span>
              <span className={iconSlot} data-icon="b">
                <Icon name="close" />
              </span>
            </span>
          </button>
          <h1 className={styles.headerTitle}>{titleFor(pathname)}</h1>
          <button
            className={styles.iconButton}
            onClick={toggle}
            aria-label="Alternar tema"
          >
            <span className={iconSwap} data-state={theme === "light" ? "a" : "b"}>
              <span className={iconSlot} data-icon="a">
                <Icon name="moon" />
              </span>
              <span className={iconSlot} data-icon="b">
                <Icon name="sun" />
              </span>
            </span>
          </button>
          <button
            className={styles.iconButton}
            onClick={() => void signOut()}
            aria-label="Sair"
            title="Sair"
          >
            <Icon name="logout" />
          </button>
        </header>

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
