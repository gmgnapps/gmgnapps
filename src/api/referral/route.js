// src/app/api/referral/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const fid = body.untrustedData?.fid || "anonymous";

  const referralKey = `referral_${fid}`;
  let referralId = localStorage.getItem(referralKey);
  if (!referralId) {
    referralId = Math.random().toString(36).substr(2, 9);
    localStorage.setItem(referralKey, referralId);
  }
  const referralLink = `https://gmgnapps.vercel.app?ref=${referralId}`;
  const points = parseInt(localStorage.getItem(`points_${fid}`)) || 0;

  return NextResponse.json({
    version: "v2",
    image: `https://blush-hidden-mongoose-258.mypinata.cloud/ipfs/bafybeigl52oq5hpfmndpm6gelkw6gdp2hoxmkc7q6bowxjkcdmuac4qa7m?message=${encodeURIComponent(`Referral Link: ${referralLink}`)}&points=${points}`,
    buttons: [
      { label: "Check-in", action: "post", target: "https://gmgnapps.vercel.app/api/checkin" },
      { label: "Get Referral", action: "post", target: "https://gmgnapps.vercel.app/api/referral" },
    ],
  });
}