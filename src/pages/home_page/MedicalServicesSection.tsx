import { urlFor } from "@/lib/sanity";
import { MedicalServicesList } from "@/types";
import Image from "next/image";
import { NextRouter } from "next/router";
import React from "react";

export default function MedicalServicesSection({
  medicalServicesTitle,
  medicalServicesDescription,
  medicalServicesList,
  router,
}: {
  medicalServicesTitle: string;
  medicalServicesDescription: string;
  medicalServicesList: MedicalServicesList[];
  router: NextRouter;
}) {
  return (
    <section className="bg-[#F3F3F7] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        {/* Left Section (30%) */}
        <div className="w-full md:w-2/3 text-center md:text-left space-y-4">
          <h3 className="text-sm tracking-[.10em] uppercase text-[#ED9282]">
            Medical services
          </h3>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            {medicalServicesTitle}
          </h2>
          <p className="text-base sm:text-lg leading-7 text-gray-600">
            {medicalServicesDescription}
          </p>

          <button
            onClick={() => router.push("/services")}
            className="mt-6 bg-[#ED9282] cursor-pointer text-white px-6 py-3 rounded-full hover:bg-[#ED9282] transition"
          >
            View all services
          </button>
        </div>

        {/* Right Section (70%) */}
        <div className="w-full md:w-2.5/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {medicalServicesList
            ? medicalServicesList.map((service, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition text-center flex flex-col items-center"
                >
                  <div className="w-20 bg-[#ED9282] flex justify-center items-center rounded-lg h-20 mb-4 relative">
                    <Image
                      src={urlFor(service.serviceImage).url()}
                      alt={service.serviceTitle}
                      className=""
                      width={40}
                      height={40}
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    {service.serviceTitle}
                  </h3>
                  <p className="text-base sm:text-lg leading-7 text-gray-600">
                    {service.serviceDescription}
                  </p>
                </div>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
