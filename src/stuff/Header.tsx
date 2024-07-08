import React from "react";
import Link from "next/link";

function Header() {
  return (
    <div className="m-4 p-4 fixed top-4 rounded-lg bg-slate-800">
      <Link
        href="/"
        className="text-center text-pretty text-2xl text-blue-400 hover:text-blue-600 "
      >
        ⬅️ Home
      </Link>
    </div>
  );
}

export default Header;
