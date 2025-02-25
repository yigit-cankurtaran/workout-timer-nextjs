import React from "react";
import Link from "next/link";
import fs from "fs";
// file system module to read the files in the directory
import path from "path";
// path module to get the file path
import Head from "next/head";
import StructuredData from "@/stuff/StructuredData";

type TimerLink = {
  href: string;
  name: string;
};

type TimerLinks = {
  timerLinks: TimerLink[];
};

export default function Home({ timerLinks }: TimerLinks) {
  return (
    <div className="flex flex-col items-center w-full">
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
        <meta property="og:type" content="website" />
      </Head>

      <StructuredData
        type="WebApplication"
        name="Workout Timers"
        description="Collection of workout timers including HIIT, EMOM, AMRAP, and For Time timers"
        url="https://yigit-cankurtaran.github.io/workout-timer-nextjs/"
        datePublished="2023-07-01"
        dateModified={new Date().toISOString().split("T")[0]}
      />

      <div className="text-center mb-12 mt-8">
        <h1 className="text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3">
          Workout Timers
        </h1>
        <p className="text-[#86868b] dark:text-[#86868b] max-w-md mx-auto">
          Choose a timer type to start your workout session
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {timerLinks.map(({ href, name }: TimerLink) => (
          <Link
            key={name}
            href={href}
            className="apple-card p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-apple transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 mb-4 rounded-full bg-[#0071e3] dark:bg-[#0077ed] flex items-center justify-center text-white">
              {getTimerIcon(name)}
            </div>
            <h2 className="text-xl font-semibold capitalize">{name}</h2>
            <p className="text-sm text-[#86868b] dark:text-[#86868b] mt-2 text-center">
              {getTimerDescription(name)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function getTimerIcon(name: string) {
  switch (name.toLowerCase()) {
    case "hiit":
      return "⏱️";
    case "tabata":
      return "🔄";
    case "emom":
      return "⏰";
    case "amrap":
      return "🔁";
    case "for time":
      return "⏳";
    default:
      return "⏱️";
  }
}

function getTimerDescription(name: string) {
  switch (name.toLowerCase()) {
    case "hiit":
      return "High-Intensity Interval Training";
    case "tabata":
      return "20s work, 10s rest for 8 rounds";
    case "emom":
      return "Every Minute On the Minute";
    case "amrap":
      return "As Many Rounds As Possible";
    case "for time":
      return "Complete workout as fast as possible";
    default:
      return "Workout timer";
  }
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
