import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import "@uploadthing/react/styles.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { type ReactNode } from "react";
import TopNav from "~/components/top-nav";
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
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="flex flex-col gap-y-4">
          <ThemeProvider>
            <TopNav />
            {children}
            {modal}
            <div id="modal-root" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
