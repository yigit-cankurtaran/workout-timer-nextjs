import React from "react";
import Link from "next/link";
import fs from "fs";
// file system module to read the files in the directory
import path from "path";
// path module to get the file path
import Head from "next/head";

type TimerLink = {
  href: string;
  name: string;
};

type TimerLinks = {
  timerLinks: TimerLink[];
};

export default function Home({ timerLinks }: TimerLinks) {
  return (
    <div className="flex-grow flex justify-center items-center flex-col w-full bg-slate-900 text-gray-100">
      <Head>
        <title>Workout Timers</title>
        <meta
          name="description"
          content="Workout timers for different types of workouts"
        />
        <meta property="og:title" content="Workout Timers" />
        <meta
          property="og:description"
          content="Some minimal workout timers such as HIIT, Tabata, EMOM, AMRAP, designed with Next.js"
        />
        <meta
          property="og:url"
          content="https://yigit-cankurtaran.github.io/workout-timer-nextjs/"
        />
      </Head>
      {timerLinks.map(({ href, name }: TimerLink) => (
        <Link
          key={name}
          // name of the file
          href={href}
          // path to the file
          className="text-center text-2xl text-blue-400 hover:text-blue-600 p-4 font-bold m-4"
        >
          {name}
        </Link>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const timersDir = path.join(process.cwd(), "src/pages/timers");
  // get the path to the timers directory
  const filenames = fs.readdirSync(timersDir);
  // read the files in the directory

  const timerLinks = filenames.map((filename) => {
    const name = filename.replace(/\.tsx$/, "");
    // remove the .tsx extension
    return {
      href: `timers/${name}`,
      // path to the file
      name: name.replace(/-/g, " "),
      // replace the hyphens with spaces
    };
  });

  return {
    props: {
      timerLinks,
      // pass the timerLinks to the component
    },
  };
}
