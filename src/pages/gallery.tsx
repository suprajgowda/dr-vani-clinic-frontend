import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { sanityClient, urlFor } from "../lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type Album = {
  albumTitle: string;
  albumDescription?: string;
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
            albums.map((album, albumIdx) => (
              <div key={albumIdx} className="mb-16">
                {/* Album Title and Description */}
                <h4 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                  {album.albumTitle}
                </h4>
                {album.albumDescription && (
                  <p className="text-center text-gray-600 mb-6">
                    {album.albumDescription}
                  </p>
                )}

                {/* Image Grid */}
                <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                  {album.photos?.map((photo, photoIdx) => (
                    <div
                      key={photoIdx}
                      className="break-inside-avoid mb-4 rounded-lg overflow-hidden shadow-md bg-white"
                    >
                      <Image
                        src={urlFor(photo).width(800).url()}
                        alt={`Photo ${photoIdx + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No albums available.</p>
          )}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const galleryData = await sanityClient.fetch(`
    *[_type == "gallery"][0] {
      albums[] {
        albumTitle,
        albumDescription,
        photos
      }
    }
  `);

  return {
    props: {
      albums: galleryData?.albums || [],
    },
    revalidate: 60,
  };
};
