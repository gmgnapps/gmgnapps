// src/app/page.js
"use client";

import { useState, useEffect, Suspense } from "react";
import ReferralSection from "./ReferralSection"; // Komponen baru untuk referral
import styles from "./page.module.css";

export default function Home() {
  const [points, setPoints] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [message, setMessage] = useState("");

  // Memuat data dari localStorage
  useEffect(() => {
    const storedPoints = localStorage.getItem("points");
    const storedCheckIn = localStorage.getItem("lastCheckIn");

    if (storedPoints) setPoints(parseInt(storedPoints));
    if (storedCheckIn) setLastCheckIn(storedCheckIn);

    // Memuat SDK Warpcast
    if (window["sdk"]) {
      window["sdk"].actions.ready();
    }
  }, []);

  // Fungsi untuk menangani check-in harian
  const handleCheckIn = () => {
    const today = new Date().toDateString();
    if (lastCheckIn === today) {
      setMessage("Kamu sudah check-in hari ini!");
      return;
    }

    setPoints((prevPoints) => prevPoints + 100);
    setLastCheckIn(today);
    setMessage("Check-in berhasil! Kamu mendapatkan 100 poin.");

    localStorage.setItem("points", points + 100);
    localStorage.setItem("lastCheckIn", today);
  };

  return (
    <div className={styles.container}>
      <h1>Hello, World!</h1>
      <p>Selamat datang di aplikasi mini Warpcast sederhana.</p>
      <div>
        <h2>Poin Kamu: {points}</h2>
        <button onClick={handleCheckIn} className={styles.button}>
          Check-in Harian
        </button>
        {message && <p>{message}</p>}
      </div>

      {/* Bagian Referral dengan Suspense */}
      <Suspense fallback={<p>Loading referral section...</p>}>
        <ReferralSection />
      </Suspense>
    </div>
  );
}