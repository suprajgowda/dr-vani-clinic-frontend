import React from "react";
import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";

type Service = {
  title: string;
  description: string;
  icon: SanityImageSource;
};

type FAQ = {
  question: string;
  answer: string;
};

type ServicesProps = {
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage: SanityImageSource;
  services: Service[];
  whyTitle: string;
  whyPoints: string[];
  ctaText: string;
  ctaButtonText: string;
  ctaLink: string;
  faqs: FAQ[];
};

const ServicesPage = ({
  heroTitle,
  heroSubtitle,
  heroBackgroundImage,
  services,
  whyTitle,
  whyPoints,
  ctaText,
  ctaButtonText,
  ctaLink,
  faqs,
}: ServicesProps) => {
  return (
    <main className="services-page">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] text-white text-center">
        {heroBackgroundImage && (
          <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
            <Image
              src={urlFor(heroBackgroundImage).url()}
              alt="Services Hero"
              fill
              priority
              className="object-cover z-0"
            />
          </div>
        )}

        {/* Full overlay on top of the image */}
        <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {heroTitle}
          </h1>
          <p className="text-lg sm:text-xl mt-4 max-w-2xl">{heroSubtitle}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-16 px-4 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative h-64 rounded-lg overflow-hidden shadow-md group"
            >
              {service.icon && (
                <div className="relative w-full h-full">
                  <Image
                    src={urlFor(service.icon).url()}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Overlay for darkening background */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition"></div>

              {/* Text on top of image */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-blue-50 py-16 px-4 md:px-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{whyTitle}</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-4xl mx-auto text-gray-700">
          {whyPoints.map((point, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded shadow text-sm sm:text-base"
            >
              {point}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold">{ctaText}</h2>
        <a
          href={ctaLink}
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 font-semibold rounded hover:bg-gray-100 transition"
        >
          {ctaButtonText}
        </a>
      </section>

      {/* FAQ Section */}
      {faqs?.length > 0 && (
        <section className="bg-white py-16 px-4 md:px-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "services"][0]`;
  const data = await sanityClient.fetch(query);

  return {
    props: {
      heroTitle: data?.heroTitle || "",
      heroSubtitle: data?.heroSubtitle || "",
      heroBackgroundImage: data?.heroBackgroundImage || null,
      services: data?.servicesList || [],
      whyTitle: data?.whyTitle || "",
      whyPoints: data?.whyPoints || [],
      ctaText: data?.ctaText || "",
      ctaButtonText: data?.ctaButtonText || "",
      ctaLink: data?.ctaLink || "",
      faqs: data?.faqs || [],
    },
    revalidate: 60,
  };
};

export default ServicesPage;
