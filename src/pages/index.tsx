import React from "react";
import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../lib/sanity";
import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Head from "next/head";

type HomeProps = {
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  ctaLink: string;
  heroImage: SanityImageSource;
};

export default function HomePage({
  heroTitle,
  heroSubtitle,
  ctaText,
  ctaLink,
  heroImage,
}: HomeProps) {
  return (
    <>
      <Head>
        <title>Dr. Vani R | Gynecologist in Bangalore</title>
        <meta
          name="description"
          content="Trusted gynecology care by Dr. Vani R in Bangalore. Book appointments, learn services, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>

      <main className="homepage">
        <h1>{heroTitle}</h1>
        <p className="subtitle">{heroSubtitle}</p>
        {heroImage && (
          <Image
            className="hero-image"
            width={500}
            height={100}
            src={urlFor(heroImage).width(800).url()}
            alt="Clinic Hero"
          />
        )}
        <a className="cta-button" href={ctaLink}>
          {ctaText}
        </a>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "home"][0]`;
  const data = await sanityClient.fetch(query);

  return {
    props: {
      heroTitle: data.heroTitle || "",
      heroSubtitle: data.heroSubtitle || "",
      ctaText: data.ctaText || "",
      ctaLink: data.ctaLink || "#",
      heroImage: data.heroImage || null,
    },
    revalidate: 60,
  };
};
