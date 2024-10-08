import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import "@uploadthing/react/styles.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { type ReactNode } from "react";
import { CSPostHogProvider } from "~/app/_analytics/provider";
import TopNav from "~/components/top-nav";
import { Toaster } from "~/components/ui/sonner";
import { ThemeProvider } from "~/providers/theme-provider";

export const metadata: Metadata = {
  title: "T3 Gallery",
  description: "A base example project using the T3 stack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: ReactNode; modal: ReactNode }>) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en" className={`${GeistSans.variable}`}>
          <body>
            <ThemeProvider>
              <div className="grid-rows-[auto, 1fr] grid h-screen">
                <TopNav />
                <main className="overflow-y-scroll">{children}</main>
              </div>
              {modal}
              <div id="modal-root" />
            </ThemeProvider>
            <Toaster />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
