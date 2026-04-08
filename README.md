# 🎰 Betting Calculator

Професійний React-додаток для розрахунку параметрів ставок із інтерактивною візуалізацією прибутку, підтримкою мультивалютності та сучасною архітектурою. Проєкт розроблено з акцентом на **Visual Excellence** та надійність коду.

![Main Preview](./screenshots/screenshot-form.png)

### 📸 Галерея функціоналу

|             Інтерфейс та форми             |              Аналітика прибутку              |                Тренди та історія                 |
| :----------------------------------------: | :------------------------------------------: | :----------------------------------------------: |
| ![Form](./screenshots/screenshot-form.png) | ![Chart](./screenshots/screenshot-chart.png) | ![History](./screenshots/screenshot-history.png) |

---

## 🚀 Технологічний стек

- **Frontend Core:** React 19 (Functional Components, modern Hooks)
- **Build Ecosystem:** Vite 6 + TypeScript (строга типізація)
- **State & Logic:** Custom Hook Architecture (`useBetCalculator`), LocalStorage persistence
- **Styling System:** CSS Modules з використанням **Glassmorphism** та динамічних тем
- **Data Viz:** Recharts (Адаптивні графіки трендів прибутку)
- **Testing:** Vitest для модульного тестування бізнес-логіки
- **UI Architecture:** Централізована бібліотека перевикористовуваних компонентів (`src/components/ui`)

---

## ✨ Ключові можливості

- **⚡ Real-time Calculation:** Миттєве оновлення виграшу та маржі без перезавантаження.
- **🛡️ Smart Validation:** Багаторівнева перевірка вводу (ліміти до 100 000 одиниць, коректність коефіцієнтів).
- **💾 Persistent History:** Локальне збереження останніх 5 ставок за принципом FIFO.
- **🌐 Multi-currency Support:** Робота з UAH, USD, EUR з автоматичною конвертацією для єдиної аналітики на графіку.
- **🌓 Dynamic Theme:** Тулбар для перемикання тем (Light/Dark mode) із запам'ятовуванням вибору користувача.
- **📊 Profit Analytics:** Візуальний тренд прибутку, що дозволяє оцінити успішність ігрової стратегії.

---

## 🧪 Тестування

Проєкт покритий Unit-тестами (Vitest), що гарантують стабільність розрахунків:

- Валідація форм (межові значення, типи даних).
- Форматування даних для аналітики.
- Логіка конвертації валют.

**Запуск тестів:**

```bash
npm run test
```

---

## 📦 Встановлення та запуск

### 1. Підготовка середовища

Клонуйте репозиторій та перейдіть у папку проєкт:

```bash
git clone https://github.com/admitruk237/betting-calculator.git
cd betting-calculator
```

### 2. Встановлення залежностей

```bash
npm install
```

### 3. Запуск у режимі розробки

```bash
npm run dev
```

Додаток буде доступний за адресою: `http://localhost:5173`

### 4. Збірка для Production

```bash
npm run build
```

---

## 🏗️ Структура проєкту

Проєкт реалізовано за модульним принципом:

- **/src/components/ui** — "Атомарні" UI-компоненти (Button, Card, TextField).
- **/src/hooks** — Кастомні хуки для відокремлення бізнес-логіки від UI.
- **/src/context** — Контексти для глобальних станів (напр. ThemeContext).
- **/src/utils** — Чисті функції для математичних розрахунків.
- **/src/types** — Глобальні інтерфейси TypeScript.

---

📅 **Оновлено:** 08 квітня 2026
👨‍💻 **Автор:** admitruk237
