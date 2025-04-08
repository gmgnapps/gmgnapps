// src/app/page.js
"use client";
import { useState, useEffect, Suspense } from "react";
import ReferralSection from "./ReferralSection";
import styles from "./page.module.css";

export default function Home() {
  const [points, setPoints] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedPoints = localStorage.getItem("points");
    const storedCheckIn = localStorage.getItem("lastCheckIn");
    const storedUser = localStorage.getItem("farcasterUser"); // Simpan FID sementara di localStorage

    if (storedPoints) setPoints(parseInt(storedPoints));
    if (storedCheckIn) setLastCheckIn(storedCheckIn);
    if (storedUser) setUser(JSON.parse(storedUser));
    if (window["sdk"]) window["sdk"].actions.ready();
  }, []);

  const handleCheckIn = () => {
    const today = new Date().toDateString();
    if (lastCheckIn === today) {
      setMessage("Kamu sudah check-in hari ini!");
      return;
    }
    setPoints((prev) => prev + 100);
    setLastCheckIn(today);
    setMessage("Check-in berhasil! Kamu mendapatkan 100 poin.");
    localStorage.setItem("points", points + 100);
    localStorage.setItem("lastCheckIn", today);
  };

  return (
    <div className={styles.container}>
      <h1>Hello, World!</h1>
      <p>Selamat datang di aplikasi mini Warpcast sederhana.</p>
      {!user ? (
        <div>
          <p>Silakan login melalui Warpcast frame untuk melanjutkan.</p>
          {/* Petunjuk login via Warpcast frame */}
          <p>Tempel URL ini di Warpcast: <code>https://gmgnapps.vercel.app</code></p>
        </div>
      ) : (
        <>
          <p>Logged in as FID: {user.fid}</p>
          <div>
            <h2>Poin Kamu: {points}</h2>
            <button onClick={handleCheckIn} className={styles.button}>
              Check-in Harian
            </button>
            {message && <p>{message}</p>}
          </div>
          <Suspense fallback={<p>Loading referral section...</p>}>
            <ReferralSection />
          </Suspense>
        </>
      )}
    </div>
  );
}