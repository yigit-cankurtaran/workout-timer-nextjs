import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/stuff/Footer";
import Header from "@/stuff/Header";
import { useRouter } from "next/router";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const canonicalUrl = `https://yigit-cankurtaran.github.io/workout-timer-nextjs${router.pathname}`;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta
          name="theme-color"
          content="#f5f5f7"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="application-name" content="Workout Timer" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Workout Timer" />
        <meta
          name="twitter:description"
          content="Customizable workout timers for HIIT, Tabata, EMOM, AMRAP, and For Time workouts"
        />
      </Head>
      <div className="flex flex-col min-h-screen bg-[#f5f5f7] dark:bg-black text-[#1d1d1f] dark:text-white transition-colors duration-300">
        {router.pathname.startsWith("/timers") && <Header />}
        <main className="flex-grow flex flex-col px-4 sm:px-6 md:px-8 pt-6 pb-20">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
