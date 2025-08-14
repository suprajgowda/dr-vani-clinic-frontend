import type { AppProps } from "next/app";
import "../app/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
    >
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </GoogleReCaptchaProvider>
  );
}
