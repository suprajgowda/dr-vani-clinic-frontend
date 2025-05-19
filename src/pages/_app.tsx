import type { AppProps } from "next/app";
import "../app/globals.css"; // adjust if it's in a different folder
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
