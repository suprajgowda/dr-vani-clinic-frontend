import React from "react";
import { Award, Users, Star, CheckCircle } from "lucide-react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "@/lib/sanity";
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

const About = ({ section1Title, section1BannerImage }: AboutProps) => {
  const achievements = [
    { icon: Users, number: "5000+", label: "Successful Deliveries" },
    { icon: Award, number: "15+", label: "Years of Excellence" },
    { icon: Star, number: "4.9", label: "Patient Rating" },
    { icon: CheckCircle, number: "99%", label: "Success Rate" },
  ];

  const features = [
    "Board-certified obstetricians and gynecologists",
    "State-of-the-art medical equipment and facilities",
    "Personalized care plans for every patient",
    "24/7 emergency support and consultation",
    "Multilingual staff for diverse communities",
    "Insurance-friendly pricing and payment plans",
  ];

  return (
    <>
      {/* Section 1 – Banner */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] overflow-hidden">
        {section1BannerImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={urlFor(section1BannerImage).url()}
              alt="About Page Banner"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center text-white px-4 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {section1Title}
          </h1>
        </div>
      </section>
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Choose Dr Vani for Your Pregnancy Journey?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  With over 15 years of experience in maternal care, Dr Vani has
                  been the trusted partner for thousands of families. Our team
                  of expert doctors and caring staff provide personalized
                  attention and world-class medical care.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We understand that every pregnancy is unique, which is why we
                  create customized care plans that address your specific needs,
                  concerns, and preferences throughout your journey to
                  motherhood.
                </p>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 text-center"
                  >
                    <div className="bg-pink-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <achievement.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {achievement.number}
                    </div>
                    <div className="text-sm text-gray-600">
                      {achievement.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-pink-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide exceptional maternal healthcare with compassion,
                  expertise, and cutting-edge medical technology, ensuring the
                  health and well-being of both mother and baby throughout the
                  pregnancy journey.
                </p>
              </div>

              <div className="bg-white border-2 border-pink-100 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Patient Testimonial
                </h3>
                <p className="text-gray-600 italic mb-4">
                  &quot;The care I received at Dr Vani was exceptional. Dr.
                  Smith and her team made me feel comfortable and confident
                  throughout my entire pregnancy. I couldn&lsquo;t have asked
                  for better support.&quot;
                </p>
                <div className="text-sm font-semibold text-pink-600">
                  — Vignesh
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
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

export default About;
