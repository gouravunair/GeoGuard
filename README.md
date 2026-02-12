# 🌍 GeoGuard AI: IoT Landslide Early Warning System

![GeoGuard Banner](https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop)

> **A Next-Gen Real-time Landslide Monitoring Dashboard built for the CUSAT Hackathon 2026.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## 🚀 Overview

**GeoGuard AI** is a state-of-the-art monitoring dashboard designed to detect and warn against potential landslides in real-time. By integrating IoT sensor data with a high-performance web interface, we provide authorities and communities with crucial early warnings to save lives.

Our system features a **glassmorphism UI**, **3D terrain visualization**, and **instant alerts** triggered by live soil moisture and ground movement data.

## ✨ Key Features

-   **📡 Real-time Monitoring:** Live visualization of Ground Distance (movement), Soil Humidity, and Temperature.
-   **⚠️ Smart Alert System:** Automatic audio-visual alerts (Red Flash + Alarm) when risk thresholds are breached.
-   **🏔️ 3D Terrain Visualization:** Interactive 3D background that shifts color based on risk levels (Green/Yellow/Red).
-   **📊 Dynamic Data Charts:** Sleek Area Charts with gradient fills to track environmental trends over time.
-   **☁️ Cloud Integration:** Seamless real-time data syncing via **Supabase**.
-   **📱 Fully Responsive:** Optimized for desktops, tablets, and mobile devices.

## 🛠️ Tech Stack

-   **Frontend:** Next.js 14 (App Router), React, TypeScript
-   **Styling:** Tailwind CSS, Framer Motion (Animations)
-   **3D Graphics:** React Three Fiber, Drei
-   **Backend / DB:** Supabase (Postgres & Realtime Subscription)
-   **Visualization:** Recharts
-   **Icons:** Lucide React

## 📸 Screenshots

| Dashboard View | Alert Mode |
|:---:|:---:|
| *(Place screenshot here)* | *(Place screenshot here)* |

## ⚙️ Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/gouravunair/GeoGuard.git
    cd GeoGuard
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👥 Meet Team E

Built with ❤️ for **Cochin University of Science and Technology Hackathon**.

| Member | Role |
| :--- | :--- |
| **Gourav** | Full Stack Developer |
| **Joseph** | IoT Specialist |
| **Yaseen** | Frontend Engineer |
| **Gaurinandana** | UI/UX Designer |
| **Parvathy** | Research & Documentation |

---

## 📞 Contact

📧 **Email:** [gouravunair@gmail.com](mailto:gouravunair@gmail.com)

© 2026 **TEAM E** | Using Technology to Save Lives.
