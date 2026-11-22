import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { useAuth } from "../features/auth/hooks/useAuth";
import styles from "./Header.module.css";

const DEFAULT_AVATAR =
  "https://lh3.googleusercontent.com/aida/AEtjO1Xvsc_93oFqSnauAp5IVQNZ060MQM2fk7ENYui9h9Doqrms9Q1An_AyUnNX0QafrbPqs3xDSqOHbxhZkumc8EZlidbsxNBitNlvTQX45B5nelOhjI2EAFDQzMWtUMO-XsLjhimgdCEMoMR2EudWXzn8o89qqYMAXS_XWChKLqJrK57sibKH_TKMEd9j7p2KEitcWNexrWHyL-5xO7PYqqX11JnqaoWxaz679trS2V-jOx4YQJoRKk8q0mU";

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Brand & Logo */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logoLink}>
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1WIzBQkPNS1kbD22rUDUpG1rIhjc8k4UnCathTz-85RbcD_vpQlQBzmBrsuvKgGi4gi5KTlHZ7Ii8DYZ0P0NxhhqmrIaMBVo8aplY_nKLjuKyMhVPmjsBxQEHSp9FopAA8d1BjkRAsyOuaL2ZQWmqB0Z4ddPBzPLgL6l684iYDl8HvS4ls2db6x6SqEClLXBncFNbaFRDTaxAFUgvbVdBnXRpY-xpVSCmfT0UxVLvM2hXWay7VClVvDRJk"
              alt="МайстерДім"
              className={styles.logoImage}
            />
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
                <div className={styles.avatarWrapper}>
                  <img
                    src={user.avatarUrl || DEFAULT_AVATAR}
                    alt={user.name}
                    className={styles.avatar}
                  />
                  <span className={styles.onlineIndicator} />
                </div>
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
                <div className={styles.avatarWrapper}>
                  <img src={DEFAULT_AVATAR} alt="Профіль" className={styles.avatar} />
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
