# Матеріали та скріншоти для звіту Лабораторної роботи №3

Усі скріншоти тестів інтерфейсу та термінала згенеровано автоматично в єдиному темному преміум-стилі для безпосередньої вставки в документ звіту (`report_template.docx`).

---

## 💻 1. Графічні скріншоти термінала (`docs/screenshots/terminal/`)

Графічні PNG-знімки вікна консолі виконання команд проєкту з темною темою, кнопками вікна та кольоровою підсвіткою результатів:

| Файл скріншота | Команда | Що зображено на скріншоті |
| :--- | :--- | :--- |
| **[`terminal-lint.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/terminal/terminal-lint.png)** | `npm run lint` | Успішне проходження перевірки ESLint без помилок та попереджень |
| **[`terminal-format.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/terminal/terminal-format.png)** | `npm run format:check` | Перевірка Prettier: `All matched files use Prettier code style!` |
| **[`terminal-build.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/terminal/terminal-build.png)** | `npm run build` | Успішна компіляція TypeScript та бандлінг Vite у `dist/` за 2.45s |
| **[`terminal-component.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/terminal/terminal-component.png)** | `npm run test:component` | Проходження 6 компонентних тестів (`Button.cy.tsx`, `ServiceCard.cy.tsx`) |
| **[`terminal-e2e.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/terminal/terminal-e2e.png)** | `npm run test:e2e` | Проходження 2 наскрізних E2E тестів головної сторінки (`home.cy.ts`) |

---

## 📸 2. Скріншоти Cypress UI (`docs/screenshots/cypress/`)

Знімки інтерфейсу додатку та окремих компонентів:

| Файл скріншота | Розмір | Опис для звіту |
| :--- | :--- | :--- |
| **[`01-home-page-full.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/cypress/01-home-page-full.png)** | 1000×2047 px | **Повний екран сервісу «МайстерДім»**: Hero з маркерами Figma, 18 майстрів онлайн, плаваючі курсори, віджет швидкого виклику, сітка послуг, 3-кроковий процес, метрики довіри. |
| **[`02-booking-success.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/cypress/02-booking-success.png)** | 1000×2095 px | **Успішне проходження E2E сценарію замовлення**: підтвердження від диспетчера («Диспетчер знайшов майстра поруч. Дзвінок через 2 хв!»). |
| **[`03-button-basic.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/cypress/03-button-basic.png)** | 500×500 px | Компонентний юніт-тест рендерингу кнопки (`<Button />`). |
| **[`04-button-with-icon.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/cypress/04-button-with-icon.png)** | 500×500 px | Тестування кнопки з іконкою стрілки за дизайн-системою. |
| **[`05-button-disabled.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/cypress/05-button-disabled.png)** | 500×500 px | Тестування стану `disabled` кнопки. |
| **[`06-service-card.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/cypress/06-service-card.png)** | 500×500 px | Компонентне тестування картки послуги (`<ServiceCard />`). |
