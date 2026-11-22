import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components/ui/Logo";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={styles.brand}>
            <Logo size="sm" />
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
