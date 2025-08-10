import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import { sanityClient, urlFor } from "../lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";

type BlogPost = {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  coverImage: SanityImageSource;
};

type BlogsPageProps = {
  posts: BlogPost[];
};

export default function BlogsPage({ posts }: BlogsPageProps) {
  return (
    <>
      <Head>
        <title>Blog | Dr. Vani R</title>
      </Head>

      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
            Blog & Health Tips
          </h1>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-12">
              {posts.map((post, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg">
                    {/* Background fill (blurred) */}
                    <Image
                      src={urlFor(post.coverImage).width(1200).url()}
                      alt=""
                      fill
                      className="object-cover blur-sm scale-110 opacity-70"
                      aria-hidden
                      priority={false}
                    />
                    {/* Foreground image (no crop) */}
                    <Image
                      src={urlFor(post.coverImage).width(1200).url()}
                      alt={post.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="px-4 pt-4 pb-3">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 text-justify">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="text-[#ed9282] hover:underline text-sm font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No blog posts found.</p>
          )}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await sanityClient.fetch(`
    *[_type == "blog"] | order(publishedAt desc){
      title,
      slug,
      publishedAt,
      excerpt,
      coverImage
    }
  `);

  return {
    props: { posts },
    revalidate: 60,
  };
};
