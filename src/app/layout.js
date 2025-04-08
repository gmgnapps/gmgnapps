// src/app/layout.js
export const metadata = {
  title: "Warpcast Mini App",
  description: "A simple Warpcast mini app",
  openGraph: {
    title: "Warpcast Mini App",
    description: "Check-in daily and invite friends to earn points!",
    images: [
      {
        url: "https://blush-hidden-mongoose-258.mypinata.cloud/ipfs/bafkreiblfdnva2paaprujwygp5x6mh4slgi4iixx75ejgzl5ouwknef2lq",
      },
    ],
  },
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "https://blush-hidden-mongoose-258.mypinata.cloud/ipfs/bafkreiblfdnva2paaprujwygp5x6mh4slgi4iixx75ejgzl5ouwknef2lq",
      button: {
        title: "Claim",
        action: {
          type: "launch_frame",
          name: "Claim",
          url: "https://gmgnapps.vercel.app",
          splashImageUrl: "https://blush-hidden-mongoose-258.mypinata.cloud/ipfs/bafkreiblfdnva2paaprujwygp5x6mh4slgi4iixx75ejgzl5ouwknef2lq",
          splashBackgroundColor: "#855dcd"
        },
      },
    }),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}