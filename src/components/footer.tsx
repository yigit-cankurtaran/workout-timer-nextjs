import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-100 w-full">
      <div className="max-w-screen-xl mx-auto py-4 px-8">
        <p className="text-center text-sm">
          Made by{" "}
          <a
            href="https://github.com/yigit-cankurtaran"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-600"
          >
            Yiğit Cankurtaran
          </a>{" "}
        </p>
      </div>
    </footer>
  );
}
