import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Trakr",
  description: "Task tracking application",
};

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="url(#gradient)" />
    <path d="M20 10L24.5 18H15.5L20 10Z" fill="white" />
    <circle cx="20" cy="25" r="5" fill="white" />
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF4500" />
        <stop offset="1" stopColor="#FF8C00" />
      </linearGradient>
    </defs>
  </svg>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="border-b border-gray-200 dark:border-gray-800 bg-background text-foreground">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Logo />
                <span className="text-xl font-bold">Trakr</span>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
