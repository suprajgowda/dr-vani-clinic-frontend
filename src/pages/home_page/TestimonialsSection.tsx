import { HomeTestimonials } from "@/types";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

export default function TestimonialsSection({
  testimonials = [],
}: {
  testimonials: HomeTestimonials[];
}) {
  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    return null;
  }

  return (
    <>
      {testimonials.length > 0 && (
        <section className="py-12 bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h6 className="text-sm tracking-[.10em] uppercase text-[#ED9282] font-medium pb-2">
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
                    <p className="text-base sm:text-lg leading-7 text-gray-700 text-justify line-clamp-7">
                      “{t.content}”
                    </p>
                    <span className="text-base sm:text-lg font-semibold text-gray-900 mt-3">
                      - {t.name || "Anonymous"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
