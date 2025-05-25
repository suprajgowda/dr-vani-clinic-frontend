import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { sanityClient, urlFor } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type BlogPost = {
  title: string;
  slug: { current: string };
  publishedAt: string;
  coverImage?: SanityImageSource;
  body: any;
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
            <img
              src={urlFor(post.coverImage).width(800).url()}
              alt={post.title}
              className="w-full h-auto rounded-lg mb-8"
            />
          )}

          {/* Blog Body */}
          <article className="prose prose-blue max-w-none">
            <PortableText value={post.body} />
          </article>

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
                      <img
                        src={urlFor(item.coverImage).width(600).url()}
                        alt={item.title}
                        className="w-full h-40 object-cover"
                      />
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

  // Fetch current post
  const post = await sanityClient.fetch(
    `*[_type == "blog" && slug.current == $slug][0]`,
    { slug }
  );

  if (!post) return { notFound: true };

  // Fetch related posts (excluding current)
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
