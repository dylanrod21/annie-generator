import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import "../styles/globals.css";

let title = "Annie Generator - Generate Images of the most beautiful girl in the world!";
let description = "An image generator trained on images of the most beautiful girl in the world.";
let ogimage = "https://annie-generator.vercel.app/og-image.png";
let sitename = "AnnieGenerator.io";

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: "https://annie-generator.vercel.app",
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#17181C] text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
