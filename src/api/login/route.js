// src/app/api/login/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const fid = body.untrustedData?.fid || "anonymous"; // FID dari pengguna Warpcast

  // Kembalikan frame baru dengan opsi check-in dan referral
  return NextResponse.json({
    version: "v2",
    image: `https://blush-hidden-mongoose-258.mypinata.cloud/ipfs/bafybeigl52oq5hpfmndpm6gelkw6gdp2hoxmkc7q6bowxjkcdmuac4qa7m?message=${encodeURIComponent(`Logged in as FID: ${fid}`)}`,
    buttons: [
      { label: "Check-in", action: "post", target: "https://gmgnapps.vercel.app/api/checkin" },
      { label: "Get Referral", action: "post", target: "https://gmgnapps.vercel.app/api/referral" },
    ],
  });
}