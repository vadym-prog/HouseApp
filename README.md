# МайстерДім — Сервіс перевірених майстрів
> Лабораторна робота №3: Каркас (структура) проєкту

Веб-застосунок для замовлення побутових послуг, сантехнічних робіт, збирання меблів та догляду за ділянкою за дизайном «Neo-Craft Digital Atelier».

---

## Стек технологій
- **Фреймворк**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Мова**: [TypeScript](https://www.typescriptlang.org/)
- **Стилізація**: [Tailwind CSS v3](https://tailwindcss.com/) з дизайн-токенами з `DESIGN.md` (Plus Jakarta Sans, JetBrains Mono, кольорова палітра atelier)
- **Контроль якості коду**: [ESLint](https://eslint.org/) (Flat config + react-hooks + prettier-compat) та [Prettier](https://prettier.io/)
- **Автоматизація Git-хуків**: [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) (автоматичний lint та format перед комітом)
- **Тестування**: [Cypress 16](https://docs.cypress.io/)
  - **Component Testing**: тестування React-компонентів у ізольованому Vite середовищі (`Button.cy.tsx`, `ServiceCard.cy.tsx`)
  - **E2E Testing**: наскрізне тестування головного сценарію (`cypress/e2e/home.cy.ts`)

---

## Структура проєкту (Feature-based Architecture)

```
HomeApp/
├── .husky/                       # Git-хуки (pre-commit: npx lint-staged)
├── cypress/                      # Налаштування та E2E тести Cypress
│   ├── e2e/
│   │   └── home.cy.ts            # E2E тест завантаження головної сторінки та форми
│   ├── support/
│   │   ├── commands.ts           # Користувацькі команди
│   │   ├── component.ts          # Монтування React-компонентів у Cypress
│   │   ├── component-index.html  # Шаблон для component runner
│   │   └── e2e.ts                # E2E конфігурація
│   └── tsconfig.json             # Типізація тестів Cypress
├── designs/                      # Початкові дизайн-макети та специфікації
│   ├── DESIGN.md                 # Специфікація кольорів, шрифтів, відступів
│   ├── code.html                 # Еталонна HTML-верстка сервісу «МайстерДім»
│   └── screen.png                # Скріншот еталонного інтерфейсу
├── src/
│   ├── components/
│   │   └── ui/                   # Загальні атомарні UI-компоненти
│   │       ├── Badge.tsx         # Статусні бейджі та пігулки
│   │       ├── Button.tsx        # Базова кнопка дизайн-системи
│   │       ├── Button.cy.tsx     # Компонентний юніт-тест для Button
│   │       └── PhoneInput.tsx    # Поле введення з префіксом +380
│   ├── features/                 # Модульна бізнес-логіка (Feature-Sliced)
│   │   ├── booking/              # Фіча швидкого бронювання
│   │   │   └── components/
│   │   │       └── QuickBookingWidget.tsx  # Форма виклику майстра
│   │   └── services/             # Фіча каталогу популярних послуг
│   │       ├── components/
│   │       │   ├── ServiceCard.tsx         # Картка окремої послуги
│   │       │   ├── ServiceCard.cy.tsx      # Компонентний тест картки
│   │       │   └── ServiceList.tsx         # Сітка каталогу послуг
│   │       ├── data/
│   │       │   └── mockServices.ts         # Мокові дані послуг
│   │       └── types.ts                    # Інтерфейси та типи послуг
│   ├── layouts/                  # Лейаути та структурні блоки сторінки
│   │   ├── Footer.tsx            # Підвал сайту з контактами
│   │   ├── Header.tsx            # Навігаційна шапка зі статусом майстрів
│   │   └── MainLayout.tsx        # Загальна обгортка екрана
│   ├── pages/                    # Сторінки застосунку
│   │   └── HomePage.tsx          # Збірка головного екрана за дизайном
│   ├── App.tsx                   # Кореневий компонент застосунку
│   ├── index.css                 # Підключення Tailwind CSS та сітки Figma
│   └── main.tsx                  # Вхідна точка React DOM
├── .gitignore                    # Ігнорування артефактів збірки та залежностей
├── .prettierignore               # Виключення для Prettier
├── .prettierrc                   # Конфігурація правил форматування коду
├── cypress.config.ts             # Головний конфіг Cypress (E2E + Component)
├── eslint.config.js              # Конфігурація ESLint із підтримкою Prettier
├── index.html                    # Головний HTML-файл зі шрифтами Google
├── package.json                  # Скрипти та залежності проєкту
├── postcss.config.js             # Конфігурація PostCSS
├── tailwind.config.js            # Інтеграція токенів DESIGN.md у Tailwind
├── tsconfig.app.json             # Налаштування TS для вихідного коду
├── tsconfig.json                 # Головний TS config
└── vite.config.ts                # Конфігурація збирача Vite
```

---

## Команди запуску

### 1. Встановлення залежностей:
```bash
npm install
```

### 2. Запуск локального сервера розробки:
```bash
npm run dev
```
Додаток доступний за адресою: `http://localhost:5173/`

### 3. Перевірка якості коду (Лінтинг):
```bash
npm run lint
```

### 4. Автоматичне форматування коду:
```bash
npm run format
```

### 5. Складання продакшн-білду:
```bash
npm run build
```

### 6. Запуск компонентних тестів Cypress (Component Testing):
```bash
npm run test:component
```

### 7. Запуск наскрізних тестів Cypress (E2E Testing):
```bash
# Переконайтеся, що сервер запущено (npm run dev), або:
npm run test:e2e
```

### 8. Інтерактивний інтерфейс Cypress:
```bash
npm run cypress:open
```
