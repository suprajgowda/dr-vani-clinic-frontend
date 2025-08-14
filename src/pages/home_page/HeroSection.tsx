import { urlFor } from "@/lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { NextRouter } from "next/router";
import React from "react";
import { FaStar } from "react-icons/fa";

export default function HeroSection({
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
          {heroImage ? (
            <div
              className="w-full h-full bg-contain bg-no-repeat bg-center md:bg-left"
              style={{
                backgroundImage: `url(${urlFor(heroImage).url()})`,
              }}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
