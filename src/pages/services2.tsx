import Image from "next/image";
import React from "react";
import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

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
    <div className="bg-gray-50 py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
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
                <h2 className="text-xl font-semibold text-[#ed9282] mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-700 text-sm mb-4">
                  {service.description}
                </p>
                {service.subServices && (
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
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
