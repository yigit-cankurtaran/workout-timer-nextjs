import React from "react";
import Link from "next/link";

function Header() {
  return (
    <div className="pl-2 fixed top-0 bg-slate-900">
      <Link href="/" className="text-2xl text-red-400 hover:text-red-600 ">
        ← Home
      </Link>
    </div>
  );
}

export default Header;
