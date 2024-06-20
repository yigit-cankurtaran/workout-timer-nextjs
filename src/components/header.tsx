import React from "react";
import Link from "next/link";

function Header() {
  return (
    <header className="bg-slate-500 flex flex-row">
      i might handle the internal links here idk tho{" "}
      <Link href="/" className="text-red-500">
        Home
      </Link>
    </header>
  );
  //   i might also straight up delete this file
  // i want to get the crosshero timer feel first
}

export default Header;
