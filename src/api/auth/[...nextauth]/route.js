// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import FarcasterProvider from "@farcaster/auth-kit/next-auth";

export const { handlers, auth } = NextAuth({
  providers: [
    FarcasterProvider({
      clientId: "your-app-fid", // Ganti dengan FID aplikasi Anda
      clientSecret: "your-app-secret", // Ganti dengan secret dari Farcaster
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user.fid = token.sub; // Simpan FID di sesi
      return session;
    },
  },
});

export { handlers as GET, handlers as POST };