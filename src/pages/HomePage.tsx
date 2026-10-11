import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { QuickBookingWidget } from "../features/booking/components/QuickBookingWidget";
import { ServiceList } from "../features/services/components/ServiceList";
import { MOCK_SERVICES } from "../features/services/data/mockServices";
import type { ServiceItem } from "../features/services/types";
import styles from "./HomePage.module.css";

export const HomePage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleOrder = (service: ServiceItem) => {
    setSelectedService(service);
    const bookingEl = document.getElementById("quick-booking-section");
    bookingEl?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* HERO SECTION WITH QUICK BOOKING FORM */}
          <section id="quick-booking-section" className={styles.heroSection}>
            {/* Subtle decorative markers */}
            <div className={styles.heroTagMarker}>
              <span>FRAME // 01 HERO</span>
              <span>•</span>
              <span className={styles.onlineBadge}>
                <span className={styles.onlinePulseDot} />
                18 майстрів онлайн
              </span>
            </div>

            {/* Interactive Figma Floating Cursor 1: Master */}
            <div className={styles.cursorTagMaster}>
              <svg
                style={{
                  width: "20px",
                  height: "20px",
                  color: "var(--color-accent-violet)",
                  fill: "currentColor",
                }}
                viewBox="0 0 24 24"
              >
                <path d="M4 2l16 11-7 2-4 7z" />
              </svg>
              <div className={styles.cursorPillMaster}>
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                  handyman
                </span>
                <span>Олексій (майстер)</span>
              </div>
            </div>

            {/* Interactive Figma Floating Cursor 2: Client */}
            <div className={styles.cursorTagClient}>
              <svg
                style={{
                  width: "20px",
                  height: "20px",
                  color: "var(--color-accent-emerald)",
                  fill: "currentColor",
                }}
                viewBox="0 0 24 24"
              >
                <path d="M4 2l16 11-7 2-4 7z" />
              </svg>
              <div className={styles.cursorPillClient}>
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                  location_on
                </span>
                <span>Марія (замовник)</span>
              </div>
            </div>

            <div className={styles.heroContent}>
              {/* Region Pill */}
              <div className={styles.regionPill}>
                <span className={styles.regionDot} />
                <span>Закарпатська область • Ужгород • Виїзд від 30 хв</span>
              </div>

              {/* Main Title */}
              <h1 className={styles.heroTitle}>Сервіс перевірених майстрів біля вас</h1>

              {/* Subtitle */}
              <p className={styles.heroSubtitle}>
                Ремонт, сантехніка та догляд за ділянкою з гарантією 30 днів.
              </p>

              {selectedService && (
                <div className={styles.selectedServiceBanner}>
                  Обрано послугу: {selectedService.title} (від {selectedService.price} ₴)
                </div>
              )}

              {/* Quick Booking Form */}
              <QuickBookingWidget />

              {/* Quick Proof Badges */}
              <div className={styles.heroProofs}>
                <span className={styles.proofItem}>
                  <span
                    className={`material-symbols-outlined ${styles.starIconFilled}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  4.95 (8 400+ відгуків)
                </span>
                <span>•</span>
                <span className={styles.proofItem}>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px", color: "var(--color-accent-emerald)" }}
                  >
                    verified
                  </span>
                  Гарантія 30 днів
                </span>
                <span>•</span>
                <span className={styles.proofItem}>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px", color: "var(--color-accent-blue)" }}
                  >
                    credit_card
                  </span>
                  Оплата після роботи
                </span>
              </div>
            </div>
          </section>

          {/* POPULAR SERVICES CATALOG */}
          <ServiceList services={MOCK_SERVICES.slice(0, 4)} onOrder={handleOrder} />

          {/* HOW IT WORKS SECTION */}
          <section className={styles.stepsSection} id="steps">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Як це працює</h2>
              <p className={styles.sectionSubtitle}>Простий процес без зайвих дзвінків</p>
            </div>
            <div className={styles.stepsGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepInfo}>
                  <h3 className={styles.stepTitle}>Оберіть послугу</h3>
                  <p className={styles.stepDesc}>Замовлення в 1 клік на сайті або за телефоном.</p>
                </div>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepInfo}>
                  <h3 className={styles.stepTitle}>Прибуття за 30 хв</h3>
                  <p className={styles.stepDesc}>Майстер поруч із потрібним інструментом.</p>
                </div>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepInfo}>
                  <h3 className={styles.stepTitle}>Оплата після перевірки</h3>
                  <p className={styles.stepDesc}>Карткою або готівкою з гарантією 30 днів.</p>
                </div>
              </div>
            </div>
          </section>

          {/* TRUST & METRICS */}
          <section className={styles.trustSection} id="trust">
            <div className={styles.metricsGrid}>
              <div className={styles.metricCol}>
                <span className={styles.metricValue}>15 000+</span>
                <span className={styles.metricLabel}>Виконаних замовлень</span>
              </div>
              <div className={styles.metricCol}>
                <span className={`${styles.metricValue} ${styles.metricEmerald}`}>100%</span>
                <span className={styles.metricLabel}>Перевірені майстри</span>
              </div>
              <div className={styles.metricCol}>
                <span className={styles.metricValue}>30 днів</span>
                <span className={styles.metricLabel}>Фіксована гарантія</span>
              </div>
            </div>
          </section>

          {/* QUICK CALL BANNER */}
          <section className={styles.ctaBanner}>
            <div className={styles.ctaTextCol}>
              <h3 className={styles.ctaTitle}>Потрібен майстер терміново?</h3>
              <p className={styles.ctaSubtitle}>
                Диспетчер направить найближчого майстра протягом 3 хвилин.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <a href="tel:0800334050" className={styles.phoneCtaBtn}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  call
                </span>
                <span>0 800 33-40-50</span>
              </a>
              <Link to="/booking" className={styles.orderCtaBtn}>
                Оформити виклик
              </Link>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
