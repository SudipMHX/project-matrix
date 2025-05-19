import { getUserFromCookie } from "@/lib/getUserFromCookie";
import { AuthProvider } from "@/context/AuthContext";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainMenu from "@/components/Shared/MainMenu";
// import DockMenu from "@/components/Shared/DockMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Project Matrix",
};

export default async function RootLayout({ children }) {
  const user = await getUserFromCookie();

  return (
    <AuthProvider value={user}>
      <html lang='en' suppressHydrationWarning>
        <head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
          />
        </head>
        <body
          className={`${geistMono.variable}  ${geistSans.variable} antialiased overflow-x-hidden`}>
          <header className='relative md:static'>
            <MainMenu />
            {/* <DockMenu /> */}
          </header>
          <main className='flex flex-col'>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
