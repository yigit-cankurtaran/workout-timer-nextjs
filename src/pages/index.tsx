import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>hi</h1>
      <Link href="/timers/tabata">tabata</Link>
      <p></p>
      {/* empty paragraph here just to create space */}
      {/* will remove this during design and styling */}
      <Link href="/timers/amrap">amrap</Link>
    </div>
  );
}
