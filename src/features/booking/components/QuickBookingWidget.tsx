import React, { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { PhoneInput } from "../../../components/ui/PhoneInput";
import styles from "./QuickBookingWidget.module.css";

const CATEGORIES = [
  { id: "all", label: "Газон & Сад" },
  { id: "plumbing", label: "Сантехніка" },
  { id: "electric", label: "Електрика" },
  { id: "furniture", label: "Меблі" },
];

export interface QuickBookingWidgetProps {
  onSuccess?: (phone: string, category: string) => void;
}

export const QuickBookingWidget: React.FC<QuickBookingWidgetProps> = ({ onSuccess }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length < 9) {
      setError("Введіть коректний номер телефону");
      return;
    }
    setError("");
    setSubmitted(true);
    onSuccess?.(phoneNumber, selectedCategory);
  };

  return (
    <div data-testid="quick-booking-widget" className={styles.widget}>
      {/* Category Chips */}
      <div className={styles.chipsContainer}>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`${styles.chip} ${isActive ? styles.chipActive : ""}`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputCol}>
          <PhoneInput
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              if (error) setError("");
            }}
            error={error}
            required
            aria-label="Номер телефону"
          />
        </div>
        <Button type="submit" size="lg" icon="arrow_forward" id="quick-submit-btn">
          Викликати майстра
        </Button>
      </form>

      {/* Status banner */}
      {submitted && (
        <div
          id="quick-status"
          data-testid="booking-success-message"
          className={styles.statusBanner}
        >
          <span className={`material-symbols-outlined ${styles.statusIcon}`}>check_circle</span>
          <span>Диспетчер знайшов майстра поруч. Дзвінок через 2 хв!</span>
        </div>
      )}
    </div>
  );
};

export default QuickBookingWidget;
