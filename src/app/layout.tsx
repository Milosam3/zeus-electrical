import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { config } from "@/client.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${config.business.legalName} — ${config.business.area}`,
  description: config.business.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          :root {
            --brand-primary: ${config.theme.primary};
            --brand-accent: ${config.theme.accent};
          }
        `}</style>
      </head>
      <body className={`${inter.className} antialiased min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
