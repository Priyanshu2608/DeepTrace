import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Script from "next/script"; // Import Script for external scripts

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DeepTrace",
  description: "Detect and analyze AI-generated content",
  icons: "/favicon.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Botpress Chatbot Scripts */}
        <Script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js" strategy="beforeInteractive" />
        <Script src="https://files.bpcontent.cloud/2025/03/20/09/20250320094107-7WLTM8YV.js" strategy="lazyOnload" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}