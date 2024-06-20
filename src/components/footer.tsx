import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-500 w-full">
      {/* gonna make this actually a footer */}
      {/* need to install tailwind first */}
      <p className="text-center p-4 ">
        Made by{" "}
        <a
          href="https://github.com/yigit-cankurtaran"
          target="_blank"
          className="text-red-500"
        >
          Yiğit Cankurtaran
        </a>
        <Link href="/" className="text-red-700">
          Home
        </Link>
      </p>
    </footer>
  );
}
