import Image from "next/image";
import React from "react";
import Faq_bg from "../../app/faq_bg.png";

export default function FAQSection({
  faqContent = [],
}: {
  faqContent: { question: string; answer: string }[];
}) {
  if (!Array.isArray(faqContent) || faqContent.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#f3f3f7] font-medium py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Left Side - Title & Description */}
          <div className="sm:pt-4 max-w-xl">
            <div className="text-[#ED9282] text-sm tracking-[.10em] uppercase pb-2">
              FAQ’s
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-3">
              <span className="bg-gradient-to-b from-transparent to-white">
                Questions?
              </span>
              &nbsp;We’re glad you asked
            </h2>
            <p className="text-base sm:text-lg leading-7 text-[#2E231FCC]">
              Get clear, expert answers to the most important questions about
              your care and your child&apos;s health.
            </p>
          </div>

          {/* Right Side - FAQs */}
          <div className="space-y-4">
            {faqContent.map((faq, idx) => (
              <div
                key={idx}
                className="relative p-4 bg-white rounded shadow-sm"
              >
                {/* Top-right tilted background image */}
                <div className="absolute top-4 right-4 z-0 transform rotate-40 translate-x-6 -translate-y-6 opacity-80 pointer-events-none">
                  <Image
                    src={Faq_bg}
                    alt="FAQ decoration"
                    className="w-12 h-12 object-contain"
                  />
                </div>

                <div className="relative z-10">
                  <div className="font-semibold text-base sm:text-lg text-[#dd6f82] mb-2 italic">
                    Q - {faq.question}
                  </div>
                  <div className="font-normal text-base sm:text-lg leading-7 text-gray-600">
                    A - {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
