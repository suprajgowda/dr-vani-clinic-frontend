import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import { sanityClient, urlFor } from "../lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {posts.map((post, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={urlFor(post.coverImage).width(800).url()}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="text-blue-600 hover:underline text-sm font-medium"
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
  const posts =
    await sanityClient.fetch(`*[_type == "blog"] | order(publishedAt desc){
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage
  }`);

  return {
    props: { posts },
    revalidate: 60,
  };
};
