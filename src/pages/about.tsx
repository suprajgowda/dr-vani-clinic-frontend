import React from "react";
import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image, { StaticImageData } from "next/image";
import HeroImage from "../app/hero_image.jpg";
import { FaStar } from "react-icons/fa";

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
  // section1Title,
  // section1BannerImage,
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
      <HomeBanner3 heroImage={HeroImage} />

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

function HomeBanner3({ heroImage }: { heroImage: StaticImageData }) {
  const imageUrl = (heroImage as StaticImageData).src;
  return (
    <section className="flex flex-col md:flex-row w-full min-h-[80vh]">
      {/* Left Section – Text */}
      <div className="w-full md:w-3/5 bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl text-left">
          <h3 className="text-sm text-[#ED9282] mb-2">Meet Dr Vani R</h3>
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
            Expert Gynecological Care
          </h1>
          <h2 className="text-lg text-gray-700 mb-6">
            Compassionate. Trusted. Experienced.
          </h2>
          <button className="bg-[#ED9282] text-white px-6 py-3 rounded-full hover:bg-[#e28172] transition">
            How can we help
          </button>

          <div className="flex mt-6">
            {[...Array(5)].map((_, i) => (
              <FaStar className="text-[#f9ca53] mx-0.5" key={i} />
            ))}
          </div>
          <h6 className="mt-1">
            from 1,250+ <span className="underline">reviews</span>
          </h6>
        </div>
      </div>

      {/* Right Section – Image */}
      <div
        className="w-full md:w-2/5 bg-[#f3f3f7] flex justify-center md:justify-start items-center px-0 py-10 md:py-0"
        style={{ borderRadius: "0px 0px 0px 50px" }}
      >
        <div className="w-full max-w-md h-auto aspect-[4/5] md:aspect-auto md:h-full md:pl-0">
          <div
            className="w-full h-full bg-contain bg-no-repeat bg-center md:bg-left"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          />
        </div>
      </div>
    </section>
  );
}

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
