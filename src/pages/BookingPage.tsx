import React, { useState } from "react";
import { useParams, useSearchParams, useLocation, useNavigate, Link } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { MOCK_SERVICES } from "../features/services/data/mockServices";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { PhoneInput } from "../components/ui/PhoneInput";
import { Badge } from "../components/ui/Badge";
import styles from "./BookingPage.module.css";

const TIME_SLOTS = [
  "Терміново (до 45 хв)",
  "09:00 - 12:00",
  "12:00 - 15:00",
  "15:00 - 18:00",
  "18:00 - 21:00",
  "За домовленістю",
];

export const BookingPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId?: string }>();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state as {
    phone?: string;
    category?: string;
    serviceId?: string;
  } | null;

  const resolvedInitialServiceId =
    (serviceId && MOCK_SERVICES.some((s) => s.id === serviceId) && serviceId) ||
    (searchParams.get("service") &&
      MOCK_SERVICES.some((s) => s.id === searchParams.get("service")) &&
      searchParams.get("service")) ||
    (locationState?.serviceId &&
      MOCK_SERVICES.some((s) => s.id === locationState.serviceId) &&
      locationState.serviceId) ||
    (() => {
      const cat = searchParams.get("category") || locationState?.category;
      if (cat && cat !== "all") {
        const found = MOCK_SERVICES.find(
          (s) => s.category === cat || (cat === "lawn" && s.category === "garden")
        );
        if (found) return found.id;
      }
      return MOCK_SERVICES[0].id;
    })();

  const [overrideServiceId, setOverrideServiceId] = useState<string | null>(null);
  const selectedServiceId = overrideServiceId ?? resolvedInitialServiceId;

  const passedPhone = searchParams.get("phone") || locationState?.phone || "";
  const [enteredPhone, setEnteredPhone] = useState<string | null>(null);
  const phone = enteredPhone !== null ? enteredPhone : passedPhone;

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[0]);
  const [address, setAddress] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [contactMethod, setContactMethod] = useState<"phone" | "telegram" | "viber">("phone");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentService = MOCK_SERVICES.find((s) => s.id === selectedServiceId) || MOCK_SERVICES[0];

  const serviceOptions = MOCK_SERVICES.map((s) => ({
    value: s.id,
    label: `${s.title} (від ${s.price} ₴ / ${s.unit})`,
  }));

  const handleServiceChange = (newServiceId: string) => {
    setOverrideServiceId(newServiceId);
    if (serviceId) {
      navigate(`/booking/${newServiceId}`, { replace: true });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length < 9) {
      setPhoneError("Вкажіть номер телефону для підтвердження виклику");
      return;
    }
    setPhoneError("");
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setOverrideServiceId(null);
    setAddress("");
    setWorkDescription("");
    setEnteredPhone("");
    setClientName("");
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        {/* Page Heading */}
        <div className={styles.headerSection}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Badge variant="emerald" dot pulse>
              Майстри вільні
            </Badge>
            <span style={{ fontSize: "12px", color: "var(--color-neutral-500)" }}>
              Виїзд майстра у межах 30-45 хв
            </span>
          </div>
          <h1 className={styles.title}>Оформлення виклику майстра</h1>
          <p className={styles.description}>
            Заповніть коротку форму для виклику фахівця. Оплата здійснюється виключно після
            виконання та перевірки якості роботи.
          </p>
        </div>

        {isSubmitted ? (
          /* Confirmation State */
          <div className={styles.successCard}>
            <div className={styles.successIconBadge}>
              <span className="material-symbols-outlined" style={{ fontSize: "36px" }}>
                task_alt
              </span>
            </div>
            <h2 className={styles.successTitle}>Заявку успішно оформлено!</h2>
            <p className={styles.successText}>
              Диспетчер та призначений майстер отримали вашу заявку. Ми зателефонуємо вам або
              напишемо у обраний месенджер протягом <strong>2 хвилин</strong>.
            </p>

            <div className={styles.orderReceipt}>
              <div>
                <strong>Послуга:</strong> {currentService.title}
              </div>
              <div>
                <strong>Орієнтовна вартість:</strong> від {currentService.price} ₴ /{" "}
                {currentService.unit}
              </div>
              <div>
                <strong>Дата та час:</strong> {selectedDate}, {selectedTimeSlot}
              </div>
              <div>
                <strong>Адреса:</strong> {address || "Узгоджується з диспетчером"}
              </div>
              <div>
                <strong>Контактний телефон:</strong> +380 {phone} ({clientName || "Клієнт"})
              </div>
              <div>
                <strong>Спосіб зв'язку:</strong>{" "}
                {contactMethod === "phone"
                  ? "Телефонний дзвінок"
                  : contactMethod === "telegram"
                    ? "Telegram"
                    : "Viber"}
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Button onClick={handleReset} variant="secondary">
                Створити іншу заявку
              </Button>
              <Link to="/">
                <Button variant="primary">Повернутися на головну</Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Main 2-Column Booking Form */
          <div className={styles.layoutGrid}>
            <form onSubmit={handleSubmit} className={styles.formCard}>
              {/* Step 1: Service Selection */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>
                  <span className={styles.stepBadge}>1</span>
                  <h3 className={styles.stepTitle}>Оберіть потрібну послугу</h3>
                </div>
                <Select
                  label="Категорія та вид робіт"
                  options={serviceOptions}
                  value={selectedServiceId}
                  onChange={(e) => handleServiceChange(e.target.value)}
                />
              </div>

              {/* Step 2: Date & Time */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>
                  <span className={styles.stepBadge}>2</span>
                  <h3 className={styles.stepTitle}>Дата та бажаний час візиту</h3>
                </div>

                <Input
                  type="date"
                  label="Дата виконання"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span
                    style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-neutral-700)" }}
                  >
                    Зручний проміжок часу
                  </span>
                  <div className={styles.timeSlotGrid}>
                    {TIME_SLOTS.map((slot) => {
                      const isActive = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`${styles.timeSlotBtn} ${
                            isActive ? styles.timeSlotBtnActive : ""
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 3: Location and Work Details */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>
                  <span className={styles.stepBadge}>3</span>
                  <h3 className={styles.stepTitle}>Адреса та опис проблеми</h3>
                </div>

                <Input
                  label="Адреса виклику"
                  placeholder="Вулиця, номер будинку, квартира (наприклад: вул. Головна, 24, кв. 12)"
                  leftIcon="location_on"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />

                <div className={styles.textareaContainer}>
                  <label htmlFor="work-desc" className={styles.textareaLabel}>
                    Опис завдання або побажання майстру
                  </label>
                  <textarea
                    id="work-desc"
                    className={styles.textarea}
                    placeholder="Опишіть деталі робіт, наприклад: підтікає кран на кухні, потрібна заміна прокладки..."
                    value={workDescription}
                    onChange={(e) => setWorkDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Step 4: Contact Information */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>
                  <span className={styles.stepBadge}>4</span>
                  <h3 className={styles.stepTitle}>Контактні дані замовника</h3>
                </div>

                <div className={styles.rowTwo}>
                  <Input
                    label="Ваше ім'я"
                    placeholder="Олександр"
                    leftIcon="person"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                  />

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "var(--color-neutral-700)",
                        marginBottom: "4px",
                      }}
                    >
                      Номер телефону
                    </label>
                    <PhoneInput
                      value={phone}
                      onChange={(e) => {
                        setEnteredPhone(e.target.value);
                        if (phoneError) setPhoneError("");
                      }}
                      error={phoneError}
                      required
                      aria-label="Номер телефону"
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span
                    style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-neutral-700)" }}
                  >
                    Бажаний канал для зв'язку
                  </span>
                  <div className={styles.contactMethodRow}>
                    <button
                      type="button"
                      onClick={() => setContactMethod("phone")}
                      className={`${styles.contactMethodBtn} ${
                        contactMethod === "phone" ? styles.contactMethodBtnActive : ""
                      }`}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                        call
                      </span>
                      Дзвінок
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod("telegram")}
                      className={`${styles.contactMethodBtn} ${
                        contactMethod === "telegram" ? styles.contactMethodBtnActive : ""
                      }`}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                        send
                      </span>
                      Telegram
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod("viber")}
                      className={`${styles.contactMethodBtn} ${
                        contactMethod === "viber" ? styles.contactMethodBtnActive : ""
                      }`}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                        chat
                      </span>
                      Viber
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <Button type="submit" size="lg" icon="arrow_forward">
                Підтвердити замовлення майстра
              </Button>
            </form>

            {/* Sidebar Summary Card */}
            <aside className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Підсумок заявки</h3>

              <div className={styles.summaryRow}>
                <span>Обрана послуга:</span>
                <strong style={{ color: "var(--color-neutral-900)", textAlign: "right" }}>
                  {currentService.title}
                </strong>
              </div>

              <div className={styles.summaryRow}>
                <span>Категорія:</span>
                <span>{currentService.categoryLabel}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Орієнтовна тривалість:</span>
                <span>{currentService.duration || "1–2 год"}</span>
              </div>

              <div className={styles.summaryDivider} />

              <div className={styles.summaryRow}>
                <span>Тариф:</span>
                <span className={styles.summaryPrice}>
                  від {currentService.price} ₴{" "}
                  <span
                    style={{ fontSize: "14px", fontWeight: 400, color: "var(--color-neutral-500)" }}
                  >
                    / {currentService.unit}
                  </span>
                </span>
              </div>

              <div className={styles.guaranteeList}>
                <div className={styles.guaranteeItem}>
                  <span className={`material-symbols-outlined ${styles.checkIcon}`}>
                    check_circle
                  </span>
                  <span>Без передоплати — оплата за результатом</span>
                </div>
                <div className={styles.guaranteeItem}>
                  <span className={`material-symbols-outlined ${styles.checkIcon}`}>
                    check_circle
                  </span>
                  <span>Гарантійний талон на 30 днів</span>
                </div>
                <div className={styles.guaranteeItem}>
                  <span className={`material-symbols-outlined ${styles.checkIcon}`}>
                    check_circle
                  </span>
                  <span>Безкоштовний виїзд у межах міста</span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                  color: "var(--color-neutral-500)",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  support_agent
                </span>
                <span>Диспетчер на зв'язку: 0 800 33-40-50</span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BookingPage;
