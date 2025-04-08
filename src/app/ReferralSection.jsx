// src/app/ReferralSection.jsx
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function ReferralSection() {
  const [referralLink, setReferralLink] = useState("");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();

  const generateReferralId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  useEffect(() => {
    const storedReferralId = localStorage.getItem("referralId");
    let userReferralId = storedReferralId;
    if (!userReferralId) {
      userReferralId = generateReferralId();
      localStorage.setItem("referralId", userReferralId);
    }
    setReferralLink(`${window.location.origin}?ref=${userReferralId}`);

    const ref = searchParams.get("ref");
    if (ref && ref !== userReferralId) {
      const referrerPoints = localStorage.getItem(`points_${ref}`) || 0;
      const newPoints = parseInt(referrerPoints) + 100;
      localStorage.setItem(`points_${ref}`, newPoints);
      setMessage("Referral berhasil! Pengguna yang mengundang mendapat 100 poin.");
    }
  }, [searchParams]);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setMessage("Referral link disalin ke clipboard!");
  };

  return (
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
      {message && <p>{message}</p>}
    </div>
  );
}