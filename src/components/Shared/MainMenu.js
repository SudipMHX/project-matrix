"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUser } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const MainMenu = () => {
  const pathname = usePathname();
  const { user, setUser } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    { label: "Home", href: "/" },
    { label: "Largest Number", href: "/largest-number" },
    { label: "Even Number", href: "/even-number" },
    { label: "Matrix ultiply", href: "/matrix-multiply" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents Tailwind mismatches

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      setUser(null); // clear user from context
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav
      className={`container mx-auto fixed top-2 left-1/2 -translate-x-1/2 flex items-center justify-between px-6 py-2 rounded-full z-50 backdrop-blur-3xl transition-all duration-300 ${
        isScrolled
          ? "border border-gray-200 w-[70%] md:w-[75%] lg:w-[65%]"
          : "w-full border-none"
      }`}>
      <div className='text-xl font-medium'>
        <Link href='/'>Project Matrix</Link>
      </div>
      <div className='hidden md:flex gap-6 text-sm text-gray-800 '>
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative ${isActive && "font-bold"}`}>
              <span className='relative inline-flex overflow-hidden'>
                <div className='translate-y-0 skew-y-0 transform-gpu transition-transform duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12'>
                  {item.label}
                </div>
                <div className='absolute translate-y-[110%] skew-y-12 transform-gpu transition-transform duration-500 group-hover:translate-y-0 group-hover:skew-y-0'>
                  {item.label}
                </div>
              </span>
            </Link>
          );
        })}
      </div>

      <div className='static md:relative flex items-center gap-2 font-semibold'>
        {user && (
          <>
            <Link href='/profile' className=''>
              <CircleUser />
            </Link>
            <button
              onClick={handleLogout}
              className='cursor-pointer bg-red-500 text-white px-3 py-1 rounded-2xl text-sm'>
              Logout
            </button>
          </>
        )}
        {!user && (
          <>
            <Link
              className='cursor-pointer bg-green-500 text-white px-3 py-1 rounded-2xl text-sm'
              href='/login'>
              Login
            </Link>
            <Link
              className='cursor-pointer hover:bg-green-500/20 px-3 py-1 rounded-2xl text-sm'
              href='/register'>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default MainMenu;
