import React from "react";
import { Link } from "react-router-dom";
import type { ServiceItem } from "../types";
import { ServiceCard } from "./ServiceCard";
import styles from "./ServiceList.module.css";

export interface ServiceListProps {
  services: ServiceItem[];
  onOrder?: (service: ServiceItem) => void;
}

export const ServiceList: React.FC<ServiceListProps> = ({ services, onOrder }) => {
  return (
    <section className={styles.section} id="katalog">
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title}>Популярні послуги</h2>
          <p className={styles.subtitle}>Фіксований тариф без прихованих платежів</p>
        </div>
        <Link to="/services" className={styles.catalogLink}>
          <span>Усі послуги</span>
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
            arrow_forward
          </span>
        </Link>
      </div>

      <div className={styles.grid}>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} onOrder={onOrder} />
        ))}
      </div>
    </section>
  );
};

export default ServiceList;
