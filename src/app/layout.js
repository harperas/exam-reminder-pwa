import { Geist, Geist_Mono } from "next/font/google";
import "rsuite/dist/rsuite-no-reset.min.css";
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Exam Reminder PWA",
  description: "Get reminders for your exam admit cards",
  icons: {
    icon: "/favicon/web-app-manifest-192x192.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
  },
  other: {
    "mobile-web-app-capable": "yes", // extra meta tag
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" reverseOrder={false} />

        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
