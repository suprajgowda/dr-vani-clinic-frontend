import type { AppProps } from "next/app";
import "../app/globals.css"; // adjust if it's in a different folder

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
