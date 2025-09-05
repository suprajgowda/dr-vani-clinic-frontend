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
        <title>
          Women&lsquo;s Health & Pregnancy Tips Blog | Dr. Vani R Bangalore
        </title>
        <meta
          name="description"
          content="Read expert articles on pregnancy care, fertility, laparoscopy, and women’s health by Dr. Vani R, senior gynecologist in Basavanagudi, Bangalore."
        />
        <link
          rel="canonical"
          href="https://www.drvanigynaecologistbangalore.com/blogs"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Women’s Health & Pregnancy Tips Blog | Dr. Vani R"
        />
        <meta
          property="og:description"
          content="Expert blogs on fertility, pregnancy care, laparoscopy & women’s health in Bangalore."
        />
        <meta
          property="og:url"
          content="https://www.drvanigynaecologistbangalore.com/blogs"
        />
        {/* Optional: use first post cover as OG image if available */}
        {posts?.[0]?.coverImage ? (
          <meta
            property="og:image"
            content={urlFor(posts[0].coverImage).width(1200).height(630).url()}
          />
        ) : null}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Women’s Health & Pregnancy Tips Blog | Dr. Vani R"
        />
        <meta
          name="twitter:description"
          content="Trusted gynecologist in Basavanagudi, Bangalore. Insights on pregnancy, fertility, and laparoscopy."
        />

        {/* JSON-LD: Blog with recent posts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "Dr. Vani R — Women’s Health & Pregnancy Tips",
              url: "https://www.drvanigynaecologistbangalore.com/blogs",
              description:
                "Expert articles on pregnancy care, fertility, laparoscopy, and women’s health by a senior gynecologist in Bangalore.",
              blogPost: (posts || []).slice(0, 6).map((p) => ({
                "@type": "BlogPosting",
                headline: p.title,
                url: `https://www.drvanigynaecologistbangalore.com/blog/${p.slug.current}`,
                datePublished: p.publishedAt,
                description: p.excerpt,
                ...(p.coverImage
                  ? {
                      image: [
                        urlFor(p.coverImage).width(1200).height(630).url(),
                      ],
                    }
                  : {}),
              })),
            }),
          }}
        />
      </Head>

      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section title (match Home/Services H2 scale) */}
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
            Blog & Health Tips
          </h1>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-12">
              {posts.map((post, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg shadow-md overflow-hidden p-2"
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
                    {/* Card title (H3 scale) */}
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                      {post.title}
                    </h3>

                    {/* Excerpt (Body scale) */}
                    <p className="text-base sm:text-lg leading-7 text-gray-600 mb-3 text-justify">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="text-[#ed9282] hover:underline text-base font-medium"
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
