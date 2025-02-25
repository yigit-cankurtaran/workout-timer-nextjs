import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Head>
        <title>Page Not Found | Workout Timer</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist."
        />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link href="/" className="apple-button">
        Return to Home
      </Link>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">
          Try one of our workout timers:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
          <Link href="/timers/hiit" className="apple-button-secondary">
            HIIT Timer
          </Link>
          <Link href="/timers/emom" className="apple-button-secondary">
            EMOM Timer
          </Link>
          <Link href="/timers/amrap" className="apple-button-secondary">
            AMRAP Timer
          </Link>
          <Link href="/timers/for-time" className="apple-button-secondary">
            For Time Timer
          </Link>
        </div>
      </div>
    </div>
  );
}
