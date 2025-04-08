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
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "https://blush-hidden-mongoose-258.mypinata.cloud/ipfs/bafybeigl52oq5hpfmndpm6gelkw6gdp2hoxmkc7q6bowxjkcdmuac4qa7m",
      aspectRatio: "3:2",
      button: {
        title: "Launch",
        action: {
          type: "launch_frame",
          name: "GMGNAPPS",
          url: "https://gmgnapps.vercel.app/",
          splashImageUrl: "https://blush-hidden-mongoose-258.mypinata.cloud/ipfs/bafybeigl52oq5hpfmndpm6gelkw6gdp2hoxmkc7q6bowxjkcdmuac4qa7m",
          splashBackgroundColor: "#855dcd",
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