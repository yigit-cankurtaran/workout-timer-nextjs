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
      {/* on the other site they have this same logic but "for time" */}
      <p></p>
      <Link href="/timers/emom">emom</Link>
      <p></p>
      <Link href="/timers/hiit">hiit</Link>
      {/* test your current timers then implement the rest */}
      {/* then add a nice little design then you can p much deploy */}
    </div>
  );
}
