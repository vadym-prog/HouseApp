import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { ServiceCard } from "../features/services/components/ServiceCard";
import { MOCK_SERVICES } from "../features/services/data/mockServices";
import type { ServiceItem } from "../features/services/types";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import styles from "./ServicesPage.module.css";

const CATEGORIES = [
  { id: "all", label: "Усі послуги" },
  { id: "lawn", label: "Газон & Сад" },
  { id: "plumbing", label: "Сантехніка" },
  { id: "electric", label: "Електрика" },
  { id: "furniture", label: "Меблі" },
  { id: "repair", label: "Дрібний ремонт" },
];

const SORT_OPTIONS = [
  { value: "popular", label: "За популярністю" },
  { value: "price-asc", label: "Спочатку дешевші" },
  { value: "price-desc", label: "Спочатку дорожчі" },
  { value: "name", label: "За назвою (А-Я)" },
];

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const filteredServices = useMemo(() => {
    let result = [...MOCK_SERVICES];

    // Category filter
    if (selectedCategory !== "all") {
      if (selectedCategory === "lawn") {
        result = result.filter((s) => s.category === "lawn" || s.category === "garden");
      } else {
        result = result.filter((s) => s.category === selectedCategory);
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.categoryLabel.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleOrder = (service: ServiceItem) => {
    navigate(`/booking/${service.id}`);
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        {/* Page Title & Intro */}
        <div className={styles.headerSection}>
          <h1 className={styles.title}>Каталог послуг майстрів</h1>
          <p className={styles.description}>
            Прозорі фіксовані тарифи без прихованих доплат. Обирайте потрібну категорію або
            скористайтеся пошуком для швидкого підбору майстра.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className={styles.controlsBar}>
          <div className={styles.searchSortRow}>
            <div className={styles.searchCol}>
              <Input
                placeholder="Пошук послуги (наприклад: покіс, сантехніка, замок...)"
                leftIcon="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Пошук послуги"
              />
            </div>
            <div className={styles.sortCol}>
              <Select
                options={SORT_OPTIONS}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Сортування послуг"
              />
            </div>
          </div>

          <div className={styles.categoryTabs}>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`${styles.categoryBtn} ${isActive ? styles.categoryBtnActive : ""}`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Meta summary */}
        <div className={styles.resultsMeta}>
          <span>
            Знайдено послуг: <strong>{filteredServices.length}</strong>
          </span>
          <span>Усі ціни вказані у гривнях (₴) з урахуванням виїзду</span>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className={styles.grid}>
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} onOrder={handleOrder} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span className={`material-symbols-outlined ${styles.emptyIcon}`}>search_off</span>
            <h3 className={styles.emptyTitle}>За вашим запитом нічого не знайдено</h3>
            <p className={styles.emptyDesc}>
              Спробуйте змінити фільтри або перевірте правильність написання пошукового запиту.
            </p>
          </div>
        )}

        {/* Informational strip */}
        <div className={styles.infoSection}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                price_check
              </span>
            </div>
            <h3 className={styles.infoTitle}>Фіксований тариф</h3>
            <p className={styles.infoDesc}>
              Ціна узгоджується до початку робіт і не змінюється в процесі виконання.
            </p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                build_circle
              </span>
            </div>
            <h3 className={styles.infoTitle}>Свій інструмент</h3>
            <p className={styles.infoDesc}>
              Кожен спеціаліст прибуває з професійним спорядженням та розхідними матеріалами.
            </p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                security
              </span>
            </div>
            <h3 className={styles.infoTitle}>Гарантія 30 днів</h3>
            <p className={styles.infoDesc}>
              Будь-які недоліки усуваються безкоштовно протягом усього гарантійного терміну.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServicesPage;
