// src/app/layout.js
export const metadata = {
  title: "Warpcast Mini App",
  description: "A simple Warpcast mini app",
  openGraph: {
    title: "Warpcast Mini App",
    description: "Check-in daily and invite friends to earn points!",
    images: [
      {
        url: "https://blush-hidden-mongoose-258.mypinata.cloud/ipfs/bafybeigl52oq5hpfmndpm6gelkw6gdp2hoxmkc7q6bowxjkcdmuac4qa7m",
      },
    ],
  },
  other: {
    "fc:frame": "v2", // Versi Frames v2
    "fc:frame:image": "https://blush-hidden-mongoose-258.mypinata.cloud/ipfs/bafybeigl52oq5hpfmndpm6gelkw6gdp2hoxmkc7q6bowxjkcdmuac4qa7m",
    "fc:frame:image:aspect_ratio": "3:2",
    "fc:frame:button:1": "Check-in", // Tombol untuk check-in harian
    "fc:frame:button:1:action": "post", // Aksi POST ke server
    "fc:frame:button:1:target": "https://gmgnapps.vercel.app/api/checkin", // Endpoint untuk check-in
    "fc:frame:button:2": "Get Referral Link", // Tombol untuk referral
    "fc:frame:button:2:action": "post", // Aksi POST ke server
    "fc:frame:button:2:target": "https://gmgnapps.vercel.app/api/referral", // Endpoint untuk referral
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}