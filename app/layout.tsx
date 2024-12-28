// @components
import { AppSidenav } from "@/components/app-sidenav";

// @utils
import { generateMetadata } from "@/lib/utils";

// fonts
import localFont from "next/font/local";

// @styles
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:overflow-hidden">
          <AppSidenav />
          {children}
        </div>
      </body>
    </html>
  );
}
