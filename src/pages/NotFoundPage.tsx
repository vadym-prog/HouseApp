import React from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import styles from "./NotFoundPage.module.css";

export const NotFoundPage: React.FC = () => {
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.card} data-testid="not-found-card">
          <div className={styles.tagRow}>
            <Badge variant="amber" dot>
              ПОМИЛКА 404
            </Badge>
            <Badge variant="neutral">МАРШРУТ НЕ ЗНАЙДЕНО</Badge>
          </div>

          <div className={styles.iconWrapper}>
            <span className="material-symbols-outlined" style={{ fontSize: "36px" }}>
              home_repair_service
            </span>
          </div>

          <div className={styles.errorCode}>
            <span>4</span>
            <span className={styles.errorCodeAccent}>0</span>
            <span>4</span>
          </div>

          <h1 className={styles.title}>Сторінку не знайдено</h1>

          <p className={styles.description}>
            Схоже, що вказаної адреси не існує або сторінку було переміщено. Перевірте правильність
            написання URL або поверніться до головного каталогу сервісу «МайстерДім».
          </p>

          <div className={styles.actions}>
            <Link to="/">
              <Button variant="primary" icon="home" size="lg">
                Повернутися на головну
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary" icon="arrow_forward" size="lg">
                Переглянути послуги
              </Button>
            </Link>
          </div>

          <div className={styles.helperBox}>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              support_agent
            </span>
            <span>
              Потрібна допомога з викликом майстра? Диспетчер:{" "}
              <a href="tel:0800334050" className={styles.helperPhone}>
                0 800 33-40-50
              </a>
            </span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
