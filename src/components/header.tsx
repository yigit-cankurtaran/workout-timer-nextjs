import React from "react";
import Link from "next/link";

function Header() {
  return (
    <div className="m-2 p-2 fixed top-2 rounded-lg bg-slate-800">
      <Link
        href="/"
        className="text-center text-2xl text-red-400 hover:text-red-600 "
      >
        ⬅️ Home
      </Link>
    </div>
  );
}

export default Header;
