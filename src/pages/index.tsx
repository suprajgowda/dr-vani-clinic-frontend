import React from "react";
import { GetStaticProps } from "next";
import { sanityClient } from "../lib/sanity";
import Head from "next/head";
import OurExpertise from "../components/home_page/OurExpertise";
import HeroCarousel from "../components/home_page/HeroCarousel";
import { useRouter } from "next/router";
import HolisticApproach from "../components/home_page/HolisticApproach";
import FAQSection from "../components/home_page/FAQSection";
import MedicalServicesSection from "../components/home_page/MedicalServicesSection";
import { HomeProps } from "@/types";
import HeroSection from "../components/home_page/HeroSection";
import TestimonialsSection from "../components/home_page/TestimonialsSection";

export default function Home({
  scrollingBanner,
  heroImage,
  services,
  testimonials,
  faqContent,
  sectionDescription,
  medicalServicesTitle,
  medicalServicesDescription,
  medicalServicesList,
}: HomeProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>
          Dr. Vani R — Best Gynecologist in Bangalore | Fertility, Pregnancy &
          Laparoscopy
        </title>

        <meta
          name="description"
          content="Dr. Vani R, senior gynecologist & laparoscopic surgeon in Basavanagudi, Bangalore. 23+ years experience, 5000+ procedures. Book your appointment today."
        />

        {/* Canonical (www as primary) */}
        <link
          rel="canonical"
          href="https://www.drvanigynaecologistbangalore.com/"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Best Gynecologist in Bangalore — Dr. Vani R"
        />
        <meta
          property="og:description"
          content="Trusted gynecologist in Basavanagudi with 23+ yrs & 5000+ laparoscopic procedures."
        />
        <meta
          property="og:url"
          content="https://www.drvanigynaecologistbangalore.com/"
        />
        {/*
          If you want an OG image from Sanity at runtime, uncomment and ensure urlFor is imported:
          <meta property="og:image" content={urlFor(heroImage).width(1200).height(630).url()} />
        */}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Best Gynecologist in Bangalore — Dr. Vani R"
        />
        <meta
          name="twitter:description"
          content="23+ years experience, 5000+ laparoscopic procedures. Book now."
        />

        {/* LocalBusiness JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Dr. Vani’s Clinic",
              image:
                "https://www.drvanigynaecologistbangalore.com/og-image.jpg",
              url: "https://www.drvanigynaecologistbangalore.com/",
              telephone: "+919591493575",
              address: {
                "@type": "PostalAddress",
                streetAddress: "04/1, Bull Temple Rd, NR Colony, Basavanagudi",
                addressLocality: "Bengaluru",
                addressRegion: "Karnataka",
                postalCode: "560050",
                addressCountry: "IN",
              },
              department: {
                "@type": "MedicalClinic",
                medicalSpecialty: "Gynecologic",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "10:00",
                  closes: "19:00",
                },
              ],
              sameAs: [
                "https://www.instagram.com/",
                "https://www.facebook.com/",
              ],
            }),
          }}
        />

        {/* Physician JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Physician",
              name: "Dr. Vani R",
              medicalSpecialty: "Gynecology",
              url: "https://www.drvanigynaecologistbangalore.com/",
              address: {
                "@type": "PostalAddress",
                streetAddress: "04/1, Bull Temple Rd, NR Colony, Basavanagudi",
                addressLocality: "Bengaluru",
                addressRegion: "Karnataka",
                postalCode: "560050",
                addressCountry: "IN",
              },
              telephone: "+919591493575",
            }),
          }}
        />

        {/* Website JSON-LD with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://www.drvanigynaecologistbangalore.com/",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.drvanigynaecologistbangalore.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      <HeroCarousel scrollingBanner={scrollingBanner} />

      <HeroSection
        heroImage={heroImage}
        sectionDescription={sectionDescription}
        router={router}
      />

      <OurExpertise services={services} />

      <MedicalServicesSection
        medicalServicesTitle={medicalServicesTitle}
        medicalServicesDescription={medicalServicesDescription}
        medicalServicesList={medicalServicesList}
        router={router}
      />

      <HolisticApproach router={router} />

      <TestimonialsSection testimonials={testimonials} />

      <FAQSection faqContent={faqContent} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const homeData = await sanityClient.fetch(`*[_type == "home"][0]`);
  const faqsData = await sanityClient.fetch(`*[_type == "faqsPage"][0]{faqs}`);
  const testimonials = await sanityClient.fetch(`*[_type == "testimonial"]`);

  return {
    props: {
      scrollingBanner: homeData?.scrollingBanner || [],
      heroImage: homeData?.heroImage || null,
      medicalServicesTitle: homeData?.medicalServicesTitle || "",
      medicalServicesDescription: homeData?.medicalServicesDescription || "",
      medicalServicesList: homeData?.medicalServicesList || "",
      services: homeData?.services || [],
      sectionDescription: homeData?.sectionDescription || "",
      testimonials: testimonials || [],
      faqContent: faqsData?.faqs?.slice(0, 5) || [],
    },
    revalidate: 60,
  };
};
