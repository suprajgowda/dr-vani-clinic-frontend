// pages/testimonials.tsx

import Head from "next/head";
import { GetStaticProps } from "next";
import { sanityClient } from "../lib/sanity";
import PinkRibbonWithPinkFlowers from "../app/pink-ribbon-with-pink-flowers.jpg";
import React from "react";

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

// Utility: make certain keys required & non-null
type WithRequired<T, K extends keyof T> = T & {
  [P in K]-?: NonNullable<T[P]>;
};

type TestimonialWithVideo = WithRequired<Testimonial, "videoUrl">;

function VideoCard({ featuredVideo }: { featuredVideo: TestimonialWithVideo }) {
  const [aspect, setAspect] = React.useState<"16/9" | "9/16" | "1/1">("16/9");

  const handleMeta = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    const ar = v.videoWidth / v.videoHeight;
    if (!ar || Number.isNaN(ar)) return;
    if (Math.abs(ar - 1) < 0.08) setAspect("1/1");
    else if (ar < 1) setAspect("9/16");
    else setAspect("16/9");
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-[5%] mb-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,520px)_1fr] gap-0">
          {/* Left: Video (keeps ratio, no cropping) */}
          <div className="bg-black">
            <div
              className="relative w-full"
              style={{ aspectRatio: aspect.replace("/", " / ") }}
            >
              <video
                className="absolute inset-0 h-full w-full object-contain"
                controls
                playsInline
                preload="metadata"
                onLoadedMetadata={handleMeta}
              >
                <source
                  src={featuredVideo.videoUrl}
                  type={featuredVideo.videoMimeType ?? "video/mp4"}
                />
                Your browser does not support the video tag.
              </video>
            </div>
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
  );
}

export default function TestimonialsPage({
  testimonials,
}: TestimonialsPageProps) {
  // Type guard to filter only the ones that truly have a video
  function hasVideo(t: Testimonial): t is TestimonialWithVideo {
    return typeof t.videoUrl === "string" && t.videoUrl.length > 0;
  }

  // Use it where you build the list for the video cards
  const featuredVideos = testimonials.filter(hasVideo);

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
      {featuredVideos?.map((featuredVideo, index) => (
        <VideoCard key={index} featuredVideo={featuredVideo} />
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
