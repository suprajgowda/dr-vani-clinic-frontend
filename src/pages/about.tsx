/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { useRouter } from "next/router";
import Head from "next/head";

type HobbyItem = {
  image: SanityImageSource;
  title: string;
};

type AboutProps = {
  section1Title: string;
  section1BannerImage: SanityImageSource;
  aboutDrVanititle: string;
  aboutDrVaniCompleteDescription: string;
  highlightedFacts: {
    title: string;
    description: string;
    image: SanityImageSource;
  }[];
  whyDrVaniTitle: string;
  whyDrVaniDescription: string;
  whyDrVaniImage?: SanityImageSource | null;
  awardsSectionTitle: string;
  awardsSectionDescription: string;
  awards: { awardImage: SanityImageSource; awardTitle: string }[];
  educationAndTraining: unknown[];
  expertise: string[];
  experience: string[];
  memberships: string[];
  personalInterests: HobbyItem[];
};

const AboutPage = ({
  section1Title,
  section1BannerImage,
  aboutDrVanititle,
  aboutDrVaniCompleteDescription,
  highlightedFacts,
  whyDrVaniTitle,
  whyDrVaniDescription,
  whyDrVaniImage,
  awardsSectionTitle,
  awardsSectionDescription,
  awards,
  educationAndTraining,
  expertise,
  experience,
  memberships,
  personalInterests,
}: AboutProps) => {
  return (
    <main className="about-page">
      <Head>
        <title>About Dr. Vani R — Experienced Gynecologist in Bangalore</title>
        <meta
          name="description"
          content="Meet Dr. Vani R, senior gynecologist and laparoscopic surgeon in Basavanagudi, Bangalore. 23+ years of experience and 5000+ laparoscopic procedures."
        />
        <link
          rel="canonical"
          href="https://www.drvanigynaecologistbangalore.com/about"
        />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="About — Dr. Vani R" />
        <meta
          property="og:description"
          content="Trusted gynecologist in Basavanagudi, Bangalore with 23+ years of experience."
        />
        <meta
          property="og:url"
          content="https://www.drvanigynaecologistbangalore.com/about"
        />
        {/* Optional: add an OG image if you have a static asset */}
        {/* <meta property="og:image" content="https://www.drvanigynaecologistbangalore.com/og-about.jpg" /> */}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About — Dr. Vani R" />
        <meta
          name="twitter:description"
          content="Senior gynecologist & laparoscopic surgeon in Bangalore."
        />

        {/* Physician JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Physician",
              name: "Dr. Vani R",
              description:
                "Senior gynecologist and laparoscopic surgeon in Basavanagudi, Bangalore with 23+ years of experience and 5000+ laparoscopic procedures.",
              medicalSpecialty: "Gynecology",
              url: "https://www.drvanigynaecologistbangalore.com/about",
              address: {
                "@type": "PostalAddress",
                streetAddress: "04/1, Bull Temple Rd, NR Colony, Basavanagudi",
                addressLocality: "Bengaluru",
                addressRegion: "Karnataka",
                postalCode: "560050",
                addressCountry: "IN",
              },
              telephone: "+919591493575",
              sameAs: [
                "https://www.instagram.com/",
                "https://www.facebook.com/",
              ],
            }),
          }}
        />

        {/* Breadcrumbs JSON-LD (Home > About) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.drvanigynaecologistbangalore.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "About",
                  item: "https://www.drvanigynaecologistbangalore.com/about",
                },
              ],
            }),
          }}
        />
      </Head>

      <HomeBanner3
        section1Title={section1Title}
        heroImage={section1BannerImage}
      />
      {/* Section 2 – About Dr. Vani */}
      <section className="bg-gray-50 py-12 px-8 md:px-8 max-w-7xl mx-auto">
        <div className="text-center text-gray-800">
          <h1 className="text-3xl sm:text-3xl font-bold text-black mb-4">
            {aboutDrVanititle}
          </h1>
          <p className="text-base sm:text-lg leading-7 text-center text-gray-600">
            {aboutDrVaniCompleteDescription}
          </p>
        </div>
      </section>

      {/* Section 3 – Highlighted Facts */}
      {highlightedFacts?.length > 0 && (
        <section className="bg-gray-50 py-12 px-4 max-w-8xl md:px-8 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {highlightedFacts.map((fact, idx) => {
              const hasImage = fact.image;
              return (
                <div
                  key={idx}
                  className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition max-w-sm w-full mx-auto"
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    {hasImage ? (
                      <div className="relative w-14 h-14">
                        <Image
                          src={urlFor(fact.image).url()}
                          alt={fact.title || "fact icon"}
                          fill
                          className="object-contain rounded-full shadow"
                        />
                      </div>
                    ) : (
                      <FaCheckCircle className="text-blue-600 text-4xl" />
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-2">
                    {typeof fact.title === "string"
                      ? fact.title
                      : JSON.stringify(fact.title)}
                  </h3>
                  <p className="text-base sm:text-lg leading-7 text-gray-700">
                    {fact.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Section 4 – Why Dr. Vani */}
      <section className="relative bg-[#ffedea] py-12 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
          {/* Left: Image with local blurred bg (not whole section) */}
          <div className="flex justify-center">
            {whyDrVaniImage && (
              <div className="relative w-full max-w-sm h-64 sm:h-72 md:h-80 rounded-xl overflow-hidden shadow">
                {/* Local blurred background using the SAME image */}
                <Image
                  src={urlFor(whyDrVaniImage).width(1200).url()}
                  alt=""
                  fill
                  aria-hidden
                  className="object-cover blur-xl scale-110 opacity-70"
                  sizes="(max-width: 768px) 320px, 480px"
                  priority={false}
                />

                {/* Optional soft gradient so edges blend nicer */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/40 pointer-events-none" />

                {/* Foreground actual portrait (contained, no crop) */}
                <div className="absolute inset-0 flex items-center justify-center p-3">
                  <div className="relative w-full h-full">
                    <Image
                      src={urlFor(whyDrVaniImage).width(900).url()}
                      alt="Why Dr Vani"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 320px, 480px"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div className="text-gray-800">
            <h2 className="text-3xl sm:text-3xl font-bold text-black mb-4">
              {whyDrVaniTitle}
            </h2>
            <p className="text-lg md:text-xl leading-8 text-gray-700">
              {whyDrVaniDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 – Awards & Recognition */}
      {awards?.length > 0 && (
        <section className="bg-white py-16 px-4 md:px-8">
          <h2 className="text-3xl sm:text-3xl font-bold text-center text-black mb-4">
            {awardsSectionTitle}
          </h2>
          <p className="text-base sm:text-lg leading-7 text-center text-gray-600 mb-10 max-w-8xl mx-auto">
            {awardsSectionDescription}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {awards.map((award, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center md:items-center text-center md:text-left gap-4 hover:shadow-lg transition"
                >
                  {award.awardImage && (
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={urlFor(award.awardImage).width(150).url()}
                        alt={award.awardTitle}
                        fill
                        className="object-contain rounded"
                      />
                    </div>
                  )}
                  <h3 className="text-base sm:text-lg font-medium text-gray-800">
                    {award.awardTitle}
                  </h3>
                </div>
              );
            })}
          </div>
        </section>
      )}
      {/* Section 6 – Education & Training */}
      {educationAndTraining?.length > 0 && (
        <ContentListSection
          title="Education & Training"
          items={educationAndTraining}
        />
      )}
      {/* Section 7 – Areas of Expertise */}
      {expertise?.length > 0 && (
        <ContentListSection title="Areas of Expertise" items={expertise} />
      )}
      {/* Section 8 – Professional Experience */}
      {experience?.length > 0 && (
        <ContentListSection
          title="Professional Experience"
          items={experience}
        />
      )}
      {/* Section 9 – Memberships & Affiliations */}
      {memberships?.length > 0 && (
        <ContentListSection
          title="Memberships & Affiliations"
          items={memberships}
        />
      )}
      {/* Section 10 – Personal Interests */}
      {personalInterests?.length > 0 && (
        <HobbiesSection title="Hobbies & Interests" items={personalInterests} />
      )}
    </main>
  );
};

function HomeBanner3({
  section1Title,
  heroImage,
}: {
  section1Title: string;
  heroImage: SanityImageSource;
}) {
  const router = useRouter();
  return (
    <section className="flex bg-[#fbebe9b8] flex-col md:flex-row w-full min-h-[80vh]">
      {/* Left Section – Text */}
      <div className="w-full md:w-3/5 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl text-left">
          <h3 className="text-2xl text-[#ED9282] mb-2 antialiased font-medium italic">
            Meet Dr. Vani R
          </h3>
          <p className="text-xs sm:text-xs text-[#92210d] mb-2 antialiased font-medium italic">
            MBBS, MS, MRCOG 1, FELLOWSHIP IN GYNAEC ENDOSCOPY, FELLOWSHIP IN
            INFERTILITY
          </p>
          <h1 className="text-4xl sm:text-3xl font-bold text-black mb-4">
            {section1Title}
          </h1>
          <h2 className="text-lg text-gray-700 mb-6">
            Compassionate. Trusted. Experienced.
          </h2>
          <button
            onClick={() => router.push("/contact")}
            className="bg-[#ED9282] cursor-pointer text-white px-6 py-3 rounded-full hover:bg-[#e28172] transition"
          >
            How can we help
          </button>

          <div className="flex mt-6">
            {[...Array(5)].map((_, i) => (
              <FaStar className="text-[#f9ca53] mx-0.5" key={i} />
            ))}
          </div>
          <h6 className="mt-1">
            from 1,250+{" "}
            <button
              onClick={() => router.push("/testimonials")}
              className="cursor-pointer"
            >
              <span className="underline">reviews</span>
            </button>
          </h6>
        </div>
      </div>

      {/* Right Section – Image */}
      <div
        className="w-full md:w-2/5 bg-[#fff] flex justify-center md:justify-start items-center px-0 py-10 md:py-0"
        style={{ borderRadius: "0px 0px 0px 50px" }}
      >
        <div className="w-full max-w-md h-auto aspect-[4/5] md:aspect-auto md:h-full md:pl-0">
          <div
            className="w-full h-full bg-contain bg-no-repeat bg-center md:bg-left"
            style={{
              backgroundImage: `url(${urlFor(heroImage).url()})`,
            }}
          />
        </div>
      </div>
    </section>
  );
}

const ContentListSection = ({
  title,
  items,
}: {
  title: string;
  items: any[];
}) => (
  <section className="bg-gray-50 py-12 px-4 md:px-8">
    <h2 className="text-3xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
      {title}
    </h2>
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      {items.map((item, idx) => {
        const content = typeof item === "string" ? item : item.title;
        return (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            <span className="text-base sm:text-lg leading-7 text-gray-700 font-medium">
              {content}
            </span>
          </div>
        );
      })}
    </div>
  </section>
);

export function HobbiesSection({
  title,
  items,
  layout = "grid",
}: {
  title: string;
  items: any[];
  layout?: "grid" | "list";
}) {
  const containerClass =
    layout === "list"
      ? "flex flex-col gap-3"
      : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4";

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {title}
      </h2>

      <div className={`max-w-4xl mx-auto ${containerClass}`}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className="group flex items-center gap-3 rounded-2xl bg-white border border-gray-200 px-4 py-3 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-[#ed9282]/50"
            tabIndex={0}
            aria-label={`${idx}`}
          >
            {/* Icon wrapper */}
            <div
              className="
                shrink-0 flex items-center justify-center
                rounded-full shadow-sm bg-gray-100 group-hover:bg-[#fff3f0]
                p-2
                h-12 w-12 sm:h-14 sm:w-14
              "
            >
              <Image
                src={urlFor(item.image).url()}
                alt={item.title || "Hobby icon"}
                className="w-full h-full object-contain"
                width={56}
                height={56}
                priority={false}
              />
            </div>

            {/* Label */}
            <span className="text-sm sm:text-base leading-6 text-gray-800 font-medium">
              {item.title}
            </span>
          </div>
        ))}
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
      whyDrVaniImage: data?.whyDrVaniImage || null,
      awardsSectionTitle: data?.awardsSectionTitle || "",
      awardsSectionDescription: data?.awardsSectionDescription || "",
      awards: data?.awards || [],
      educationAndTraining: data?.educationAndTraining || [],
      expertise: data?.expertise || [],
      experience: data?.experience || [],
      memberships: data?.memberships || [],
      personalInterests: data?.personalInterests || [],
    },
    revalidate: 60,
  };
};

export default AboutPage;
