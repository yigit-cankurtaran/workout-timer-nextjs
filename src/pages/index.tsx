import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-grow flex justify-center items-center flex-col w-full bg-black">
      <Link className="text-blue-300 p-2 m-2" href="/timers/tabata">
        tabata
      </Link>
      <Link className="text-blue-300 p-2 m-2" href="/timers/amrap">
        amrap
      </Link>
      <Link className="text-blue-300 p-2 m-2" href="/timers/emom">
        emom
      </Link>
      <Link className="text-blue-300 p-2 m-2" href="/timers/hiit">
        hiit
      </Link>
    </div>
  );
}
