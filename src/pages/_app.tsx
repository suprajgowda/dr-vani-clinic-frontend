import type { AppProps } from "next/app";
import "../app/globals.css"; // adjust if it's in a different folder
import Navbar from "@/components/Navbar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
