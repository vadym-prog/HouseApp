import React from "react";
import { Link } from "react-router-dom";
import type { ServiceItem } from "../types";
import { ServiceCard } from "./ServiceCard";
import { useServices } from "../hooks/useServices";
import styles from "./ServiceList.module.css";

export interface ServiceListProps {
  services?: ServiceItem[];
  onOrder?: (service: ServiceItem) => void;
  showFilters?: boolean;
  title?: string;
  subtitle?: string;
}

const CATEGORIES = [
  { id: "all", label: "Усі" },
  { id: "lawn", label: "Газон & Сад" },
  { id: "plumbing", label: "Сантехніка" },
  { id: "electric", label: "Електрика" },
  { id: "furniture", label: "Меблі" },
  { id: "repair", label: "Ремонт" },
];

export const ServiceList: React.FC<ServiceListProps> = ({
  services: propServices,
  onOrder,
  showFilters = true,
  title = "Популярні послуги",
  subtitle = "Фіксований тариф без прихованих платежів",
}) => {
  // Leverage custom business logic hook useServices
  const {
    filteredServices,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useServices();

  // If external services were provided without hook usage, fallback to them when no filters applied
  const displayedServices =
    propServices && !searchQuery && selectedCategory === "all" ? propServices : filteredServices;

  return (
    <section className={styles.section} id="katalog">
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <Link to="/services" className={styles.catalogLink}>
          <span>Усі послуги</span>
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
            arrow_forward
          </span>
        </Link>
      </div>

      {showFilters && (
        <div className={styles.filterPanel}>
          <div className={styles.searchRow}>
            <div className={styles.searchWrapper}>
              <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Пошук послуги за назвою або описом..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Пошук послуги в каталозі"
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.clearSearchBtn}
                  onClick={() => setSearchQuery("")}
                  aria-label="Очистити пошук"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                    close
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className={styles.categoriesRow} role="tablist">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`${styles.categoryChip} ${isActive ? styles.categoryChipActive : ""}`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isLoading && displayedServices.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Завантаження каталогу послуг...</p>
        </div>
      ) : displayedServices.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={`material-symbols-outlined ${styles.emptyIcon}`}>search_off</span>
          <p>За вашим запитом нічого не знайдено</p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
          >
            Скинути фільтри
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {displayedServices.map((service) => (
            <ServiceCard key={service.id} service={service} onOrder={onOrder} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ServiceList;
