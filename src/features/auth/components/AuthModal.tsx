import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Badge } from "../../../components/ui/Badge";
import styles from "./AuthModal.module.css";

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    openAuthModal,
    login,
    register,
    isLoading,
    error,
    clearError,
  } = useAuth();

  const [role, setRole] = useState<UserRole>("client");

  // Form states
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("Сантехніка та електрика");

  if (!isAuthModalOpen) return null;

  const handleTabChange = (newMode: "login" | "register") => {
    openAuthModal(newMode);
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authModalMode === "login") {
      await login({
        emailOrPhone,
        password,
        role,
      });
    } else {
      await register({
        name,
        email: emailOrPhone.includes("@")
          ? emailOrPhone
          : `${emailOrPhone.replace(/\D/g, "")}@masterdim.ua`,
        phone: phone || emailOrPhone,
        password,
        role,
        specialization: role === "master" ? specialization : undefined,
      });
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true">
        <button
          type="button"
          onClick={closeAuthModal}
          className={styles.closeBtn}
          aria-label="Закрити"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            close
          </span>
        </button>

        <div className={styles.header}>
          <div className={styles.badgeWrapper}>
            <Badge variant={role === "master" ? "amber" : "neutral"}>
              {role === "master" ? "Спеціаліст" : "Клієнт"}
            </Badge>
          </div>
          <h2 className={styles.title}>
            {authModalMode === "login" ? "Вхід до МайстерДім" : "Реєстрація акаунту"}
          </h2>
          <p className={styles.subtitle}>
            {authModalMode === "login"
              ? "Увійдіть, щоб замовляти майстрів або керувати замовленнями"
              : "Створіть кабінет для швидкого оформлення послуг"}
          </p>
        </div>

        {/* Tab switch */}
        <div className={styles.tabs} role="tablist">
          <button
            type="button"
            className={`${styles.tab} ${authModalMode === "login" ? styles.tabActive : ""}`}
            onClick={() => handleTabChange("login")}
          >
            Вхід
          </button>
          <button
            type="button"
            className={`${styles.tab} ${authModalMode === "register" ? styles.tabActive : ""}`}
            onClick={() => handleTabChange("register")}
          >
            Реєстрація
          </button>
        </div>

        {/* Role toggle */}
        <div className={styles.roleSelector}>
          <button
            type="button"
            className={`${styles.roleBtn} ${role === "client" ? styles.roleBtnActive : ""}`}
            onClick={() => setRole("client")}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              person
            </span>
            <span>Я Клієнт</span>
          </button>
          <button
            type="button"
            className={`${styles.roleBtn} ${role === "master" ? styles.roleBtnActive : ""}`}
            onClick={() => setRole("master")}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              handyman
            </span>
            <span>Я Майстер</span>
          </button>
        </div>

        {error && (
          <div className={styles.errorBanner} role="alert">
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              error
            </span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {authModalMode === "register" && (
            <>
              <Input
                label="Ваше повне ім’я"
                placeholder="Олександр Коваль"
                leftIcon="badge"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Контактний телефон"
                placeholder="+380 50 123 45 67"
                leftIcon="call"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {role === "master" && (
                <Input
                  label="Основна спеціалізація"
                  placeholder="Сантехніка, електрика, збирання меблів"
                  leftIcon="build"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                />
              )}
            </>
          )}

          <Input
            label={authModalMode === "login" ? "Email або телефон" : "Електронна пошта (Email)"}
            placeholder={
              authModalMode === "login" ? "user@example.com або +380..." : "alex@example.com"
            }
            leftIcon="mail"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
          />

          <Input
            label="Пароль"
            type="password"
            placeholder="••••••••"
            leftIcon="lock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className={styles.submitBtn}>
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading
                ? "Обробка..."
                : authModalMode === "login"
                  ? "Увійти в кабінет"
                  : "Зареєструватися"}
            </Button>
          </div>
        </form>

        <div className={styles.footerNote}>
          {authModalMode === "login" ? (
            <>
              Ще не маєте акаунту?
              <button
                type="button"
                className={styles.footerLink}
                onClick={() => handleTabChange("register")}
              >
                Зареєструватися
              </button>
            </>
          ) : (
            <>
              Вже зареєстровані?
              <button
                type="button"
                className={styles.footerLink}
                onClick={() => handleTabChange("login")}
              >
                Увійти
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
