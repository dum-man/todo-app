import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import Providers from "@/Providers";
import "./globals.scss";

const HelveticaNeueCyr = localFont({
  src: [
    {
      path: "../../public/fonts/HelveticaNeueCyr-Roman.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeueCyr-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeueCyr-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body className={HelveticaNeueCyr.className}>
          <div className="container">{children}</div>
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
