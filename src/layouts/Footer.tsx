import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={styles.brand}>
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1WIzBQkPNS1kbD22rUDUpG1rIhjc8k4UnCathTz-85RbcD_vpQlQBzmBrsuvKgGi4gi5KTlHZ7Ii8DYZ0P0NxhhqmrIaMBVo8aplY_nKLjuKyMhVPmjsBxQEHSp9FopAA8d1BjkRAsyOuaL2ZQWmqB0Z4ddPBzPLgL6l684iYDl8HvS4ls2db6x6SqEClLXBncFNbaFRDTaxAFUgvbVdBnXRpY-xpVSCmfT0UxVLvM2hXWay7VClVvDRJk"
              alt="МайстерДім"
              className={styles.logoImage}
            />
            <span className={styles.brandTitle}>МайстерДім</span>
            <span className={styles.copyright}>© 2026</span>
          </div>

          <div className={styles.links}>
            <Link to="/" className={styles.link}>
              Головна
            </Link>
            <Link to="/services" className={styles.link}>
              Каталог послуг
            </Link>
            <Link to="/booking" className={styles.link}>
              Оформити виклик
            </Link>
            <Link to="/auth" className={styles.link}>
              Кабінет
            </Link>
            <a href="tel:0800334050" className={`${styles.link} ${styles.phone}`}>
              +380 (800) 33-40-50
            </a>
          </div>
        </div>

        <div className={styles.bottomNote}>
          <span>Сервіс перевірених домашніх майстрів. Усі права захищено.</span>
          <span className={styles.badgeTag}>
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
              verified_user
            </span>
            Служба підтримки працює 08:00 – 21:00 без вихідних
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
