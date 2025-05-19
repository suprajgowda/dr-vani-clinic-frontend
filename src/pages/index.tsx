import React from "react";
import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Head from "next/head";

type HomeProps = {
  heroTitle: string;
  ctaText: string;
  ctaLink: string;
  heroImage: SanityImageSource;
  services: {
    serviceImage: SanityImageSource;
    serviceText: string;
  }[];
  sectionImage: SanityImageSource;
  sectionTitle: string;
  sectionDescription: string;
  sectionAchievements: string[];
  awardsSectionTitle: string;
  awardsSectionDescription: string;
  sectionAwards: {
    awardImage: SanityImageSource;
    awardTitle: string;
  }[];
};

export default function Home({
  heroTitle,
  ctaText,
  ctaLink,
  heroImage,
  services,
  sectionImage,
  sectionTitle,
  sectionDescription,
  sectionAchievements,
  awardsSectionTitle,
  awardsSectionDescription,
  sectionAwards,
}: HomeProps) {
  return (
    <>
      <Head>
        <title>Dr. Vani R | Gynecologist in Bangalore</title>
      </Head>

      {/* Hero Banner Section */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] overflow-hidden">
        <img
          src={urlFor(heroImage).url()}
          alt="Clinic Banner"
          className="absolute inset-0 w-full h-full object-cover object-center sm:object-top"
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4 py-12 sm:py-20 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {heroTitle}
          </h1>
          <a
            href={ctaLink}
            className="group mt-2 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-sm sm:text-base md:text-lg font-medium py-3 px-6 rounded transition duration-300"
          >
            {ctaText}
            <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </section>

      {services && services.length > 0 && (
        <section className="bg-gray-50 py-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              Our Services
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="relative group overflow-hidden rounded-lg shadow-md"
                >
                  <img
                    src={urlFor(service.serviceImage).width(600).url()}
                    alt={service.serviceText}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-white text-xl font-semibold text-center px-4">
                    {service.serviceText}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionTitle && sectionDescription && (
        <section className="bg-gray-50 py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            {sectionImage && (
              <div>
                <img
                  src={urlFor(sectionImage).width(600).url()}
                  alt="Dr. Vani"
                  className="rounded-lg shadow-md w-full"
                />
              </div>
            )}

            {/* Text Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {sectionTitle}
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                {sectionDescription}
              </p>

              {sectionAchievements?.length > 0 && (
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {sectionAchievements.map((item: string, idx: number) => (
                    <li key={idx} className="text-base">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {sectionAwards && sectionAwards.length > 0 && (
        <section className="bg-white py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Title & Description */}
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
              {awardsSectionTitle}
            </h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              {awardsSectionDescription}
            </p>

            {/* Awards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sectionAwards.map((award, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition"
                >
                  <img
                    src={urlFor(award.awardImage).width(400).url()}
                    alt={award.awardTitle}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h3 className="text-lg font-medium text-gray-800">
                    {award.awardTitle}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await sanityClient.fetch(`*[_type == "home"][0]`);

  return {
    props: {
      heroTitle: data?.heroTitle || "Welcome to Dr. Vani’s Clinic",
      ctaText: data?.ctaText || "Book Appointment",
      ctaLink: data?.ctaLink || "/contact",
      heroImage: data?.heroImage || null,
      services: data?.services || [],
      sectionImage: data?.sectionImage || null,
      sectionTitle: data?.sectionTitle || "",
      sectionDescription: data?.sectionDescription || "",
      sectionAchievements: data?.sectionAchievements || [],
      awardsSectionTitle: data?.awardsSectionTitle || "",
      awardsSectionDescription: data?.awardsSectionDescription || "",
      sectionAwards: data?.sectionAwards || [],
    },
    revalidate: 60,
  };
};
