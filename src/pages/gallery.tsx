import React from "react";
import Head from "next/head";
import { sanityClient, urlFor } from "../lib/sanity";
import { GetStaticProps } from "next";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";

type GalleryImage = {
  image: SanityImageSource;
  title?: string;
  description?: string;
};

type GalleryPageProps = {
  galleryTitle: string;
  galleryDescription: string;
  images: GalleryImage[];
};

export default function GalleryPage({
  galleryTitle,
  galleryDescription,
  images,
}: GalleryPageProps) {
  return (
    <>
      <Head>
        <title>{galleryTitle || "Gallery"} | Dr. Vani R</title>
      </Head>

      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {galleryTitle || "Gallery"}
          </h1>
          {galleryDescription && (
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              {galleryDescription}
            </p>
          )}

          {images?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative w-full h-64">
                    <Image
                      src={urlFor(item.image).width(800).url()}
                      alt={item.title || "Gallery Image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 text-left">
                    {item.title && (
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No images found in the gallery.</p>
          )}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await sanityClient.fetch(`*[_type == "gallery"][0]{
    title,
    description,
    images[]{
      image,
      title,
      description
    }
  }`);

  return {
    props: {
      galleryTitle: data?.title || "Gallery",
      galleryDescription: data?.description || "",
      images: data?.images || [],
    },
    revalidate: 60, // ISR (optional)
  };
};
