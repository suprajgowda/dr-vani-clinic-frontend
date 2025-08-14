import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type ScrollingBanners = {
  bannerDescription: string;
  bannerImage: SanityImageSource;
  bannerTitle: string;
};

export type HomeTestimonials = {
  name: string;
  content: string;
};

export type HomeProps = {
  scrollingBanner: ScrollingBanners[];
  heroImage: SanityImageSource;
  services: {
    serviceImage: SanityImageSource;
    serviceText: string;
    serviceDescription: string;
    blogLink?: {
      slug: {
        current: string;
      };
    };
  }[];
  sectionDescription: string;

  medicalServicesTitle: string;
  medicalServicesDescription: string;
  medicalServicesList: MedicalServicesList[];

  faqContent: { question: string; answer: string }[];

  testimonials: HomeTestimonials[];
};

export type MedicalServicesList = {
  serviceDescription: string;
  serviceImage: SanityImageSource;
  serviceTitle: string;
};
