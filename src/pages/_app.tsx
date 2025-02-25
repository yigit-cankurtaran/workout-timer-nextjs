import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/stuff/Footer";
import Header from "@/stuff/Header";
import { useRouter } from "next/router";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
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
