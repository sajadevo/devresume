// @components
import { AppSidenav } from "@/components/app-sidenav";
import { OpenPanelComponent } from "@openpanel/nextjs";

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
      <OpenPanelComponent
        clientId={process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID!}
        trackScreenViews={true}
        trackAttributes={true}
        trackOutgoingLinks={true}
      />
      <body className={`${geistSans.variable} antialiased`}>
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:overflow-hidden">
          <AppSidenav />
          <div className="col-span-full lg:col-span-3 p-2">
            <div className="relative z-50 w-full h-full lg:h-[calc(100vh-16px)] lg:overflow-scroll bg-white border border-border rounded-3xl px-6 py-6 md:px-10 md:py-8">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
