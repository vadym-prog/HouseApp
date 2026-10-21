import React, { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Badge } from "../components/ui/Badge";
import styles from "./AuthPage.module.css";

type UserRole = "client" | "master";
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

export const AuthPage: React.FC = () => {
  const [role, setRole] = useState<UserRole>("client");
  const [mode, setMode] = useState<AuthMode>("login");

  // Form states (purely visual with useState, no external business logic)
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("plumbing");
  const [experience, setExperience] = useState("3-5");
  const [hasTools, setHasTools] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      setSubmittedStatus(
        role === "client"
          ? "Вітаємо! Успішний вхід до особистого кабінету клієнта."
          : "Вітаємо, майстре! Робочий кабінет активовано."
      );
    } else {
      setSubmittedStatus(
        role === "client"
          ? "Обліковий запис клієнта успішно створено!"
          : "Заявку майстра надіслано на верифікацію. Менеджер зв'яжеться з вами!"
      );
    }
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.authCard}>
          {/* Header block */}
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

          {/* Role Switcher: Клієнт / Майстер */}
          <div className={styles.roleSwitcher}>
            <button
              type="button"
              onClick={() => {
                setRole("client");
                setSubmittedStatus(null);
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
                setSubmittedStatus(null);
              }}
              className={`${styles.roleBtn} ${role === "master" ? styles.roleBtnActive : ""}`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                handyman
              </span>
              <span>Я Майстер</span>
            </button>
          </div>

          {/* Mode Tabs: Вхід / Реєстрація */}
          <div className={styles.modeTabs}>
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setSubmittedStatus(null);
              }}
              className={`${styles.modeTabBtn} ${mode === "login" ? styles.modeTabBtnActive : ""}`}
            >
              Вхід
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setSubmittedStatus(null);
              }}
              className={`${styles.modeTabBtn} ${
                mode === "register" ? styles.modeTabBtnActive : ""
              }`}
            >
              Реєстрація
            </button>
          </div>

          {/* Visual submission banner */}
          {submittedStatus && (
            <div className={styles.statusBanner}>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                verified
              </span>
              <span>{submittedStatus}</span>
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {mode === "login" ? (
              /* LOGIN FIELDS */
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
                    <span>Запам'ятати мене</span>
                  </label>
                  <a href="#forgot" className={styles.forgotLink}>
                    Забули пароль?
                  </a>
                </div>
              </>
            ) : (
              /* REGISTRATION FIELDS */
              <>
                <Input
                  label="Прізвище та ім'я"
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
                  type="password"
                  label="Створіть надійний пароль"
                  placeholder="Мінімум 8 символів"
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

            {/* Helper role note */}
            <div className={styles.roleNoteBox}>
              <span className={`material-symbols-outlined ${styles.noteIcon}`}>info</span>
              <span>
                {role === "client"
                  ? "Швидка верифікація через SMS або месенджер. Дані захищені."
                  : "Для майстрів діє програма страхування та безкоштовного брендованого спецодягу."}
              </span>
            </div>

            <Button type="submit" size="lg" icon="arrow_forward">
              {mode === "login"
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
    </MainLayout>
  );
};

export default AuthPage;
