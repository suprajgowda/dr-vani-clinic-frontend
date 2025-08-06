// pages/testimonials.tsx

import Head from "next/head";
import { GetStaticProps } from "next";
import { sanityClient } from "../lib/sanity";
import PinkRibbonWithPinkFlowers from "../app/pink-ribbon-with-pink-flowers.jpg";

type Testimonial = {
  _id: string;
  name: string;
  content: string;
  date?: string;
};

type Props = {
  testimonials: Testimonial[];
};

export default function TestimonialsPage({ testimonials }: Props) {
  return (
    <>
      <Head>
        <title>Patient Testimonials | Dr. Vani</title>
        <meta
          name="description"
          content="Heartfelt testimonials from patients of Dr. Vani"
        />
      </Head>
      <section className="max-w-5xl mx-auto py-12 px-4 space-y-10">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Patient Testimonials
        </h1>
        <div className="columns-1 md:columns-2 gap-6 space-y-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-white p-8 rounded-xl shadow-md bg-no-repeat bg-cover bg-center break-inside-avoid text-justify"
              style={{
                backgroundImage: `url(${PinkRibbonWithPinkFlowers.src})`,
              }}
            >
              <p className="text-[#000] whitespace-pre-line mb-4">
                {t.content}
              </p>
              <div className="text-sm text-[#000] font-medium">
                — {t.name || "Anonymous"}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const testimonials = await sanityClient.fetch(
    `*[_type == "testimonial" && approved == true] | order(_createdAt desc){
      _id,
      name,
      content,
      date
    }`
  );

  return {
    props: { testimonials },
    revalidate: 60 * 30, // Rebuild every 30 minutes
  };
};
