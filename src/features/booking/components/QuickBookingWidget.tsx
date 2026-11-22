import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { PhoneInput } from "../../../components/ui/PhoneInput";
import { useCreateBooking } from "../hooks/useCreateBooking";
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
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Business logic hook for booking creation
  const { createBooking, isLoading, error: apiError } = useCreateBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length < 9) {
      setValidationError("Введіть коректний номер телефону");
      return;
    }

    setValidationError("");
    setSubmitted(true);

    // Call business logic hook
    await createBooking({
      phone: phoneNumber,
      category: selectedCategory,
      description: `Швидка заявка: категорія ${selectedCategory}`,
    });

    onSuccess?.(phoneNumber, selectedCategory);

    // Navigate to full booking flow with prefilled parameters
    navigate(
      `/booking?phone=${encodeURIComponent(phoneNumber)}&category=${encodeURIComponent(selectedCategory)}`,
      {
        state: { phone: phoneNumber, category: selectedCategory },
      }
    );
  };

  const displayError = validationError || apiError || "";

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
              if (validationError) setValidationError("");
            }}
            error={displayError}
            required
            aria-label="Номер телефону"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          icon={isLoading ? undefined : "arrow_forward"}
          id="quick-submit-btn"
          disabled={isLoading}
        >
          {isLoading ? "Відправка..." : "Викликати майстра"}
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
