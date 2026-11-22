import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Badge } from "../components/ui/Badge";
import { UserAvatar } from "../components/ui/UserAvatar";
import { useAuth } from "../features/auth/hooks/useAuth";
import { getStoredBookings, API_BASE_URL, getAuthHeaders } from "../config/api";
import type { BookingResponse } from "../features/booking/hooks/useCreateBooking";
import type { User, UserRole } from "../features/auth/types";
import styles from "./AuthPage.module.css";

type AuthMode = "login" | "register";

const SPECIALIZATION_OPTIONS = [
  { value: "plumbing", label: "Сантехніка та водопостачання" },
  { value: "electric", label: "Електрика та освітлення" },
  { value: "lawn", label: "Догляд за газоном та садом" },
  { value: "furniture", label: "Збирання та ремонт меблів" },
  { value: "repair", label: "Універсальний дрібний ремонт" },
];

const EXPERIENCE_OPTIONS = [
  { value: "1-3", label: "1–3 роки" },
  { value: "3-5", label: "3–5 років" },
  { value: "5+", label: "Більше 5 років" },
];

interface ProfileViewProps {
  user: User;
  onUpdateProfile: (data: Partial<User>) => Promise<boolean>;
  onLogout: () => void;
  isLoading: boolean;
}

const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateProfile,
  onLogout,
  isLoading,
}) => {
  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.phone || "");
  const [editCity, setEditCity] = useState(user.city || "Київ");
  const [addresses, setAddresses] = useState<string[]>(
    user.addresses && user.addresses.length > 0 ? user.addresses : ["вул. Садова, 14"]
  );
  const [newAddressText, setNewAddressText] = useState("");
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState<string | null>(null);
  const [bookingsList, setBookingsList] = useState<BookingResponse[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isMounted = true;
    const loadUserBookings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/bookings`, {
          headers: getAuthHeaders(),
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data)) {
            setBookingsList(data);
            return;
          }
        }
      } catch {
        // Fallback to localStorage
      }

      const stored = getStoredBookings<BookingResponse>();
      if (isMounted) {
        setBookingsList(stored);
      }
    };

    loadUserBookings();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_DIM = 256;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height *= MAX_DIM / width;
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width *= MAX_DIM / height;
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.85);
        onUpdateProfile({ avatarUrl: compressedBase64 });
        setProfileSuccessMsg("Фото профілю успішно оновлено!");
        setTimeout(() => setProfileSuccessMsg(null), 3000);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    const success = await onUpdateProfile({
      name: editName.trim() || user.name,
      phone: editPhone.trim() || user.phone,
      city: editCity.trim() || user.city,
      addresses,
    });

    if (success) {
      setProfileSuccessMsg("Зміни успішно збережено!");
      setTimeout(() => setProfileSuccessMsg(null), 3000);
    }
  };

  const handleAddAddress = () => {
    if (!newAddressText.trim()) return;
    const updated = [...addresses, newAddressText.trim()];
    setAddresses(updated);
    setNewAddressText("");
    setIsAddingAddress(false);
    onUpdateProfile({ addresses: updated });
  };

  const handleDeleteAddress = (index: number) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    onUpdateProfile({ addresses: updated });
  };

  return (
    <div className={styles.profileContainer}>
      {/* Top Status & Navigation Bar */}
      <div className={styles.profileHeader}>
        <div className={styles.headerTitleArea}>
          <div className={styles.headerMeta}>
            <span
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "var(--color-neutral-500)",
                fontWeight: 600,
              }}
            >
              Кабінет замовника
            </span>
            <span className={styles.onlineBadge}>
              <span className={styles.onlinePulseDot} />
              Онлайн
            </span>
          </div>
          <h1 className={styles.pageTitle}>Мій профіль</h1>
          <p className={styles.pageSubtitle}>
            Керування обліковим записом, адресами та історією робіт
          </p>
        </div>

        <Link to="/booking" className={styles.newOrderBtn}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            add_task
          </span>
          <span>Нове замовлення</span>
        </Link>
      </div>

      {profileSuccessMsg && (
        <div className={styles.statusBanner} style={{ marginBottom: "24px" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            check_circle
          </span>
          <span>{profileSuccessMsg}</span>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoSelect}
        accept="image/*"
        style={{ display: "none" }}
      />

      <div className={styles.profileGrid}>
        {/* LEFT COLUMN: Identity & Guarantee */}
        <div className={styles.leftCol}>
          <div className={styles.identityCard}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarFrame}>
                <UserAvatar src={user.avatarUrl} alt={user.name} size="xl" shape="rounded" />
                <button
                  type="button"
                  className={styles.changePhotoBtn}
                  onClick={() => fileInputRef.current?.click()}
                  title="Завантажити власне фото"
                  aria-label="Змінити фото"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                    photo_camera
                  </span>
                  <span>Змінити</span>
                </button>
              </div>

              <div className={styles.userBio}>
                <div className={styles.userNameRow}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className={styles.userNameInput}
                    placeholder="Ваше ім'я"
                    aria-label="Ім'я користувача"
                  />
                </div>
                <span className={styles.userLocation}>{editCity} • Реєстрація: 2026</span>
                <div className={styles.badgesRow}>
                  <Badge variant="emerald">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "14px", marginRight: "4px" }}
                    >
                      verified
                    </span>
                    Перевірено
                  </Badge>
                  <Badge variant={user.role === "master" ? "amber" : "pro"}>
                    {user.role === "master" ? "МАЙСТЕР PRO" : "КЛІЄНТ PRO"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className={styles.contactDetailsList}>
              <div className={styles.contactField}>
                <div className={styles.contactFieldLeft}>
                  <div className={styles.fieldIcon}>
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                      call
                    </span>
                  </div>
                  <div className={styles.fieldContent}>
                    <span className={styles.fieldLabel}>Телефон</span>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      placeholder="+380..."
                      className={styles.fieldInput}
                    />
                  </div>
                </div>
                <span className={styles.fieldBadge}>Підтверджено</span>
              </div>

              <div className={styles.contactField}>
                <div className={styles.contactFieldLeft}>
                  <div className={styles.fieldIcon}>
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                      mail
                    </span>
                  </div>
                  <div className={styles.fieldContent}>
                    <span className={styles.fieldLabel}>Електронна пошта</span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--color-neutral-900)",
                      }}
                    >
                      {user.email}
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--color-neutral-500)",
                  }}
                >
                  Основний
                </span>
              </div>

              <div className={styles.contactField}>
                <div className={styles.contactFieldLeft}>
                  <div className={styles.fieldIcon}>
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                      location_on
                    </span>
                  </div>
                  <div className={styles.fieldContent}>
                    <span className={styles.fieldLabel}>Місто</span>
                    <input
                      type="text"
                      value={editCity}
                      onChange={(e) => setEditCity(e.target.value)}
                      placeholder="Київ, Ужгород..."
                      className={styles.fieldInput}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{bookingsList.length}</span>
                <span className={styles.statLabel}>замовлень</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{addresses.length}</span>
                <span className={styles.statLabel}>адреси</span>
              </div>
              <div className={styles.statCard}>
                <span className={`${styles.statValue} ${styles.statValueEmerald}`}>100%</span>
                <span className={styles.statLabel}>захист робіт</span>
              </div>
            </div>

            <div className={styles.profileActionRow}>
              <Button
                type="button"
                onClick={handleSaveProfile}
                size="md"
                className={styles.saveChangesBtn}
                icon="check"
                disabled={isLoading}
              >
                {isLoading ? "Збереження..." : "Зберегти зміни"}
              </Button>
              <button type="button" onClick={onLogout} className={styles.logoutProfileBtn}>
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  logout
                </span>
                <span>Вийти з акаунта</span>
              </button>
            </div>
          </div>

          <div className={styles.policyCard}>
            <div className={styles.policyIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                shield
              </span>
            </div>
            <div>
              <h3 className={styles.policyTitle}>Гарантійний поліс МайстерДім</h3>
              <p className={styles.policyDesc}>
                Всі замовлення, оформлені через платформу, покриваються страховим фондом до 50 000 ₴
                та гарантією на виконані роботи на строк від 30 днів.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Addresses & Bookings */}
        <div className={styles.rightCol}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeaderLeft}>
                <span className={`material-symbols-outlined ${styles.sectionIcon}`}>home_pin</span>
                <h2 className={styles.sectionTitle}>Збережені адреси</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingAddress(!isAddingAddress)}
                className={styles.addAddressBtn}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  {isAddingAddress ? "close" : "add_circle"}
                </span>
                <span>{isAddingAddress ? "Скасувати" : "Додати адресу"}</span>
              </button>
            </div>

            {isAddingAddress && (
              <div className={styles.addressInputRow}>
                <Input
                  placeholder="Введіть нову адресу (наприклад: вул. Садова, 14, кв. 5)"
                  value={newAddressText}
                  onChange={(e) => setNewAddressText(e.target.value)}
                />
                <Button type="button" size="sm" onClick={handleAddAddress}>
                  Додати
                </Button>
              </div>
            )}

            <div className={styles.addressList}>
              {addresses.length === 0 ? (
                <div className={styles.emptyState}>
                  <span className={`material-symbols-outlined ${styles.emptyIcon}`}>
                    location_off
                  </span>
                  <span>Немає збережених адрес</span>
                </div>
              ) : (
                addresses.map((addr, idx) => (
                  <div key={idx} className={styles.addressItem}>
                    <div className={styles.addressItemLeft}>
                      <div className={styles.addressHomeIcon}>
                        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                          villa
                        </span>
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span className={styles.addressText}>{addr}</span>
                          <Badge variant="neutral">Дім</Badge>
                        </div>
                        <span className={styles.addressSub}>{editCity}, приватне житло</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {idx === 0 && <span className={styles.fieldBadge}>Основна</span>}
                      <button
                        type="button"
                        onClick={() => handleDeleteAddress(idx)}
                        className={styles.deleteAddressBtn}
                        title="Видалити адресу"
                        aria-label={`Видалити адресу ${addr}`}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeaderLeft}>
                <span
                  className={`material-symbols-outlined ${styles.sectionIcon}`}
                  style={{ color: "var(--color-accent-emerald)" }}
                >
                  receipt_long
                </span>
                <h2 className={styles.sectionTitle}>Історія замовлень та квитанції</h2>
              </div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--color-neutral-500)",
                }}
              >
                Всього: {bookingsList.length}
              </span>
            </div>

            <div className={styles.ordersList}>
              {bookingsList.length === 0 ? (
                <div className={styles.emptyState}>
                  <span className={`material-symbols-outlined ${styles.emptyIcon}`}>
                    history_toggle_drop
                  </span>
                  <p>У вас ще немає оформлених заявок</p>
                  <Link to="/booking" style={{ textDecoration: "none" }}>
                    <Button size="sm" icon="add">
                      Оформити перше замовлення
                    </Button>
                  </Link>
                </div>
              ) : (
                bookingsList.map((bk) => (
                  <div key={bk.id} className={styles.orderItem}>
                    <div className={styles.orderItemLeft}>
                      <div className={styles.orderIcon}>
                        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                          handyman
                        </span>
                      </div>
                      <div>
                        <div className={styles.orderTitle}>
                          {bk.data.serviceName ||
                            (bk.data.category ? `Послуга (${bk.data.category})` : "Виклик майстра")}
                        </div>
                        <div className={styles.orderMeta}>
                          №{bk.id} • {new Date(bk.createdAt).toLocaleDateString("uk-UA")}{" "}
                          {bk.data.address ? `• ${bk.data.address}` : ""}
                        </div>
                      </div>
                    </div>

                    <div className={styles.orderItemRight}>
                      <span className={styles.orderPrice}>
                        {bk.data.description?.includes("грн") ? bk.data.description : "За тарифом"}
                      </span>
                      <span
                        className={`${styles.statusPill} ${
                          bk.status === "pending" ? styles.statusPillPending : ""
                        }`}
                      >
                        {bk.status === "pending" ? "В обробці" : "Виконано ✓"}
                      </span>
                      <button
                        type="button"
                        className={styles.receiptBtn}
                        title="Квитанція замовлення"
                        onClick={() =>
                          alert(
                            `Квитанція #${bk.id}\nПослуга: ${
                              bk.data.serviceName || "Майстер"
                            }\nТелефон: +380 ${bk.data.phone}\nСтатус: ${bk.status}`
                          )
                        }
                        aria-label={`Квитанція замовлення ${bk.id}`}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                          receipt
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuthPage: React.FC = () => {
  const {
    user,
    isAuthenticated,
    login,
    register,
    updateProfile,
    logout,
    isLoading,
    error: authError,
    clearError,
  } = useAuth();

  const [role, setRole] = useState<UserRole>("client");
  const [mode, setMode] = useState<AuthMode>("login");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("plumbing");
  const [experience, setExperience] = useState("3-5");
  const [hasTools, setHasTools] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [guestSubmittedStatus, setGuestSubmittedStatus] = useState<string | null>(null);

  const handleGuestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (mode === "login") {
      const success = await login({
        emailOrPhone: identifier,
        password,
        role,
      });

      if (success) {
        setGuestSubmittedStatus(
          role === "client"
            ? "Вітаємо! Успішний вхід до особистого кабінету клієнта."
            : "Вітаємо, майстре! Робочий кабінет активовано."
        );
      }
    } else {
      const email = identifier.includes("@")
        ? identifier
        : `${identifier.replace(/\D/g, "") || "client"}@masterdim.ua`;

      const success = await register({
        name: fullName,
        email,
        phone: phone || identifier,
        password,
        role,
        specialization: role === "master" ? specialization : undefined,
        experience: role === "master" ? experience : undefined,
        hasTools: role === "master" ? hasTools : undefined,
      });

      if (success) {
        setGuestSubmittedStatus(
          role === "client"
            ? "Обліковий запис клієнта успішно створено!"
            : "Заявку майстра надіслано на верифікацію. Менеджер зв’яжеться з вами!"
        );
      }
    }
  };

  return (
    <MainLayout>
      {isAuthenticated && user ? (
        <ProfileView
          key={user.id}
          user={user}
          onUpdateProfile={updateProfile}
          onLogout={logout}
          isLoading={isLoading}
        />
      ) : (
        <div className={styles.container}>
          <div className={styles.authCard}>
            <div className={styles.headerBlock}>
              <Badge variant={role === "master" ? "amber" : "neutral"}>
                {role === "master" ? "Кабінет спеціаліста" : "Кабінет клієнта"}
              </Badge>
              <h1 className={styles.title}>
                {mode === "login" ? "Авторизація в системі" : "Створення нового акаунту"}
              </h1>
              <p className={styles.subtitle}>
                {role === "client"
                  ? "Замовляйте послуги в 1 клік та контролюйте виконання робіт"
                  : "Отримуйте замовлення біля вашого дому зі щоденними виплатами"}
              </p>
            </div>

            <div className={styles.roleSwitcher}>
              <button
                type="button"
                onClick={() => {
                  setRole("client");
                  setGuestSubmittedStatus(null);
                }}
                className={`${styles.roleBtn} ${role === "client" ? styles.roleBtnActive : ""}`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  person
                </span>
                <span>Я Клієнт</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole("master");
                  setGuestSubmittedStatus(null);
                }}
                className={`${styles.roleBtn} ${role === "master" ? styles.roleBtnActive : ""}`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  handyman
                </span>
                <span>Я Майстер</span>
              </button>
            </div>

            <div className={styles.modeTabs}>
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setGuestSubmittedStatus(null);
                  clearError();
                }}
                className={`${styles.modeTabBtn} ${mode === "login" ? styles.modeTabBtnActive : ""}`}
              >
                Вхід
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setGuestSubmittedStatus(null);
                  clearError();
                }}
                className={`${styles.modeTabBtn} ${
                  mode === "register" ? styles.modeTabBtnActive : ""
                }`}
              >
                Реєстрація
              </button>
            </div>

            {authError && (
              <div
                style={{
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#b91c1c",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  error
                </span>
                <span>{authError}</span>
              </div>
            )}

            {guestSubmittedStatus && (
              <div className={styles.statusBanner}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  verified
                </span>
                <span>{guestSubmittedStatus}</span>
              </div>
            )}

            <form onSubmit={handleGuestSubmit} className={styles.form}>
              {mode === "login" ? (
                <>
                  <Input
                    label="Телефон або Email"
                    placeholder={
                      role === "client"
                        ? "050 123 45 67 або client@example.com"
                        : "067 987 65 43 або master@example.com"
                    }
                    leftIcon="mail"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    label="Пароль"
                    placeholder="Введіть ваш пароль"
                    leftIcon="lock"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className={styles.optionsRow}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span>Запам’ятати мене</span>
                    </label>
                    <a href="#forgot" className={styles.forgotLink}>
                      Забули пароль?
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <Input
                    label="Прізвище та ім’я"
                    placeholder="Іван Ковальчук"
                    leftIcon="badge"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <Input
                    label="Номер телефону"
                    placeholder="+380 (__) ___-__-__"
                    leftIcon="call"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <Input
                    label="Електронна пошта (Email)"
                    placeholder="ivan@example.com"
                    leftIcon="mail"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    label="Створіть надійний пароль"
                    placeholder="Мінімум 6 символів"
                    leftIcon="lock"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  {role === "master" && (
                    <>
                      <Select
                        label="Основна спеціалізація"
                        options={SPECIALIZATION_OPTIONS}
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                      />
                      <Select
                        label="Досвід роботи"
                        options={EXPERIENCE_OPTIONS}
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      />
                      <label className={styles.checkboxLabel} style={{ fontSize: "13px" }}>
                        <input
                          type="checkbox"
                          checked={hasTools}
                          onChange={(e) => setHasTools(e.target.checked)}
                        />
                        <span>Маю власний професійний інструмент</span>
                      </label>
                    </>
                  )}
                </>
              )}

              <div className={styles.roleNoteBox}>
                <span className={`material-symbols-outlined ${styles.noteIcon}`}>info</span>
                <span>
                  {role === "client"
                    ? "Швидка верифікація через SMS або месенджер. Дані захищені."
                    : "Для майстрів діє програма страхування та безкоштовного брендованого спецодягу."}
                </span>
              </div>

              <Button type="submit" size="lg" icon="arrow_forward" disabled={isLoading}>
                {isLoading
                  ? "Обробка..."
                  : mode === "login"
                    ? role === "client"
                      ? "Увійти як клієнт"
                      : "Увійти як майстер"
                    : role === "client"
                      ? "Зареєструватися як клієнт"
                      : "Подати заявку майстра"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default AuthPage;
