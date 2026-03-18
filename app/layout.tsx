import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dat Nguyen",
  description: "Highly skilled Fullstack Developer with over 7 years of experience in software development and technical leadership. I specialize in building scalable web applications and leading cross-functional teams in creating innovative digital platforms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${ibmPlexMono.variable} font-[family-name:var(--font-ibm-plex-mono)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
