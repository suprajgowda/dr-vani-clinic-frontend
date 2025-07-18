// File: pages/gallery/[slug].tsx

import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { sanityClient, urlFor } from "../../lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type Album = {
  albumTitle: string;
  albumDescription?: string;
  photos: SanityImageSource[];
};

type AlbumPageProps = {
  album: Album;
};

export default function AlbumPage({ album }: AlbumPageProps) {
  return (
    <>
      <Head>
        <title>{`${album.albumTitle} | Gallery | Dr. Vani R`}</title>
        <meta
          name="description"
          content={
            album.albumDescription ||
            `Photos from the album ${album.albumTitle}`
          }
        />
      </Head>

      <section className="py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/gallery"
            className="text-[#ed9282] hover:underline mb-6 inline-block"
          >
            ← All Albums
          </Link>

          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {album.albumTitle}
          </h1>
          {album.albumDescription && (
            <p className="text-gray-600 mb-8 text-center">
              {album.albumDescription}
            </p>
          )}

          {album.photos?.length > 0 ? (
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
              {album.photos.map((photo, idx) => (
                <div
                  key={idx}
                  className="break-inside-avoid mb-4 rounded-lg overflow-hidden shadow-md bg-white"
                >
                  <Image
                    src={urlFor(photo).width(800).url()}
                    alt={`Photo ${idx + 1}`}
                    width={800}
                    height={600} // Ideally dynamic based on image or use fixed aspect
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No images found for this album.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all album slugs from the first (and only) gallery document
  const slugs: string[] = await sanityClient.fetch(`
    *[_type == "gallery"][0].albums[].slug.current
  `);

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  // Fetch exactly the album whose slug.current matches the URL
  const albumData: Album | null = await sanityClient.fetch(
    `
      *[_type == "gallery"][0].albums[slug.current == $slug][0]
    `,
    { slug }
  );

  if (!albumData) {
    return { notFound: true };
  }

  return {
    props: {
      album: albumData,
    },
    revalidate: 60,
  };
};
