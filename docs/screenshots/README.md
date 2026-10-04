# Матеріали та скріншоти для звіту Лабораторної роботи №3

Усі скріншоти та логи команд згенеровано автоматично під час виконання тестових сценаріїв та перевірок якості коду.

---

## 📸 1. Скріншоти Cypress (`docs/screenshots/cypress/`)

Ці зображення готові до прямої вставки в документ звіту (`report_template.docx`):

| Файл | Опис | Розділ звіту, куди вставляти |
| :--- | :--- | :--- |
| **[`01-home-page-full.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/cypress/01-home-page-full.png)** | Повний знімок головного екрана сервісу «МайстерДім» (Hero, інтерактивні курсори, віджет швидкого виклику, каталог популярних послуг, блок «Як це працює», метрики довіри) | *«Детальний опис ідеї з відповідними ілюстраціями»* / *«Результати тестування»* |
| **[`02-booking-success.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/cypress/02-booking-success.png)** | Підтвердження успішного заповнення форми швидкого виклику («Диспетчер знайшов майстра поруч. Дзвінок через 2 хв!») | *«Наскрізне E2E тестування»* |
| **[`03-button-basic.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/cypress/03-button-basic.png)** | Компонентний юніт-тест базової кнопки (`<Button />`) | *«Компонентне / юніт-тестування інтерфейсу»* |
| **[`04-button-with-icon.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/cypress/04-button-with-icon.png)** | Тестування кнопки з іконкою стрілки за дизайн-системою | *«Компонентне / юніт-тестування інтерфейсу»* |
| **[`05-button-disabled.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/cypress/05-button-disabled.png)** | Тестування стану `disabled` кнопки | *«Компонентне / юніт-тестування інтерфейсу»* |
| **[`06-service-card.png`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/cypress/06-service-card.png)** | Компонентне тестування картки послуги (`<ServiceCard />`) з ціною від 250 ₴ та фотографією | *«Компонентне / юніт-тестування інтерфейсу»* |

---

## 💻 2. Логи успішного виконання термінала (`docs/screenshots/terminal/`)

Текстові звіти та логи виконання обов'язкових команд стеку:

| Файл логу | Команда | Статус |
| :--- | :--- | :--- |
| **[`01-lint-success.log`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/terminal/01-lint-success.log)** | `npm run lint` | ✔ 0 помилок (ESLint) |
| **[`02-format-check-success.log`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/terminal/02-format-check-success.log)** | `npm run format:check` | ✔ Усі файли відповідають Prettier |
| **[`03-build-success.log`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/terminal/03-build-success.log)** | `npm run build` | ✔ Продакшн-білд успішний (Vite) |
| **[`04-component-tests-success.log`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/terminal/04-component-tests-success.log)** | `npm run test:component` | ✔ 6 passed (100% тестів компонентів) |
| **[`05-e2e-tests-success.log`](file:///c:/Users/User/Downloads/HomeApp/docs/screenshots/terminal/05-e2e-tests-success.log)** | `npm run test:e2e` | ✔ 2 passed (100% наскрізних сценаріїв) |
