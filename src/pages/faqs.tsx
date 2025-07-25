import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { sanityClient } from "../lib/sanity";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQPageProps {
  faqs: FAQ[];
  pageTitle: string;
}

export default function FAQPage({ faqs, pageTitle }: FAQPageProps) {
  return (
    <>
      <Head>
        <title>{pageTitle} | Dr. Vani R</title>
        <meta
          name="description"
          content="Common questions answered about fertility, pregnancy, gynecological care, and more."
        />
      </Head>

      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            {pageTitle}
          </h1>

          <div className="space-y-8">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
              >
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q: {faq.question}
                  </h3>
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    A: {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await sanityClient.fetch(`*[_type == "faqsPage"][0]`);
  return {
    props: {
      faqs: data?.faqs || [],
      pageTitle: data?.pageTitle || "Frequently Asked Questions",
    },
    revalidate: 60,
  };
};
