import React from "react";
import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Head from "next/head";
import Image from "next/image";

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
  testimonials: {
    name: string;
    photo: SanityImageSource; // or use SanityImageSource if typed
    content: string;
    rating: number;
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
  testimonials,
}: HomeProps & { testimonials: never[] }) {
  return (
    <>
      <Head>
        <title>Dr. Vani R | Gynecologist in Bangalore</title>
      </Head>

      {/* Hero Banner Section */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] overflow-hidden">
        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
          <Image
            src={urlFor(heroImage).url()}
            alt="Clinic Banner"
            fill
            priority
            className="object-cover object-center sm:object-top"
          />
        </div>

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
                  className="relative group overflow-hidden rounded-lg shadow-md h-64"
                >
                  <Image
                    src={urlFor(service.serviceImage).width(600).url()}
                    alt={service.serviceText}
                    fill
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
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
              <div className="relative w-full h-auto max-w-lg mx-auto">
                <div className="relative w-full h-[350px]">
                  <Image
                    src={urlFor(sectionImage).width(600).url()}
                    alt="Dr. Vani"
                    fill
                    className="rounded-lg shadow-md object-cover"
                  />
                </div>
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
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={urlFor(award.awardImage).width(400).url()}
                      alt={award.awardTitle}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {award.awardTitle}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials && testimonials.length > 0 && (
        <section className="bg-gray-100 py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              What Patients Say
            </h2>

            {/* Force scroll container to be constrained and enable scroll */}
            <div className="overflow-x-auto">
              <div className="flex gap-6 w-[200%] sm:w-[150%] md:w-[120%] lg:w-auto">
                {testimonials.map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg shadow-md p-6 my-2 flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] max-w-[90vw]"
                  >
                    <div className="flex flex-col items-center text-center">
                      {t.photo ? (
                        <div className="relative w-24 h-24 mb-4">
                          <Image
                            src={urlFor(t.photo).width(100).height(100).url()}
                            alt={t.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-300 mb-4" />
                      )}

                      <p className="text-gray-700 italic mb-4">
                        `&quot;`{t.content}`&quot;`
                      </p>
                      <p className="font-semibold text-gray-800 mb-2">
                        {t.name}
                      </p>

                      <div className="text-yellow-500">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                        {Array.from({ length: 5 - t.rating }).map((_, i) => (
                          <span key={i}>☆</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await sanityClient.fetch(`*[_type == "home"][0]`);

  const testimonials = await sanityClient.fetch(`*[_type == "testimonial"]{
    name,
    photo,
    content,
    rating
  }`);

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
      testimonials: testimonials || [],
    },
    revalidate: 60,
  };
};
