import React from "react";
import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Head from "next/head";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import HomeSectionTwo from "./HomeSection2";
import MedicoraPregnancyImg from "../app/medicora-pregnancy-img.jpg";
import PrenatalCare from "../app/prenatal-care.svg";
import LaborDelivery from "../app/labor-delivery.svg";
import Ultrasound from "../app/ultrasound.svg";
import GeneticTesting from "../app/genetic-testing.svg";
import FertilityServices from "../app/fertility-services.svg";
import Vaccinations from "../app/vaccinations.svg";

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
  heroImage,
  services,
  testimonials,
}: HomeProps & { testimonials: never[] }) {
  return (
    <>
      <Head>
        <title>Dr. Vani R | Gynecologist in Bangalore</title>
      </Head>

      <HomeBanner3 heroImage={heroImage} />
      <HomeSectionTwo services={services} />
      <ServicesSplitSection />
      <SplitImageTextSection />

      {testimonials && testimonials.length > 0 && (
        <section className="py-8 bg-white">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h6 className="text-[#ED9282] text-xs font-medium tracking-[.10em] pb-3">
                  PATIENT STORIES
                </h6>
                <h2 className="text-4xl font-medium">
                  Families who trusted us with their care
                </h2>
              </div>
              <div className="flex flex-col justify-center items-end">
                <Image
                  src="/google-logo.svg"
                  alt="google review logo"
                  width={100}
                  height={30}
                  priority
                />
                <div className="flex items-center">
                  <div className="mr-2 font-semibold">4.8 / 5</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar className="text-[#f9ca53] mx-0.5" key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="flex gap-6 w-[200%] sm:w-[150%] md:w-[120%] lg:w-[120%]">
                {testimonials.map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F3F3F7] mb-4 p-4 rounded-md flex-shrink-0 w-[75vw] sm:w-[50vw] md:w-[30vw] lg:w-[20vw] max-w-[75vw]"
                  >
                    {/*-- Top 70%: Review Text --*/}
                    <div className="p-4 h-[65%]">
                      <p className="text-gray-700 text-base">{t.content}</p>
                    </div>

                    {/*-- Bottom 30%: User Info --*/}
                    <div className="flex items-center px-4 pb-2 pt-4 h-[30%]">
                      {/*-- User Image --*/}
                      <div className="max-w-sm flex justify-center">
                        <div className="relative w-12 h-12">
                          <Image
                            src={urlFor(t.photo).url()}
                            alt={t.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                      </div>
                      {/*-- User Name --*/}
                      <div className="max-w-sm pl-3">
                        <p className="text-gray-900 font-semibold text-sm">
                          {t.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      <div className="bg-[#f3f3f7] font-medium py-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="pt-4 max-w-80">
              <div className="text-[#ED9282] text-xs pt-4 pb-3 tracking-[.10em]">
                FAQS
              </div>
              <div className="text-4xl mb-2 pb-3">
                <span
                  style={{
                    backgroundColor: "transparent",
                    padding: "0px",
                    backgroundImage:
                      "linear-gradient(180deg, #FFFFFF00 76%, #FFFFFF 0%)",
                    borderRadius: "0px",
                  }}
                >
                  <span>Questions?</span>
                </span>
                &nbsp;We&apos;re glad you asked
              </div>
              <p className="text-[#2E231FCC] font-light">
                Get clear, expert answers to the most important questions about
                your care and your child&apos;s health.
              </p>
            </div>
            <div>
              <div className="my-2 p-2">
                <div className="pb-4">
                  1. When should I schedule my first prenatal visit?
                </div>
                <div className="font-normal">
                  You should schedule your first prenatal visit as soon as you
                  know you are pregnant, ideally around 6-8 weeks.
                </div>
              </div>
              <div className="my-2 p-2">
                <div className="pb-4">
                  2. What vaccines are recommended during pregnancy?
                </div>
                <div className="font-normal">
                  Vaccines like flu and Tdap are recommended to protect you and
                  your baby from serious infections before and after birth.
                </div>
              </div>
              <div className="my-2 p-2">
                <div className="pb-4">
                  3. Is ultrasound imaging safe for my baby?
                </div>
                <div className="font-normal">
                  Yes, prenatal ultrasounds are non-invasive and considered safe
                  when performed by trained professionals using standard medical
                  guidelines.
                </div>
              </div>
              <div className="my-2 p-2">
                <div className="pb-4">
                  4. What is included in newborn care visits?
                </div>
                <div className="font-normal">
                  Newborn care includes physical exams, weight checks, feeding
                  support, developmental screening, and guidance for new
                  parents.
                </div>
              </div>
              <div className="my-2 p-2">
                <div className="pb-4">
                  5. Can I bring both parents to appointments?
                </div>
                <div className="font-normal">
                  Yes, we welcome both parents and support people to attend
                  appointments when possible and space allows.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

function HomeBanner3({ heroImage }: { heroImage: SanityImageSource }) {
  return (
    <section className="flex flex-col md:flex-row w-full min-h-[80vh]">
      {/* Section 1 – Text Content */}
      <div className="w-full md:w-3/5 bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl text-left">
          <h3 className="text-sm text-[#ED9282] mb-2">Welcome to Our Clinic</h3>
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
            Expert Gynecological Care
          </h1>
          <h2 className="text-lg text-gray-700 mb-6">
            Compassionate. Trusted. Experienced.
          </h2>
          <button className="bg-[#ED9282] cursor-pointer text-white px-6 py-3 rounded-full hover:bg-[#ED9282] transition">
            How can we help
          </button>

          <div className="flex mt-6">
            {[...Array(5)].map((_, i) => (
              <FaStar className="text-[#f9ca53] mx-0.5" key={i} />
            ))}
          </div>
          <h6 className="mt-1">
            from 1.250+ <span className="underline">reviews</span>
          </h6>
        </div>
      </div>

      {/* Section 2 – Background Image (40%) */}
      <div
        className="w-full md:w-2/5 bg-[#f3f3f7] flex items-stretch"
        style={{ borderRadius: "0px 0px 0px 50px" }}
      >
        <div className="w-full h-full pl-0 pt-[10%] pr-[10%] pb-[10%]">
          <div
            className="w-full h-full bg-left bg-contain bg-no-repeat rounded-r-xl rounded-tr-xl rounded-bl-xl"
            style={{
              backgroundImage: `url(${urlFor(heroImage).url()})`,
            }}
          />
        </div>
      </div>
    </section>
  );
}

function ServicesSplitSection() {
  const cards = [
    {
      icon: PrenatalCare,
      title: "Personalized Attention",
      description:
        "Every patient receives individual care tailored to their needs.",
    },
    {
      icon: LaborDelivery,
      title: "Advanced Techniques",
      description: "State-of-the-art procedures ensuring safety and comfort.",
    },
    {
      icon: Ultrasound,
      title: "Advanced Techniques",
      description: "State-of-the-art procedures ensuring safety and comfort.",
    },
    {
      icon: GeneticTesting,
      title: "Advanced Techniques",
      description: "State-of-the-art procedures ensuring safety and comfort.",
    },
    {
      icon: FertilityServices,
      title: "Advanced Techniques",
      description: "State-of-the-art procedures ensuring safety and comfort.",
    },
    {
      icon: Vaccinations,
      title: "Advanced Techniques",
      description: "State-of-the-art procedures ensuring safety and comfort.",
    },
  ];

  return (
    <section className="bg-[#F3F3F7] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        {/* Left Section (30%) */}
        <div className="w-full md:w-2/3 text-center md:text-left space-y-4">
          <h3 className="text-lg text-[#ED9282]">Medical services</h3>
          <h2 className="text-4xl font-bold text-gray-800">
            Care built around your needs
          </h2>
          <h4 className="text-lg text-gray-600">
            Comprehensive medical care through every step—from planning to
            delivery and beyond.
          </h4>

          <button className="mt-6 bg-[#ED9282] text-white px-6 py-3 rounded-full hover:bg-[#ED9282] transition">
            View all services
          </button>
        </div>

        {/* Right Section (70%) */}
        <div className="w-full md:w-2.5/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition text-center flex flex-col items-center"
            >
              <div className="w-20 bg-[#ED9282] flex justify-center items-center rounded-lg h-20 mb-4 relative">
                <Image src={card.icon} alt={card.title} className="" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SplitImageTextSection() {
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

          <button className="mt-6 bg-[#ED9282] text-white px-6 py-3 rounded-full hover:bg-[#ED9282] transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
