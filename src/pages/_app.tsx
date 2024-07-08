import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { HelmetProvider } from "react-helmet-async";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen">
        {router.pathname.startsWith("/timers") && <Header />}
        <div className="flex-grow flex flex-col">
          {/* takes the space between header and footer */}
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
