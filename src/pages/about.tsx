import React from "react";
import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "@/lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";

type AboutProps = {
  section1Title: string;
  section1BannerImage: SanityImageSource;
  aboutDrVanititle: string;
  aboutDrVaniCompleteDescription: string;
  highlightedFacts: { title: string; description: string }[];
  whyDrVaniTitle: string;
  whyDrVaniDescription: string;
  awardsSectionTitle: string;
  awardsSectionDescription: string;
  awards: { awardImage: SanityImageSource; awardTitle: string }[];
};

const AboutPage = ({
  section1Title,
  section1BannerImage,
  aboutDrVanititle,
  aboutDrVaniCompleteDescription,
  highlightedFacts,
  whyDrVaniTitle,
  whyDrVaniDescription,
  awardsSectionTitle,
  awardsSectionDescription,
  awards,
}: AboutProps) => {
  return (
    <main className="about-page">
      {/* Section 1 – Banner */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] overflow-hidden">
        {section1BannerImage && (
          <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
            <Image
              src={urlFor(section1BannerImage).url()}
              alt="About Page Banner"
              fill
              priority
              className="object-cover object-center sm:object-top"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center text-white px-4 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {section1Title}
          </h1>
        </div>
      </section>

      {/* Section 2 – About Dr. Vani */}
      <section className="bg-gray-50 py-12 px-4 md:px-8">
        <div className="text-center text-gray-800">
          <h2 className="text-3xl font-bold mb-6">{aboutDrVanititle}</h2>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto">
            {aboutDrVaniCompleteDescription}
          </p>
        </div>
      </section>

      {/* Section 3 – Highlighted Facts */}
      {highlightedFacts?.length > 0 && (
        <section className="bg-white py-12 px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlightedFacts.map((fact, idx) => (
              <div key={idx} className="text-center p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {fact.title}
                </h3>
                <p className="text-gray-600">{fact.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 4 – Why Dr. Vani */}
      <section className="bg-blue-50 py-12 px-4 md:px-8">
        <div className="text-center text-gray-800">
          <h2 className="text-3xl font-bold mb-4">{whyDrVaniTitle}</h2>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto">
            {whyDrVaniDescription}
          </p>
        </div>
      </section>

      {/* Section 5 – Awards & Recognition */}
      {awards?.length > 0 && (
        <section className="bg-white py-16 px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            {awardsSectionTitle}
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            {awardsSectionDescription}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {awards.map((award, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-lg shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                {award.awardImage && (
                  <div className="relative w-full h-48">
                    <Image
                      src={urlFor(award.awardImage).width(400).url()}
                      alt={award.awardTitle}
                      fill
                      className="object-contain mb-4"
                    />
                  </div>
                )}
                <h3 className="text-lg font-medium text-gray-800">
                  {award.awardTitle}
                </h3>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "about"][0]`;
  const data = await sanityClient.fetch(query);

  return {
    props: {
      section1Title: data?.section1Title || "",
      section1BannerImage: data?.section1BannerImage || null,
      aboutDrVanititle: data?.aboutDrVanititle || "",
      aboutDrVaniCompleteDescription:
        data?.aboutDrVaniCompleteDescription || "",
      highlightedFacts: data?.highlightedFacts || [],
      whyDrVaniTitle: data?.whyDrVaniTitle || "",
      whyDrVaniDescription: data?.whyDrVaniDescription || "",
      awardsSectionTitle: data?.awardsSectionTitle || "",
      awardsSectionDescription: data?.awardsSectionDescription || "",
      awards: data?.awards || [],
    },
    revalidate: 60,
  };
};

export default AboutPage;
