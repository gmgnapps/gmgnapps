export const metadata = {
  title: "Warpcast Mini App",
  description: "A simple Warpcast mini app",
  openGraph: {
    title: "Warpcast Mini App",
    description: "Check-in daily and invite friends to earn points!",
    images: [
      {
        url: "/images/main-image.jpg",
      },
    ],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "/images/splash-image.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}