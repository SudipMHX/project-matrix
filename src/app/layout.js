import { getUserFromCookie } from "@/lib/getUserFromCookie";
import { AuthProvider } from "@/context/AuthContext";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainMenu from "@/components/Shared/MainMenu";
import Link from "next/link";
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
          <footer className='bg-green-100 text-gray-700 mt-12 py-6'>
            <div className='max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center'>
              <p className='text-sm'>
                &copy; {new Date().getFullYear()} My Website. All rights
                reserved.
              </p>
              <div className='flex space-x-4 mt-2 md:mt-0 text-sm'>
                <Link href='#' className='hover:underline'>
                  Privacy Policy
                </Link>
                <Link href='#' className='hover:underline'>
                  Terms of Service
                </Link>
                <Link href='#' className='hover:underline'>
                  Contact
                </Link>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </AuthProvider>
  );
}
