import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* maybe we can only display this on the timer screens? */}
      <div className="flex-grow flex flex-col">
        {/* takes the space between header and footer */}
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
