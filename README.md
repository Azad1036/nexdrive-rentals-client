# 🚗 NextDrive Rentals - Car Rental Platform (Frontend)

Welcome to **NextDrive Rentals**, a modern, fully responsive car rental platform built using React and Tailwind CSS. This frontend SPA (Single Page Application) allows users to explore, book, and manage car rentals with a sleek and intuitive interface.

🌐 **[Live Site URL](https://next-zen.web.app/)**

---

## 📝 Project Overview

NextDrive Rentals was built as part of **Assignment Category 15**, fulfilling all frontend criteria with a focus on custom design, responsiveness, user interactivity, and meaningful content—free from lorem ipsum or default alerts.

---

## ✨ Key Frontend Features

- **Responsive Design**: Fully mobile, tablet, and desktop-friendly using Tailwind CSS.
- **Routing**: Smooth navigation using `react-router-dom` with multiple private and public routes.
- **Authentication UI**: Firebase-based login with conditional UI rendering (Google/Auth).
- **Search, Sort & Filter**: Cars can be sorted and searched based on multiple criteria.
- **Dark/Light Theme Toggle**: Context API-powered theming using DaisyUI (e.g., "synthwave").
- **Charts (Recharts)**: Visual insights into user bookings based on daily rental price.
- **Booking Actions**: Modify or cancel bookings via intuitive modals.
- **Interactive UI**: Cards, tables, and buttons feature engaging hover and transition effects.
- **Custom Alerts**: SweetAlert2 used for success/error notifications.

---

## 🛠️ Technologies Used

- **React.js**
- **Tailwind CSS**
- **React Router DOM**
- **Firebase Authentication**
- **Context API**
- **Recharts**
- **SweetAlert2**

---

## 📁 Project Structure & Pages

### 🔹 Public Pages

- `/` - Home (Banner, Why Choose Us, Recent Listings, Special Offers)
- `/availableCars` - All listed cars with Grid/List toggle, Sorting, and Search
- `/login` - Firebase Email/Password & Google Login
- `/register` - Secure Registration with validation
- `*` - 404 Page (custom design)

### 🔐 Private Pages

- `/addCar` - Add new cars with model, price, features, image, etc.
- `/myCars` - Manage added cars with update/delete, sorting, pagination
- `/myBookings` - View bookings in a table + Recharts-based analytics
- `/carDetails/:id` - Detailed view with "Book Now" option

---

## 📊 Chart Feature

- **Location**: `/myBookings` Page
- **Library**: Recharts
- **Purpose**: Visualize Daily Rental Price
- **Type**: Bar Chart / Line Chart (Customizable)

---

## 🔧 Setup Instructions

1. **Clone the Repo**

   ```bash
   git clone <your-client-side-repo-url>
   cd nextdrive-rentals
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   - Create a `.env` file in root:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   ```

4. **Run Locally**

   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

---

## 🚀 Deployment

- **Hosting**: Firebase
- **Live URL**: [https://next-zen.web.app/](https://next-zen.web.app/)
- **Status**: Fully working without 404, 504, or CORS errors.

---

## ✅ Assignment Compliance

- ✔️ Fully responsive design
- ✔️ No Lorem Ipsum or default alerts
- ✔️ Firebase Authentication
- ✔️ Private Routes (via `react-router-dom`)
- ✔️ Recharts used in Booking Page
- ✔️ Sorting, Searching, and Layout Toggle
- ✔️ Custom 404 Page
- ✔️ Minimum 15 meaningful commits
- ❌ JWT not implemented

---

## 📚 Useful Links

- 🔗 **Client Repo**: [https://github.com/Azad1036/Next-Zen-Client](https://github.com/Azad1036/Next-Zen-Client)
- 🔗 **Live Site**: [https://next-zen.web.app/](https://next-zen.web.app/)
