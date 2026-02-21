# Meet App

Meet is a progressive web application (PWA) built with **React** and **Vite** that allows users to explore upcoming tech events across cities worldwide. The application provides dynamic filtering, interactive data visualizations, offline support, and a responsive user experience.

The project was developed as part of a full-stack curriculum with a strong emphasis on modern frontend architecture, testability, and performance.

---

## ✨ Features

### 🔎 Search & Filter
- Search events by city using an autocomplete interface
- View events from all cities or a selected location
- Dynamically control the number of displayed events

### 📊 Data Visualization
- City distribution chart of upcoming events
- Event genre breakdown chart
- Built using **Recharts**

### 📡 Offline Support (PWA)
- Cached event data for offline usage
- Network status detection & user alerts
- Service worker powered by **Workbox**

### ⚠️ Intelligent Alerts
- Offline status warnings
- Data retrieval fallback notifications
- Error handling for invalid inputs

### ✅ Tested Behavior
- Component rendering validation
- Integration testing for user flows
- Behavior-driven scenarios using Jest & Testing Library

---

## 🧱 Tech Stack

**Frontend**
- React 18
- Vite
- Recharts

**PWA / Offline**
- Workbox
- vite-plugin-pwa

**Testing**
- Jest
- React Testing Library
- Jest-Cucumber
- Puppeteer (E2E)

**Tooling**
- ESLint
- Babel
- SWC

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/meet.git
cd meet
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

---

## 🧪 Running Tests

```bash
npm test
```

Test coverage includes:

- Unit tests
- Integration tests
- Behavior-driven feature tests
- End-to-end validation

---

## 🧩 Application Architecture

The application follows a modular, component-driven design:

- **App.jsx** → State management & orchestration
- **CitySearch** → Location filtering logic
- **NumberOfEvents** → Event count control
- **EventList / Event** → Event rendering
- **Charts** → Data visualization layer
- **API Layer** → Event retrieval & transformation

State is managed via React Hooks (`useState`, `useEffect`) with unidirectional data flow.

---

## 📶 Offline Behavior

Meet is designed to gracefully handle network interruptions:

- Cached responses via service worker
- UI warnings when offline
- Fallback messaging when API data is unavailable

This ensures consistent usability even under unreliable connectivity.

---

## 📖 Behavior-Driven Features

### Feature: Show / Hide Event Details
- Events are collapsed by default
- Users can expand/collapse event details

### Feature: Specify Number of Events
- Default event count on load
- User-controlled event quantity

### Feature: Offline Usage
- Cached data rendering
- User feedback on restricted actions

### Feature: Data Visualization
- Visual summaries of event data

---

## 🎯 Project Goals

This project emphasizes:

✔ Modern React patterns  
✔ Clean component architecture  
✔ Robust test coverage  
✔ Progressive Web App principles  
✔ Realistic user experience flows  

---

## 📌 Future Enhancements

Potential improvements:

- Advanced filtering (date / category)
- User preferences persistence
- Backend integration with live APIs
- Improved accessibility & ARIA coverage

---

## 📄 License

This project is provided for educational and portfolio purposes.

---

## 👨‍💻 Author

Developed by **Jett Berg**  
Full Stack Developer

---

If you are reviewing this project as a developer or recruiter, feedback and suggestions are always welcome.