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
import HeroCarousel from "./HeroCarousel";
import { useRouter } from "next/router";

const faqContent = [
  {
    q: "1. When should I schedule my first prenatal visit?",
    a: "You should schedule your first prenatal visit as soon as you know you are pregnant, ideally around 6–8 weeks.",
  },
  {
    q: "2. What vaccines are recommended during pregnancy?",
    a: "Vaccines like flu and Tdap are recommended to protect you and your baby from serious infections before and after birth.",
  },
  {
    q: "3. Is ultrasound imaging safe for my baby?",
    a: "Yes, prenatal ultrasounds are non-invasive and considered safe when performed by trained professionals using standard medical guidelines.",
  },
];

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
    photo: SanityImageSource;
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

      <HeroCarousel />
      <HomeBanner3 heroImage={heroImage} />
      <HomeSectionTwo services={services} />
      <ServicesSplitSection />
      <SplitImageTextSection />

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
              <div className="flex gap-6">
                {testimonials.map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F3F3F7] p-6 rounded-md shadow-md flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[26vw] max-w-[90vw]"
                  >
                    {/* Content */}
                    <div className="mb-0 flex justify-between items-end">
                      <p className="text-gray-700 text-base leading-relaxed">
                        {t.content}
                        <span className="text-gray-900 font-semibold text-sm whitespace-nowrap">
                          - {t.name}
                        </span>
                      </p>
                    </div>
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
              <div className="text-[#ED9282] text-xs tracking-[.10em] uppercase pb-2">
                FAQS
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-3">
                <span className="bg-gradient-to-b from-transparent to-white">
                  Questions?
                </span>
                We&lsquo;re glad you asked
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
                  <div className="font-semibold text-gray-800 mb-2">
                    {faq.q}
                  </div>
                  <div className="font-normal text-gray-600">{faq.a}</div>
                </div>
              ))}
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
  const router = useRouter();
  return (
    <section className="flex flex-col md:flex-row w-full min-h-[80vh]">
      {/* Left Section – Text */}
      <div className="w-full md:w-3/5 bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl text-left">
          {/* <h3 className="text-sm text-[#ED9282] mb-2">Welcome to Our Clinic</h3> */}
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
            Expert Gynecological Care
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
      title: "Pregnancy Care",
      description:
        "End-to-end care from conception to postpartum, ensuring the wellbeing of both mother and baby.",
    },
    {
      icon: Ultrasound,
      title: "Advanced Techniques",
      description: "State-of-the-art procedures ensuring safety and comfort.",
    },
    {
      icon: GeneticTesting,
      title: "Fertility Services",
      description:
        "Comprehensive workups and treatments tailored for couples trying to conceive.",
    },
    {
      icon: FertilityServices,
      title: "Adolescent Health",
      description:
        "Guiding teenagers through physical, emotional, and hormonal changes with empathy and expertise.",
    },
    {
      icon: Vaccinations,
      title: "Annual Wellness Checks",
      description:
        "Preventive health check-ups to ensure holistic gynaecological wellness.",
    },
  ];
  const router = useRouter();

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

          <button
            onClick={() => router.push("/services2")}
            className="mt-6 bg-[#ED9282] cursor-pointer text-white px-6 py-3 rounded-full hover:bg-[#ED9282] transition"
          >
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
  const router = useRouter();
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
            onClick={() => router.push("/contact")}
            className="mt-6 bg-[#ED9282] text-white cursor-pointer px-6 py-3 rounded-full hover:bg-[#ED9282] transition"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
