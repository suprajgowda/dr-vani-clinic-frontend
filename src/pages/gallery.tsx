import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { sanityClient, urlFor } from "../lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type Album = {
  albumTitle: string;
  albumDescription?: string;
  slug: { current: string };
  photos: SanityImageSource[];
};

type GalleryProps = {
  albums: Album[];
};

export default function Gallery({ albums }: GalleryProps) {
  return (
    <>
      <Head>
        <title>Gallery | Dr. Vani R</title>
        <meta
          name="description"
          content="Explore precious moments captured in our gallery – real families, happy smiles, and memorable experiences."
        />
      </Head>

      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Gallery - Real Stories, Expert Care, and Remarkable Moments with Dr.
            Vani R
          </h3>

          {albums.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {albums.map((album, idx) =>
                album.slug?.current && album.photos?.length > 0 ? (
                  <Link
                    key={idx}
                    href={`/gallery/${album.slug.current}`}
                    className="block cursor-pointer bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                  >
                    <div className="relative w-full h-56">
                      <Image
                        src={urlFor(album.photos[0]).width(800).url()}
                        alt={album.albumTitle || "Gallery Album"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {album.albumTitle}
                      </h2>
                      {album.albumDescription && (
                        <p className="text-sm text-gray-600 mt-1">
                          {album.albumDescription}
                        </p>
                      )}
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          ) : (
            <p className="text-center text-gray-600">No albums available.</p>
          )}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Fetch the first (and only) gallery document, grabbing its albums array
  const galleryData = await sanityClient.fetch(`
    *[_type == "gallery"][0] {
      albums[]{
        albumTitle,
        albumDescription,
        slug,
        photos
      }
    }
  `);

  return {
    props: {
      albums: galleryData?.albums || [],
    },
    revalidate: 60, // Rebuild page at most once per minute if data changes
  };
};
