// src/app/api/checkin/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const userId = body.untrustedData?.fid || "anonymous"; // Dapatkan FID pengguna dari Warpcast

  // Simulasi penyimpanan poin (gunakan database di produksi)
  const today = new Date().toDateString();
  const lastCheckInKey = `lastCheckIn_${userId}`;
  const pointsKey = `points_${userId}`;
  const lastCheckIn = localStorage.getItem(lastCheckInKey); // Ganti dengan database
  let points = parseInt(localStorage.getItem(pointsKey)) || 0;

  let message = "";
  if (lastCheckIn === today) {
    message = "Kamu sudah check-in hari ini!";
  } else {
    points += 100;
    localStorage.setItem(lastCheckInKey, today);
    localStorage.setItem(pointsKey, points);
    message = "Check-in berhasil! +100 poin.";
  }

  // Kembalikan frame baru
  return NextResponse.json({
    version: "v2",
    image: `https://blush-hidden-mongoose-258.mypinata.cloud/ipfs/bafybeigl52oq5hpfmndpm6gelkw6gdp2hoxmkc7q6bowxjkcdmuac4qa7m?message=${encodeURIComponent(message)}&points=${points}`,
    buttons: [
      { label: "Check-in", action: "post", target: "https://gmgnapps.vercel.app/api/checkin" },
      { label: "Get Referral Link", action: "post", target: "https://gmgnapps.vercel.app/api/referral" },
    ],
  });
}