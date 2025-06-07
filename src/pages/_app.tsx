import type { AppProps } from "next/app";
import "../app/globals.css"; // adjust if it's in a different folder
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
    >
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </GoogleReCaptchaProvider>
  );
}
