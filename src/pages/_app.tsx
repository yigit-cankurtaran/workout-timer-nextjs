import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div>
      {router.pathname.startsWith("/timers") && <Header />}
      <div>
        {/* takes the space between header and footer */}
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
