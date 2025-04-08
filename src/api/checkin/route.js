// src/app/api/checkin/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const fid = body.untrustedData?.fid || "anonymous";
  const today = new Date().toDateString();

  // Simulasi penyimpanan dengan localStorage (ganti dengan database)
  const lastCheckInKey = `lastCheckIn_${fid}`;
  const pointsKey = `points_${fid}`;
  const lastCheckIn = localStorage.getItem(lastCheckInKey) || null;
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

  return NextResponse.json({
    version: "v2",
    image: `https://blush-hidden-mongoose-258.mypinata.cloud/ipfs/bafybeigl52oq5hpfmndpm6gelkw6gdp2hoxmkc7q6bowxjkcdmuac4qa7m?message=${encodeURIComponent(message)}&points=${points}`,
    buttons: [
      { label: "Check-in", action: "post", target: "https://gmgnapps.vercel.app/api/checkin" },
      { label: "Get Referral", action: "post", target: "https://gmgnapps.vercel.app/api/referral" },
    ],
  });
}