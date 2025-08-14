import React from "react";
import Image from "next/image";
import { NextRouter } from "next/router";
import MedicoraPregnancyImg from "../../app/medicora-pregnancy-img.jpg";

export default function HolisticApproach({ router }: { router: NextRouter }) {
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
