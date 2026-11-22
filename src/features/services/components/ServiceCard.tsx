import React from "react";
import type { ServiceItem } from "../types";
import { Button } from "../../../components/ui/Button";
import styles from "./ServiceCard.module.css";

export interface ServiceCardProps {
  service: ServiceItem;
  onOrder?: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onOrder }) => {
  return (
    <div data-testid={`service-card-${service.id}`} className={styles.card}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img src={service.imageUrl} alt={service.title} className={styles.image} />
          <span className={styles.categoryTag}>{service.categoryLabel}</span>
          {service.rating && (
            <span className={styles.ratingTag}>
              <span className={`material-symbols-outlined ${styles.starIcon}`}>star</span>
              {service.rating}
            </span>
          )}
        </div>
        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.description}>{service.description}</p>
      </div>

      <div className={styles.footer}>
        <div className={styles.priceCol}>
          <span className={styles.priceLabel}>Ціна</span>
          <span className={styles.priceValue}>
            від {service.price} ₴ <span className={styles.unitText}>/ {service.unit}</span>
          </span>
        </div>
        <Button
          size="sm"
          icon="arrow_forward"
          onClick={() => onOrder?.(service)}
          aria-label={`Замовити ${service.title}`}
        >
          Замовити
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
