import { GetStaticPaths, GetStaticProps } from "next";
import { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import {
  PortableText,
  PortableTextBlock,
  PortableTextReactComponents,
} from "@portabletext/react";
import { sanityClient, urlFor } from "../../lib/sanity";

const components: Partial<PortableTextReactComponents> = {
  list: {
    bullet: ({ children }: { children?: ReactNode }) => (
      <ul className="list-disc pl-6 mb-4">{children}</ul>
    ),
    number: ({ children }: { children?: ReactNode }) => (
      <ol className="list-decimal pl-6 mb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: ReactNode }) => (
      <li className="mb-1">{children}</li>
    ),
    number: ({ children }: { children?: ReactNode }) => (
      <li className="mb-1">{children}</li>
    ),
  },
  block: {
    normal: ({ children }: { children?: ReactNode }) => (
      <p className="mb-4">{children}</p>
    ),
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
    ),
  },
};

type BlogPost = {
  title: string;
  slug: { current: string };
  publishedAt: string;
  coverImage?: SanityImageSource;
  sections: {
    title: string;
    content: PortableTextBlock[];
  }[];
};

type RelatedPost = {
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage?: SanityImageSource;
};

type BlogProps = {
  post: BlogPost;
  relatedPosts: RelatedPost[];
};

export default function BlogDetailPage({ post, relatedPosts }: BlogProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Dr. Vani R</title>
        <meta name="description" content={post.title} />
      </Head>

      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Blog Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {post.title}
          </h1>

          {/* Published Date */}
          <p className="text-sm text-gray-500 mb-6">
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] mb-10">
              <Image
                src={urlFor(post.coverImage).width(800).url()}
                alt={post.title}
                fill
                className="rounded-lg object-cover"
                priority
              />
            </div>
          )}

          {/* Blog Sections */}
          {post.sections?.map((section, idx) => (
            <article
              key={idx}
              className="prose prose-blue max-w-none mb-12 mt-10"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {section.title}
              </h2>
              <PortableText value={section.content} components={components} />
            </article>
          ))}

          {/* Related Posts */}
          {relatedPosts?.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
                  >
                    {item.coverImage && (
                      <div className="relative w-full h-40">
                        <Image
                          src={urlFor(item.coverImage).width(600).url()}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {item.excerpt}
                      </p>
                      <Link
                        href={`/blog/${item.slug.current}`}
                        className="text-blue-600 text-sm hover:underline font-medium"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await sanityClient.fetch(
    `*[_type == "blog"]{ "slug": slug.current }`
  );

  const paths = slugs.map((s: { slug: string }) => ({
    params: { slug: s.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const post = await sanityClient.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{
      title,
      slug,
      publishedAt,
      coverImage,
      sections[]{
        title,
        content
      }
    }`,
    { slug }
  );

  if (!post) return { notFound: true };

  const relatedPosts = await sanityClient.fetch(
    `*[_type == "blog" && slug.current != $slug] | order(publishedAt desc)[0...3] {
      title,
      slug,
      excerpt,
      coverImage
    }`,
    { slug }
  );

  return {
    props: { post, relatedPosts },
    revalidate: 60,
  };
};
