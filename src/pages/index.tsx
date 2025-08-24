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
        <title>Dr. Vani R | Gynecologist in Bangalore</title>
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
