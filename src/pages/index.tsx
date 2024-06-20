import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-grow flex justify-center items-center flex-col w-full bg-gray-900 text-gray-100">
      <Link
        href="/timers/tabata"
        className="text-blue-400 hover:text-blue-600 p-2 m-2"
      >
        tabata
      </Link>
      <Link
        href="/timers/amrap"
        className="text-blue-400 hover:text-blue-600 p-2 m-2"
      >
        amrap
      </Link>
      <Link
        href="/timers/emom"
        className="text-blue-400 hover:text-blue-600 p-2 m-2"
      >
        emom
      </Link>
      <Link
        href="/timers/hiit"
        className="text-blue-400 hover:text-blue-600 p-2 m-2"
      >
        hiit
      </Link>
    </div>
  );
}
