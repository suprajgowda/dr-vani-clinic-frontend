// pages/testimonials.tsx

import Head from "next/head";
import { GetStaticProps } from "next";
import { sanityClient } from "../lib/sanity";
import PinkRibbonWithPinkFlowers from "../app/pink-ribbon-with-pink-flowers.jpg";

type Testimonial = {
  _id: string;
  name?: string;
  content: string;
  date?: string; // ISO string
  videoUrl?: string | null;
  videoMimeType?: string | null;
  videoOriginalFilename?: string | null;
};

type TestimonialsPageProps = {
  testimonials: Testimonial[];
};

export default function TestimonialsPage({
  testimonials,
}: TestimonialsPageProps) {
  const featuredVideos = testimonials.filter((t) => t.videoUrl);
  console.log("The Testimonials data--->", testimonials);

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
      </section>

      {/* Featured Video Banner */}
      {featuredVideos &&
        featuredVideos.map((featuredVideo, index) => (
          <div key={index} className="max-w-6xl mx-auto w-full px-[5%] mb-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-0">
                {/* Left: Video */}
                <div
                  className="relative bg-black flex items-center justify-center"
                  style={{ maxWidth: "30em" }}
                >
                  <video
                    className="max-h-[70vh] w-auto rounded-lg"
                    controls
                    preload="metadata"
                  >
                    <source
                      src={featuredVideo.videoUrl!}
                      type={featuredVideo.videoMimeType ?? "video/mp4"}
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Right: Description + Author */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                    {featuredVideo.content}
                  </p>
                  <div className="text-gray-900 font-semibold">
                    — {featuredVideo.name || "Anonymous"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      <section className="max-w-5xl mx-auto py-12 px-4 space-y-10">
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
      video,
      date,
        "videoUrl": video.asset->url,
        "videoMimeType": video.asset->mimeType,
        "videoOriginalFilename": video.asset->originalFilename
    }`
  );

  return {
    props: { testimonials },
    revalidate: 60 * 30, // Rebuild every 30 minutes
  };
};
