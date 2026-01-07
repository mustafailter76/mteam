# MTEAM – Digital Game E-Commerce Platform

Modern, full-stack e-commerce platform that allows users to browse, purchase, and manage digital games with integrated wallet and library system.

---

## 🚀 Project Overview

**MTEAM** is an e-commerce ecosystem inspired by professional platforms like Steam and Epic Games.

The application provides role-based user flows:

- Logged-out users can browse the catalog and view game details  
- Logged-in users can:
  - add games to cart  
  - purchase via wallet balance  
  - manage owned games in library  
  - update profile and funds  

---

## 🧱 Tech Stack

### Frontend
- React  
- Redux Toolkit  
- Axios  
- Material UI  
- React Router v6  

### Backend
- Java Spring Boot  
- Gradle  
- Layered Architecture (Controller / Service / Repository / DTO)

### Database
- PostgreSQL  
- Relational Model + Indexes  

---

## ✨ Core Features

- **Authentication & Authorization**
  - Dynamic UI based on session  
  - Protected routes for cart and profile  

- **Wallet System**
  - Top-up / withdraw  
  - Balance sufficiency check  
  - Duplicate ownership prevention  

- **Game Library**
  - Owned games listing  
  - Purchase history  
  - Real-time catalog sync  

- **Modular Design**
  - Sustainable folder structure  
  - SRP compliance  
  - Reusable components  

---

## ⚙️ Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
gradle build
gradle bootRun
```

---

## 📌 Notes

- `node_modules` and compiled outputs are excluded from repository  
- Dependencies are restored locally via `npm install`  
- This project demonstrates full-stack engineering principles  

---

## 📄 License

This repository is developed for educational and portfolio purposes.
