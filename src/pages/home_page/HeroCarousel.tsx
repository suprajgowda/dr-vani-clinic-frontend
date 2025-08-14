import Slider from "react-slick";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { ScrollingBanners } from "@/types";

export default function HeroCarousel({
  scrollingBanner = [],
}: {
  scrollingBanner: ScrollingBanners[];
}) {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };
  if (!Array.isArray(scrollingBanner) || scrollingBanner.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {scrollingBanner.map((slide, idx) => (
          <div key={idx}>
            <div className="relative w-full aspect-[3/2] sm:aspect-[16/9] md:aspect-[21/9]">
              <Image
                src={urlFor(slide.bannerImage).url()}
                alt={`Hero Slide ${idx + 1}`}
                fill
                priority={idx === 0}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-center px-6 sm:px-10 md:px-16 text-white">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#fea38e] mb-3 leading-tight">
                  {slide.bannerTitle}
                </h2>
                <p className="text-sm sm:text-base md:text-lg max-w-xl">
                  {slide.bannerDescription}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
