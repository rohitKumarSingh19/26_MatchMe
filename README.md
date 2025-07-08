# 💖 MatchMe - Smart Matchmaking Application

MatchMe is a modern matchmaking platform built with **Vite + React** for the frontend and **Node.js + MongoDB** for the backend. It connects people based on shared values, interests, and advanced AI-based compatibility scoring.

---

## 🔗 Live Demo

> Coming soon...

---

## 🚀 Features

### ✅ Core Features
- **User Registration & Login** with Email/Phone authentication
- **User Profile Management (CRUD)**: Name, age, gender, hobbies, education, profession, etc.
- **Profile Picture Upload** (public/private/connection-only visibility)
- **Search & Filter** by age, religion, profession, etc.
- **Real-Time Chat System** using Socket.io
- **Premium Membership** (advanced features for subscribed users)

### 💡 Unique Features
- **AI-based Match & Trust %**
- **Profile Picture Control per Chat**
- **Relationship Progress Tracker**
- **Behavior-Based Match Suggestions**

### 🔐 Privacy & Safety
- **Block/Report Users**
- **Verified Badge System**

### 📊 Admin Panel
- User insights, reported cases, and subscription analytics

### 🌙 UI/UX & Responsiveness
- Dark Mode Support
- Fully Responsive Design
- Clean Chakra UI design system

---

## 🛠️ Tech Stack

### Frontend
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [React Router](https://reactrouter.com/)
- [Socket.io-client](https://socket.io/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT Authentication](https://jwt.io/)
- [Socket.io (Real-time communication)](https://socket.io/)

---

## 📂 Folder Structure (Frontend)

matchme-client/
├── public/
│ └── banner.jpg
├── src/
│ ├── components/ # Reusable components (e.g., Navbar, Footer)
│ ├── contexts/ # Context API (Auth)
│ ├── pages/ # Page components (Home, Profile, Chat, Search)
│ ├── services/ # API handler (axios instance)
│ ├── App.jsx
│ ├── main.jsx
│ └── theme.js # Custom Chakra UI theme
└── package.json


---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/matchme.git
cd matchme

Install dependencies
Frontend
cd matchme-client
npm install

Backend
cd matchme-server
npm install

Setup environment variables
Frontend (matchme-client/.env)
VITE_BACKEND_URL=http://localhost:5000

 Run the app
 Start Backend
 cd matchme-server
npm run dev

Start Frontend
cd matchme-client
npm run dev

