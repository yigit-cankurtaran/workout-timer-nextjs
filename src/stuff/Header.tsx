import React from "react";
import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-[#f5f5f7]/80 dark:bg-black/80 border-b border-[#d2d2d7]/20 dark:border-[#38383a]/30">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-[#0071e3] dark:text-[#0077ed] font-medium transition-all duration-200 hover:opacity-80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 mr-2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Home</span>
        </Link>

        <div className="flex items-center">
          <picture className="hidden sm:block">
            <source
              media="(prefers-color-scheme: dark)"
              srcSet="/workout-icon-dark.svg"
            />
            <source
              media="(prefers-color-scheme: light)"
              srcSet="/workout-icon.svg"
            />
            <img
              src="/workout-icon.svg"
              alt="Workout Timer"
              width="32"
              height="32"
            />
          </picture>
        </div>
      </div>
    </header>
  );
}

export default Header;
