import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { sanityClient, urlFor } from "../lib/sanity";
import GalleryBanner from "../app/gallery_banner.jpg";

type Photo = {
  title?: string;
  _key: string;
  image?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  video?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
};

type Album = {
  albumTitle: string;
  albumDescription?: string;
  photos: Photo[];
};

type GalleryProps = {
  albums: Album[];
};

function getSanityFileUrl(ref: string) {
  const [, id, ext] = ref.split("-"); // e.g., file-ab58416215c9f65b91b93e3272fdc566867f830e-mp4
  return `https://cdn.sanity.io/files/${process.env.SANITY_PROJECT_ID}/production/${id}.${ext}`;
}

export default function Gallery({ albums }: GalleryProps) {
  return (
    <>
      <Head>
        <title>
          Clinic Gallery — Deliveries, Happy Families & Milestones | Dr. Vani R
        </title>
        <meta
          name="description"
          content="Browse our gallery of real patient journeys—deliveries, happy families, awards, and clinic milestones with Dr. Vani R, senior gynecologist in Basavanagudi, Bangalore."
        />

        {/* Canonical (www as primary) */}
        <link
          rel="canonical"
          href="https://www.drvanigynaecologistbangalore.com/gallery"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Clinic Gallery — Deliveries, Happy Families & Milestones"
        />
        <meta
          property="og:description"
          content="See real stories and memorable moments from our clinic in Basavanagudi, Bangalore."
        />
        <meta
          property="og:url"
          content="https://www.drvanigynaecologistbangalore.com/gallery"
        />
        {/* If you have a banner image, you can set a static OG image too */}
        {/* <meta property="og:image" content="https://www.drvanigynaecologistbangalore.com/og-gallery.jpg" /> */}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Clinic Gallery — Deliveries, Happy Families & Milestones"
        />
        <meta
          name="twitter:description"
          content="Memorable moments and patient stories with Dr. Vani R."
        />

        {/* JSON-LD: CollectionPage with an ImageGallery of albums */}
        <script
          type="application/ld+json"
          // Builds an ImageGallery from your Sanity data to improve understanding of this page
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Clinic Gallery — Dr. Vani R",
              url: "https://www.drvanigynaecologistbangalore.com/gallery",
              about:
                "Photo and video collection of real patient journeys, deliveries, awards, and clinic life.",
              hasPart: (albums || []).map((album) => ({
                "@type": "ImageGallery",
                name: album.albumTitle,
                description: album.albumDescription || undefined,
                // Optional: list first few items; search engines don't need every image
                associatedMedia: (album.photos || [])
                  .slice(0, 6)
                  .map((p, idx) => {
                    // Prefer images; if a video exists, mark it as MediaObject
                    if (p?.image?.asset?._ref) {
                      return {
                        "@type": "ImageObject",
                        name: p.title || `Photo ${idx + 1}`,
                        // If you have absolute URLs, use those. urlFor(...) returns absolute URLs in Next.
                        contentUrl: "", // can be filled at runtime if you render JSON-LD server-side with absolute URL
                      };
                    }
                    if (p?.video?.asset?._ref) {
                      return {
                        "@type": "MediaObject",
                        name: p.title || `Video ${idx + 1}`,
                      };
                    }
                    return undefined;
                  })
                  .filter(Boolean),
              })),
            }),
          }}
        />
      </Head>

      <section className="relative flex items-center justify-center w-full py-16 sm:py-20 md:py-24 min-h-120 text-white text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={GalleryBanner}
            alt="Contact Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Optional: dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Text Content */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-4">
          Gallery - Real Stories, Expert Care, and Remarkable Moments with Dr.
          Vani R
        </h1>
      </section>

      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
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
                      key={photo._key || photoIdx}
                      className="break-inside-avoid mb-4 rounded-lg overflow-hidden shadow-md bg-white"
                    >
                      {/* Render Image if available */}
                      {photo.image?.asset?._ref ? (
                        <Image
                          src={urlFor(photo.image).width(800).url()}
                          alt={photo.title || `Photo ${photoIdx + 1}`}
                          width={800}
                          height={600}
                          className="w-full h-auto object-contain"
                        />
                      ) : photo.video?.asset?._ref ? (
                        // Render Video if available
                        <video
                          controls
                          className="w-full h-auto object-contain"
                          src={getSanityFileUrl(photo.video.asset._ref)}
                          onError={() =>
                            console.error(
                              "Video failed to load:",
                              photo.video?.asset._ref
                            )
                          }
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500">
                          No media available
                        </div>
                      )}

                      {/* Optional Title */}
                      {photo.title && (
                        <p className="p-2 font-semibold text-base text-gray-700 text-center">
                          {photo.title}
                        </p>
                      )}
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
