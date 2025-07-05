import { useState } from "react";
import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/lib/sanity";

type Service = {
  serviceText: string;
  serviceImage: SanityImageSource;
};

export default function HomeSectionTwo({ services }: { services: Service[] }) {
  const [activeTab, setActiveTab] = useState(0);
  if (!services || services.length === 0) return null;
  console.log("--HomeSectionTwo--services--->", services);

  return (
    <section className="bg-white py-16 px-4 md:px-8">
      {/* Section Titles */}
      <div className="text-center max-w-7xl mx-auto mb-10">
        <h3 className="text-lg text-[#ED9282] mb-2">Our Expertise</h3>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Care Through Every Stage
        </h2>
        <h4 className="text-lg text-gray-600">
          From newborns to nurturing families
        </h4>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto flex justify-center gap-4 mb-10 flex-wrap">
        {services.map((s, idx) => (
          <button
            key={idx}
            className={`px-12 w-xs py-2 cursor-pointer rounded-lg font-medium transition border ${
              activeTab === idx
                ? "bg-[#ED9282] text-white border-[#ED9282]"
                : "bg-[#f3f3f7] text-gray-700 border-[#f3f3f7] hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {s.serviceText}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="max-w-7xl mx-auto bg-[#F3F3F7] rounded-xl shadow p-16 md:p-16 flex flex-col md:flex-row gap-8 items-center">
        {/* Left - Text */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg text-[#ED9282] mb-2">Compassion & Care</h3>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {services[activeTab].serviceText}
          </h2>
          <h4 className="text-lg text-gray-600 mb-6">
            We provide safe, evidence-based support for your baby’s first days
            and months of life, ensuring comfort, health, and growth.
          </h4>
          <button className="bg-[#ED9282] cursor-pointer text-white px-5 py-2 rounded-full hover:bg-[#ED9282] transition">
            Learn More
          </button>
        </div>

        {/* Right - Image */}
        <div className="flex-1 relative w-full max-w-md h-74">
          <Image
            src={urlFor(services[activeTab].serviceImage).url()}
            alt={services[activeTab].serviceText}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
