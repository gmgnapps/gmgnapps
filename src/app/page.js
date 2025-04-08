"use client"; // Menandakan ini adalah Client Component

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const [points, setPoints] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [message, setMessage] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const searchParams = useSearchParams();

  // Fungsi untuk menghasilkan ID unik sederhana untuk referral
  const generateReferralId = () => {
    return Math.random().toString(36).substr(2, 9); // ID acak sederhana
  };

  // Memuat data dari localStorage dan memproses referral
  useEffect(() => {
    const storedPoints = localStorage.getItem("points");
    const storedCheckIn = localStorage.getItem("lastCheckIn");
    const storedReferralId = localStorage.getItem("referralId");

    if (storedPoints) setPoints(parseInt(storedPoints));
    if (storedCheckIn) setLastCheckIn(storedCheckIn);

    // Buat atau ambil referral ID pengguna
    let userReferralId = storedReferralId;
    if (!userReferralId) {
      userReferralId = generateReferralId();
      localStorage.setItem("referralId", userReferralId);
    }
    setReferralLink(`${window.location.origin}?ref=${userReferralId}`);

    // Cek apakah ada referral dari URL
    const ref = searchParams.get("ref");
    if (ref && ref !== userReferralId) {
      // Berikan poin ke pengguna yang mereferensikan
      const referrerPoints = localStorage.getItem(`points_${ref}`) || 0;
      const newPoints = parseInt(referrerPoints) + 100;
      localStorage.setItem(`points_${ref}`, newPoints);
      setMessage("Referral berhasil! Pengguna yang mengundang mendapat 100 poin.");
    }

    // Memuat SDK Warpcast
    if (window["sdk"]) {
      window["sdk"].actions.ready(); // Memberitahu Warpcast bahwa aplikasi siap
    }
  }, [searchParams]);

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

    // Simpan ke localStorage
    localStorage.setItem("points", points + 100);
    localStorage.setItem("lastCheckIn", today);
  };

  // Fungsi untuk menyalin referral link ke clipboard
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setMessage("Referral link disalin ke clipboard!");
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

      {/* Bagian Referral */}
      <div className={styles.referralSection}>
        <h3>Undang Teman dan Dapatkan Poin!</h3>
        <p>Gunakan link ini untuk mengundang teman. Setiap referral = 100 poin.</p>
        <input
          type="text"
          value={referralLink}
          readOnly
          className={styles.referralInput}
        />
        <br />
        <button onClick={copyReferralLink} className={styles.button}>
          Salin Link
        </button>
      </div>
    </div>
  );
}