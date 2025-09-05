import Image from "next/image";
import React from "react";
import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Head from "next/head";

type Service = {
  title: string;
  description: string;
  image: SanityImageSource;
  subServices?: string[];
};

type ServicesPageProps = {
  services: Service[];
};

export default function ServicesPage({ services }: ServicesPageProps) {
  return (
    <>
      <Head>
        <title>
          Gynecology, Fertility & Laparoscopy Services | Dr. Vani R Bangalore
        </title>
        <meta
          name="description"
          content="Explore expert gynecology services including fertility treatments, pregnancy care, and laparoscopic surgery with Dr. Vani R, senior gynecologist in Basavanagudi, Bangalore."
        />
        <link
          rel="canonical"
          href="https://www.drvanigynaecologistbangalore.com/services"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Gynecology, Fertility & Laparoscopy Services | Dr. Vani R"
        />
        <meta
          property="og:description"
          content="Expert gynecology, fertility, pregnancy care, and laparoscopy services in Bangalore."
        />
        <meta
          property="og:url"
          content="https://www.drvanigynaecologistbangalore.com/services"
        />
        {/* Optional static OG image: <meta property="og:image" content="https://www.drvanigynaecologistbangalore.com/og-services.jpg" /> */}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Gynecology, Fertility & Laparoscopy Services | Dr. Vani R"
        />
        <meta
          name="twitter:description"
          content="Trusted gynecologist in Basavanagudi, Bangalore. 23+ years, 5000+ laparoscopic surgeries."
        />
      </Head>
      <div className="bg-gray-50 py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            Our Services
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="relative w-full h-[15rem] sm:h-[28rem] overflow-hidden bg-white rounded-md">
                  {/* Background layer – fills the box */}
                  <Image
                    src={urlFor(service.image).url()}
                    alt=""
                    fill
                    className="object-cover blur-sm scale-110 opacity-60"
                    aria-hidden // decorative
                  />
                  {/* Foreground layer – real image without distortion */}
                  <Image
                    src={urlFor(service.image).url()}
                    alt={service.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-[#ed9282] mb-2">
                    {service.title}
                  </h2>

                  <p className="text-base sm:text-lg leading-7 text-gray-700 mb-4">
                    {service.description}
                  </p>

                  {service.subServices && (
                    <ul className="list-disc list-inside text-base sm:text-lg leading-7 text-gray-600 space-y-1">
                      {service.subServices.map((item, subIdx) => (
                        <li key={subIdx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "services"][0].servicesList`;
  const services = await sanityClient.fetch(query);

  return {
    props: {
      services,
    },
    revalidate: 60, // Rebuild the page at most once per minute
  };
};
