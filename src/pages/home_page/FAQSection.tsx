import React from "react";

export default function FAQSection({
  faqContent,
}: {
  faqContent: { question: string; answer: string }[];
}) {
  return (
    <div className="bg-[#f3f3f7] font-medium py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Left Side - Title & Description */}
          <div className="sm:pt-4 max-w-xl">
            <div className="text-[#ED9282] text-xl italic tracking-[.10em] pb-2">
              FAQ&lsquo;s
            </div>
            <h2 className="text-2xl sm:text-2xl font-semibold leading-tight mb-3">
              <span className="bg-gradient-to-b from-transparent to-white">
                Questions ?
              </span>
              &nbsp;We&lsquo;re glad you asked
            </h2>
            <p className="text-[#2E231FCC] font-light text-base sm:text-lg">
              Get clear, expert answers to the most important questions about
              your care and your child&apos;s health.
            </p>
          </div>

          {/* Right Side - FAQs */}
          <div className="space-y-4">
            {faqContent.map((faq, idx) => (
              <div key={idx} className="p-4 bg-white rounded shadow-sm">
                <div className="font-semibold mb-2 text-[#dd6f82] italic">
                  Q - {faq.question}
                </div>
                <div className="font-normal text-gray-600">
                  A - {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
