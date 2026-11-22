import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { Logo } from "../components/ui/Logo";
import { UserAvatar } from "../components/ui/UserAvatar";
import { useAuth } from "../features/auth/hooks/useAuth";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Brand & Logo */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logoLink}>
            <Logo size="sm" />
            <span className={styles.brandTitle}>МайстерДім</span>
          </Link>
          <Badge variant="pro">PRO</Badge>
        </div>

        {/* Navigation Bar (4 Views) */}
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`.trim()
            }
          >
            Головна
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`.trim()
            }
          >
            Послуги
          </NavLink>
          <NavLink
            to="/booking"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`.trim()
            }
          >
            Виклик майстра
          </NavLink>
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`.trim()
            }
          >
            Вхід / Реєстрація
          </NavLink>
        </nav>

        {/* Action & Profile */}
        <div className={styles.rightSection}>
          <a href="tel:0800334050" className={styles.phoneLink}>
            <span className={`material-symbols-outlined ${styles.phoneIcon}`}>call</span>
            <span>0 800 33-40-50</span>
          </a>

          {isAuthenticated && user ? (
            <>
              <Link to="/auth" className={styles.userProfile} title="Особистий кабінет">
                <UserAvatar src={user.avatarUrl} alt={user.name} size="sm" showOnline />
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{user.name}</span>
                  <span className={styles.userCity}>{user.city || "Ужгород"}</span>
                </div>
              </Link>
              <button
                type="button"
                onClick={logout}
                className={styles.logoutBtn}
                title="Вийти з акаунту"
                aria-label="Вийти"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  logout
                </span>
                <span className={styles.logoutText}>Вийти</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className={styles.loginBtn}
                id="header-login-btn"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  login
                </span>
                <span>Увійти</span>
              </button>
              <Link to="/auth" className={styles.userProfile} title="Особистий кабінет">
                <UserAvatar size="sm" showOnline={false} alt="Особистий кабінет" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
