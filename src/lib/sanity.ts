import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanityClient = createClient({
  projectId: "zzb6y3nc", // You get this from sanity.json or your dashboard
  dataset: "production",
  useCdn: true, // Caches results for faster performance
  apiVersion: "2023-01-01",
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: SanityImageSource) => builder.image(source);
