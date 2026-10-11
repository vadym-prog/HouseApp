import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
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

          <Link to="/auth" className={styles.userProfile} title="Особистий кабінет">
            <div className={styles.avatarWrapper}>
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1Xvsc_93oFqSnauAp5IVQNZ060MQM2fk7ENYui9h9Doqrms9Q1An_AyUnNX0QafrbPqs3xDSqOHbxhZkumc8EZlidbsxNBitNlvTQX45B5nelOhjI2EAFDQzMWtUMO-XsLjhimgdCEMoMR2EudWXzn8o89qqYMAXS_XWChKLqJrK57sibKH_TKMEd9j7p2KEitcWNexrWHyL-5xO7PYqqX11JnqaoWxaz679trS2V-jOx4YQJoRKk8q0mU"
                alt="Профіль"
                className={styles.avatar}
              />
              <span className={styles.onlineIndicator} />
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Олександр</span>
              <span className={styles.userCity}>Київ</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
