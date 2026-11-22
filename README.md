# МайстерДім — Сервіс перевірених майстрів
> Повноцінний Full-Stack веб-застосунок (React 19 + TypeScript + Vite + Node.js / Express REST API)

Веб-застосунок для замовлення побутових послуг, сантехнічних робіт, електрики, збирання меблів та догляду за ділянкою за дизайном «Neo-Craft Digital Atelier».

---

## 🛠 Стек технологій

### Фронтенд (Client)
- **Фреймворк**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Мова**: [TypeScript](https://www.typescriptlang.org/)
- **Маршрутизація**: [React Router v7](https://reactrouter.com/) (динамічні маршрути `/booking/:serviceId`, 404 сторінка, захищений перехід)
- **Стилізація**: Чисті CSS Modules з підтримкою дизайн-токенів з `DESIGN.md` (Plus Jakarta Sans, JetBrains Mono, кольорова палітра atelier)
- **Кастомні хуки та бізнес-логіка (ЛР №6)**:
  - `useServices` — завантаження, живий пошук, фільтрація за категорією з AbortController
  - `useCreateBooking` — валідація та створення заявок на виклик майстра
  - `useAuth` та `AuthContext` — авторизація, реєстрація, сесії користувачів та швидке модальне вікно `AuthModal`
- **Контроль якості коду**: ESLint (Flat config + react-hooks + prettier-compat) та Prettier
- **Тестування**: Cypress 16 (Component & E2E Testing)

### Бекенд (Server — ЛР №7)
- **Платформа**: [Node.js](https://nodejs.org/) (ES Modules)
- **Серверний фреймворк**: [Express](https://expressjs.com/) (порт 5000)
- **Автентифікація та безпека**: JSON Web Tokens ([jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)) + хешування паролів ([bcryptjs](https://github.com/dcodeIO/bcrypt.js))
- **CORS**: Забезпечення безпечних запитів із клієнта на `http://localhost:5173`
- **Сховище даних**: Персистентне файлове JSON-сховище у `server/data/` (`services.json`, `users.json`, `bookings.json`)

---

## 📂 Структура проєкту (Feature-based Architecture)

```
HomeApp/
├── server/                       # Серверна частина (Node.js / Express REST API)
│   ├── data/                     # Файлове JSON-сховище
│   │   ├── services.json         # Каталог послуг
│   │   ├── users.json            # Облікові записи користувачів
│   │   └── bookings.json         # Історія замовлень і квитанцій
│   ├── middleware/
│   │   └── auth.js               # JWT-middleware перевірки токена
│   ├── routes/
│   │   ├── services.js           # Маршрути каталогу послуг
│   │   ├── auth.js               # Маршрути реєстрації, входу та /me
│   │   ├── users.js              # Маршрути профілю користувача
│   │   └── bookings.js           # Маршрути заявок бронювання
│   ├── utils/
│   │   └── storage.js            # Утиліта безпечного читання/запису JSON
│   ├── index.js                  # Головний файл сервера
│   └── package.json              # Залежності бекенду
├── src/
│   ├── components/               # Загальні UI-компоненти
│   │   ├── ui/
│   │   │   ├── Logo.tsx          # Векторний SVG-логотип «МайстерДім»
│   │   │   ├── UserAvatar.tsx    # Аватар користувача з SVG-заглушкою
│   │   │   ├── Button.tsx        # Кнопки інтерфейсу
│   │   │   ├── Input.tsx         # Поля введення
│   │   │   ├── PhoneInput.tsx    # Поле введення телефону з +380
│   │   │   ├── Select.tsx        # Селекти
│   │   │   └── Badge.tsx         # Бейджі та мітки
│   ├── config/
│   │   └── api.ts                # Базовий URL API та утиліти localStorage
│   ├── features/                 # Модульна бізнес-логіка
│   │   ├── auth/                 # Авторизація, контекст та модальне вікно
│   │   ├── booking/              # Створення заявок та віджети
│   │   └── services/             # Каталог послуг, пошук, фільтри
│   ├── layouts/                  # Шапка (Header), Підвал (Footer), MainLayout
│   ├── pages/                    # Сторінки (Home, Services, Booking, Auth, 404)
│   ├── App.tsx                   # Кореневий компонент та маршрути
│   └── main.tsx                  # Вхідна точка React
├── cypress/                      # E2E та компонентні тести
└── package.json                  # Скрипти збірки та запуску
```

---

## 📡 Перелік REST API маршрутів (Бекенд)

| Метод | Шлях | Опис | Авторизація |
|-------|------|------|-------------|
| `GET` | `/api/services` | Отримання каталогу послуг (фільтри `?category=...&search=...`) | Публічний |
| `GET` | `/api/services/:id` | Отримання послуги за унікальним ID | Публічний |
| `POST`| `/api/auth/register` | Реєстрація нового користувача (хешування пароля bcrypt, повернення JWT) | Публічний |
| `POST`| `/api/auth/login` | Вхід користувача за email/телефоном та паролем | Публічний |
| `GET` | `/api/auth/me` | Отримання даних поточного користувача | JWT Bearer |
| `PUT` | `/api/users/profile` | Оновлення профілю (ім'я, телефон, місто, аватар, адреси) | JWT Bearer |
| `GET` | `/api/bookings` | Отримання списку замовлень (користувача або всіх) | Опціональний JWT |
| `POST`| `/api/bookings` | Оформлення нової заявки на виклик майстра | Опціональний JWT |

---

## 🚀 Команди запуску проєкту

### 1. Встановлення всіх залежностей:
```bash
# Залежності фронтенду
npm install

# Залежності бекенду
npm --prefix server install
```

### 2. Запуск бекенд-сервера (порт 5000):
```bash
npm run server
```
Сервер запуститься за адресою: `http://localhost:5000/api`

### 3. Запуск фронтенд-клієнта (порт 5173):
У новому терміналі:
```bash
npm run dev
```
Клієнт доступний за адресою: `http://localhost:5173/`

### 4. Перевірка якості коду (Лінтинг та форматування):
```bash
npm run lint
npm run format
```

### 5. Складання продакшн-білду фронтенду:
```bash
npm run build
```

### 6. Запуск тестів Cypress:
```bash
npm run test:e2e
```
