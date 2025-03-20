import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Script from "next/script";
import StarsContainer from "@/components/ui/stars-container";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DeepTrace",
  description: "Detect and analyze AI-generated content",
  icons: "/favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js" strategy="beforeInteractive" />
        <Script src="https://files.bpcontent.cloud/2025/03/20/09/20250320094107-7WLTM8YV.js" strategy="lazyOnload" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Grid background with blur for light theme */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:hidden bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
          </div>
          
          {/* Stars container only rendered in dark mode */}
          <div className="dark:block hidden">
            <StarsContainer />
          </div>
          
          <div className="min-h-screen flex flex-col relative z-0">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}