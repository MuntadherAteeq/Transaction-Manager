import type { Metadata } from "next";
import "./globals.css";
import "./styles.scss";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { GeistSans } from "geist/font/sans";
import favicon from "./favicon.ico";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Transaction Manager",
  description: "A Simple transaction manager app for managing your finances.",
  icons: {
    icon: favicon.src,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
