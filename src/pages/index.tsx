import React from "react";
import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Head from "next/head";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import OurExpertise from "./OurExpertise";
import MedicoraPregnancyImg from "../app/medicora-pregnancy-img.jpg";
import HeroCarousel from "./HeroCarousel";
import { NextRouter, useRouter } from "next/router";

type HomeProps = {
  heroImage: SanityImageSource;
  services: {
    serviceImage: SanityImageSource;
    serviceText: string;
    serviceDescription: string;
    blogLink?: {
      slug: {
        current: string;
      };
    };
  }[];
  sectionDescription: string;

  medicalServicesTitle: string;
  medicalServicesDescription: string;
  medicalServicesList: MedicalServicesList[];

  testimonials: {
    name: string;
    photo: SanityImageSource;
    content: string;
    rating: number;
  }[];
  faqContent: { question: string; answer: string }[];
};

type MedicalServicesList = {
  serviceDescription: string;
  serviceImage: SanityImageSource;
  serviceTitle: string;
};

export default function Home({
  heroImage,
  services,
  testimonials,
  faqContent,
  sectionDescription,
  medicalServicesTitle,
  medicalServicesDescription,
  medicalServicesList,
}: HomeProps & { testimonials: never[] }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Dr. Vani R | Gynecologist in Bangalore</title>
      </Head>

      <HeroCarousel />
      <HomeBanner3
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
      <SplitImageTextSection router={router} />

      {testimonials && testimonials.length > 0 && (
        <section className="py-12 bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h6 className="text-[#ED9282] text-xs font-medium tracking-[.10em] pb-2 uppercase">
                  Patient Stories
                </h6>
                <h2 className="text-3xl sm:text-4xl font-semibold leading-snug">
                  Families who trusted us with their care
                </h2>
              </div>

              <div className="flex flex-col md:items-end justify-center">
                <Image
                  src="/google-logo.svg"
                  alt="Google review logo"
                  width={100}
                  height={30}
                  priority
                />
                <div className="flex items-center mt-2">
                  <div className="mr-2 font-semibold text-gray-800">
                    4.9 / 5
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar className="text-[#f9ca53] mx-0.5" key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="overflow-x-auto">
              <div className="flex gap-6 items-start">
                {testimonials.map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F3F3F7] p-6 rounded-md shadow-md flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[26vw] max-w-[90vw] h-[280px] flex flex-col justify-between"
                  >
                    <p className="text-gray-700 text-base text-justify leading-relaxed line-clamp-7">
                      {t.content}
                    </p>
                    <span className="text-gray-900 font-semibold text-sm mt-3">
                      - {t.name || "Anonymous"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      <div className="bg-[#f3f3f7] font-medium py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Left Side - Title & Description */}
            <div className="sm:pt-4 max-w-xl">
              <div className="text-[#ED9282] text-xl italic tracking-[.10em] pb-2">
                FAQ&lsquo;s
              </div>
              <h2 className="text-2xl sm:text-2xl font-semibold leading-tight mb-3">
                <span className="bg-gradient-to-b from-transparent to-white">
                  Questions ?
                </span>
                &nbsp;We&lsquo;re glad you asked
              </h2>
              <p className="text-[#2E231FCC] font-light text-base sm:text-lg">
                Get clear, expert answers to the most important questions about
                your care and your child&apos;s health.
              </p>
            </div>

            {/* Right Side - FAQs */}
            <div className="space-y-4">
              {faqContent.map((faq, idx) => (
                <div key={idx} className="p-4 bg-white rounded shadow-sm">
                  <div className="font-semibold mb-2 text-[#dd6f82] italic">
                    Q - {faq.question}
                  </div>
                  <div className="font-normal text-gray-600">
                    A - {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function HomeBanner3({
  heroImage,
  sectionDescription,
  router,
}: {
  heroImage: SanityImageSource;
  sectionDescription: string;
  router: NextRouter;
}) {
  return (
    <section className="flex flex-col md:flex-row w-full min-h-[80vh]">
      {/* Left Section – Text */}
      <div className="w-full md:w-3/5 bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl text-left">
          <h3 className="text-xl text-[#ED9282] mb-2 antialiased font-medium italic">
            Meet Dr. Vani R
          </h3>
          <h1 className="text-2xl sm:text-2xl font-bold text-black mb-4">
            Expert Gynecological Care
          </h1>
          <h2 className="text-base text-gray-700 mb-6">
            Compassionate. Trusted. Experienced.
          </h2>
          <h4 className="text-base text-gray-700 mb-6 text-justify">
            {sectionDescription}
          </h4>
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
              backgroundImage: `url(${urlFor(heroImage).url()})`,
            }}
          />
        </div>
      </div>
    </section>
  );
}

// Medical Services Section
function MedicalServicesSection({
  medicalServicesTitle,
  medicalServicesDescription,
  medicalServicesList,
  router,
}: {
  medicalServicesTitle: string;
  medicalServicesDescription: string;
  medicalServicesList: MedicalServicesList[];
  router: NextRouter;
}) {
  return (
    <section className="bg-[#F3F3F7] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        {/* Left Section (30%) */}
        <div className="w-full md:w-2/3 text-center md:text-left space-y-4">
          <h3 className="text-lg text-[#ED9282]">Medical services</h3>
          <h2 className="text-4xl font-bold text-gray-800">
            {medicalServicesTitle}
          </h2>
          <h4 className="text-lg text-gray-600">
            {medicalServicesDescription}
          </h4>

          <button
            onClick={() => router.push("/services")}
            className="mt-6 bg-[#ED9282] cursor-pointer text-white px-6 py-3 rounded-full hover:bg-[#ED9282] transition"
          >
            View all services
          </button>
        </div>

        {/* Right Section (70%) */}
        <div className="w-full md:w-2.5/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {medicalServicesList.map((service, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition text-center flex flex-col items-center"
            >
              <div className="w-20 bg-[#ED9282] flex justify-center items-center rounded-lg h-20 mb-4 relative">
                <Image
                  src={urlFor(service.serviceImage).url()}
                  alt={service.serviceTitle}
                  className=""
                  width={40}
                  height={40}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.serviceTitle}
              </h3>
              <p className="text-gray-600 text-sm">
                {service.serviceDescription}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SplitImageTextSection({ router }: { router: NextRouter }) {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left – Image */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px]">
          <Image
            src={MedicoraPregnancyImg}
            alt="Family Support"
            fill
            className="object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right – Text */}
        <div className="text-center md:text-left space-y-4">
          <h3 className="text-lg text-[#ED9282]">Holistic Approach</h3>
          <h2 className="text-4xl font-bold text-gray-800">
            Dedicated to families and their health
          </h2>
          <h4 className="text-lg text-gray-600">
            We deliver compassionate, professional care to support your journey
            through pregnancy, parenthood, and beyond.
          </h4>

          <button
            onClick={() => router.push("/blogs")}
            className="mt-6 bg-[#ED9282] text-white cursor-pointer px-6 py-3 rounded-full hover:bg-[#ED9282] transition"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const homeData = await sanityClient.fetch(`*[_type == "home"][0]`);
  const faqsData = await sanityClient.fetch(`*[_type == "faqsPage"][0]{faqs}`);
  const testimonials = await sanityClient.fetch(`*[_type == "testimonial"]{
    name,
    photo,
    content,
    rating
  }`);

  return {
    props: {
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
