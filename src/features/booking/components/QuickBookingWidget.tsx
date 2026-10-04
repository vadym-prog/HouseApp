import React, { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { PhoneInput } from "../../../components/ui/PhoneInput";

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
    <div
      data-testid="quick-booking-widget"
      className="w-full max-w-2xl mt-4 p-3 sm:p-4 bg-neutral-50 rounded-2xl border border-neutral-200 shadow-sm flex flex-col gap-3"
    >
      {/* Category Chips */}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                isActive
                  ? "bg-black text-white shadow-xs"
                  : "bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
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
        <Button
          type="submit"
          size="lg"
          icon="arrow_forward"
          className="shrink-0"
          id="quick-submit-btn"
        >
          Викликати майстра
        </Button>
      </form>

      {/* Status banner */}
      {submitted && (
        <div
          id="quick-status"
          data-testid="booking-success-message"
          className="py-2 px-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 animate-fadeIn"
        >
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span>Диспетчер знайшов майстра поруч. Дзвінок через 2 хв!</span>
        </div>
      )}
    </div>
  );
};
