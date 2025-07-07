import Slider from "react-slick";
import Image from "next/image";
import Meditation from "../app/meditation.jpg";
import Baby from "../app/baby.jpg";

// type HeroCarouselProps = {
//   images?: any[]; // Not currently used but retained if dynamic images added
// };

export default function HeroCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  const slides = [
    {
      img: Meditation,
      title: "Experience Peaceful Motherhood",
      subtitle: "Holistic gynecological care, tailored for you.",
    },
    {
      img: Baby,
      title: "Bringing New Life with Care",
      subtitle: "Every baby's first step starts with expert hands.",
    },
  ];

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh]">
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div key={idx} className="relative w-full h-[70vh] md:h-[80vh]">
            <Image
              src={slide.img}
              alt={`Hero Slide ${idx + 1}`}
              fill
              className="object-cover object-center"
              priority={idx === 0}
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 bg-black/2 flex flex-col items-start justify-center text-white text-left px-8 md:px-16">
              <h2 className="text-3xl text-[#fea38e] sm:text-4xl md:text-5xl font-bold mb-3">
                {slide.title}
              </h2>
              <p className="text-base text-black sm:text-lg md:text-xl max-w-xl">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
