import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-grow flex justify-center items-center flex-col w-full bg-slate-900 text-gray-100">
      <Link
        href="/timers/tabata"
        className="text-red-400 hover:text-red-600 p-4 text-2xl font-bold m-4"
      >
        tabata
        {/* these can be bigger for mobile users and such */}
      </Link>
      <Link
        href="/timers/amrap"
        className=" text-red-400 hover:text-red-600 p-4 text-2xl font-bold m-4"
      >
        amrap
      </Link>
      <Link
        href="/timers/emom"
        className="text-red-400 hover:text-red-600 p-4 text-2xl font-bold m-4"
      >
        emom
      </Link>
      <Link
        href="/timers/hiit"
        className="text-red-400 hover:text-red-600 p-4 text-2xl font-bold m-4"
      >
        hiit
      </Link>
      <Link
        href="/timers/fortime"
        className="text-red-400 hover:text-red-600 p-4 text-2xl font-bold m-4"
      >
        for time
      </Link>
    </div>
  );
}
