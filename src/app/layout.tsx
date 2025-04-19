import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Mohamed Soliman",
  description: "Personal website of Mohamed Soliman, Computer Science and Mathematics student at Washington and Lee University.",
  icons: [
    { rel: 'icon', url: '/favicon.ico', type: 'image/png' },
    { rel: 'apple-touch-icon', url: '/favicon.ico', type: 'image/png' },
    { rel: 'shortcut icon', url: '/favicon.ico', type: 'image/png' }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
