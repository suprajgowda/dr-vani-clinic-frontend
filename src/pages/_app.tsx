import type { AppProps } from "next/app";
import "../app/globals.css"; // adjust if it's in a different folder
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Navigation from "@/components/Navigation";
import Footer2 from "@/components/Footer2";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
    >
      <Navigation />
      <Component {...pageProps} />
      <Footer2 />
    </GoogleReCaptchaProvider>
  );
}
