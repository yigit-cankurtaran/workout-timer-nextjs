import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex flex-col">
        {/* takes the space between header and footer */}
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
