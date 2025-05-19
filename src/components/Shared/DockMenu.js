"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Info,
  Mail,
  LayoutPanelLeft,
  Library,
  CircleUser,
  LogIn,
} from "lucide-react";

const items = [
  { label: "Profile", href: "/profile", icon: CircleUser },
  { label: "Home", href: "/", icon: Home },
  { label: "Login", href: "/login", icon: LogIn },
];

export default function DockMenu() {
  const pathname = usePathname();

  return (
    <div className='md:hidden fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl'>
      <div className='flex justify-center gap-4 px-8 py-3 bg-white/50 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200/70 dark:border-gray-600/20 shadow-lg dark:shadow-gray-900/30 rounded-t-3xl'>
        {items.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link key={label} href={href}>
              <div
                className={`relative flex flex-col items-center group cursor-pointer transition-all duration-300 ${
                  isActive ? "scale-125 -translate-y-2" : ""
                }`}>
                <div
                  className={`p-3 mt-2 rounded-full transition-all ${
                    isActive
                      ? "bg-blue-600/10 dark:bg-blue-400/10 backdrop-blur-3xl"
                      : "hover:bg-gray-200/30 dark:hover:bg-gray-700/50"
                  }`}>
                  <Icon
                    className={`h-5 w-5 transition-colors ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  />
                </div>

                <span
                  className={`text-[9px] font-medium transition-all absolute -bottom-3 py-0.5 ${
                    isActive
                      ? "opacity-100 text-blue-600 dark:text-blue-400"
                      : "opacity-0 group-hover:opacity-70 text-gray-600 dark:text-gray-300"
                  }`}>
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
