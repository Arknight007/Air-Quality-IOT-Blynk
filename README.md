# 🍃 Air Quality Sensoring IoT Project

[![License](https://img.shields.io/badge/License-MIT-14b8a6?style=for-the-badge)](LICENSE)
![Version](https://img.shields.io/badge/Version-1.0.0-0d9488?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-115e59?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-0f766e?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-164e63?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-9%2B-2dd4bf?style=for-the-badge&logo=firebase&logoColor=white)
![Blynk](https://img.shields.io/badge/Blynk-enabled-0e7490?style=for-the-badge)
![Prettier](https://img.shields.io/badge/Prettier-formatting-0891b2?style=for-the-badge&logo=prettier&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-configured-0f766e?style=for-the-badge&logo=eslint&logoColor=white)

> A smart IoT system that monitors Air Quality Index (AQI) and performs intelligent automation like switching on an air purifier, sending SMS or app notifications through Blynk when thresholds are breached — making indoor air healthier and smarter.

---
### 🖥️ Dashboard Screens

<div align="center">
  <img src="./screenshots/desktop1.png" width="600" alt="Desktop Screenshot 1"/>
<!--   <img src="./screenshots/desktop2.png" width="600" alt="Desktop Screenshot 2"/> -->
</div>

---

### 📲 Mobile Notification Demo

<div align="center">
  <img src="./screenshots/notification-demo.gif" width="260" alt="Mobile Notification Demo GIF"/>
</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [System Design](#-system-design)
- [Technology Stack](#-technology-stack)
- [Folder Structure](#-folder-structure)
- [Screenshots](#-screenshots)
- [How It Works](#-how-it-works)
- [License](#-license)

---

## 🧠 Overview

This project uses sensor data to track real-time AQI and executes automated routines (like turning on an air purifier) when certain environmental thresholds are crossed. The entire system is integrated with the **Blynk IoT platform** for sending **real-time alerts** via push notifications and SMS.

---

## ✨ Features

- 🧪 Real-time AQI Monitoring via Sensors
- ⚙️ Automated Air Purifier Control
- 📲 Notification & SMS via Blynk
- 🌐 Firebase for Realtime Data Syncing
- 🖼️ Clean, component-driven UI (Next.js + Tailwind CSS)
- 📡 MQTT/Blynk Protocol Integration

---

## 🏗️ System Architecture

```mermaid
graph TD
    A[Sensors] --> B[ESP32 Microcontroller]
    B --> C[Blynk Cloud]
    C --> D[Mobile Notifications]
    C --> E[SMS Alert]
    C --> F[Air Purifier Relay]
```

- **ESP32** reads AQI sensor data (like MQ135 or PMS5003).
- Sends data to **Blynk Cloud** over Wi-Fi.
- Triggers automation (e.g., relay for air purifier).
- Sends **notifications/SMS** based on threshold logic.

---

## 🧩 System Design

- **Frontend**: Built with Next.js (App Router), styled using Tailwind CSS.
- **Backend Logic**: AQI threshold logic handled in ESP32 + Firebase Functions (optional).
- **Communication**: Blynk App (via HTTP/WebSockets).
- **Notifications**: App push or SMS using Blynk triggers.
- **Data Handling**: Uses Firebase if persistence needed.

---

## 🛠️ Technology Stack

| Layer            | Tech/Platform          |
|------------------|------------------------|
| Frontend         | Next.js 14, Tailwind CSS |
| Language         | TypeScript             |
| IoT Controller   | ESP32                  |
| IoT Platform     | Blynk IoT              |
| Messaging        | Blynk Notifications, SMS |
| Cloud Realtime DB| Firebase (Firestore)   |
| Styling          | Tailwind CSS           |
| Dev Tools        | ESLint, Prettier       |
---

## ⚙️ How It Works

1. The AQI sensor measures air quality in real time.
2. Data is sent via ESP32 to Blynk over Wi-Fi.
3. If AQI is above a defined threshold:
   - Relay triggers the air purifier.
   - Blynk sends SMS and notification alerts.
4. UI displays live data and system status.

---

## Work-Flow
```mermaid
sequenceDiagram
    participant S as Sensor
    participant M as ESP32 Microcontroller
    participant B as Blynk Cloud
    participant N as Mobile Notification
    participant SMS as SMS Alert
    participant R as Air Purifier Relay

    S->>M: Measure AQI
    M->>B: Send AQI Data via Wi-Fi
    B->>N: Trigger Notification
    B->>SMS: Trigger SMS Alert
    B->>R: Activate Relay (Air Purifier)
```
## 📄 License

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-0d9488?style=for-the-badge&logo=gnu&logoColor=white)](https://www.gnu.org/licenses/agpl-3.0.html)

This project is licensed under the [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.html).

---
> Made using code, sensors, and care for cleaner air.
