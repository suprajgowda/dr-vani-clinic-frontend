import Slider from "react-slick";
import Image from "next/image";
import Meditation from "../app/meditation.jpg";
import Baby from "../app/baby.jpg";
import HumanFetusPrenatal from "../app/human-fetus-prenatal.jpg";
import Laproscopy from "../app/laproscopy_banner.jpeg";

export default function HeroCarousel() {
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

  const slides = [
    {
      img: Meditation,
      title: "Experience Peaceful Motherhood",
      subtitle:
        "Embrace your journey to motherhood with expert guidance and heartfelt care. Dr. Vani ensures every step is safe, supported, and stress-free.",
    },
    {
      img: Baby,
      title: "Bringing New Life with Care",
      subtitle:
        "Welcoming every baby with expert hands and a compassionate heart. Dr. Vani provides safe, personalized care for every birth journey.",
    },
    {
      img: HumanFetusPrenatal,
      title: "Fertility Treatments",
      subtitle:
        "Advanced fertility care rooted in evidence-based medicine. Dr. Vani delivers precise, personalized treatment plans you can trust.",
    },
    {
      img: Laproscopy,
      title: "Laparoscopy",
      subtitle:
        "Gentle surgical care with smaller cuts and quicker healing. Laparoscopic procedures by Dr. Vani ensure safety, comfort, and results.",
    },
  ];

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div key={idx}>
            <div className="relative w-full aspect-[3/2] sm:aspect-[16/9] md:aspect-[21/9]">
              <Image
                src={slide.img}
                alt={`Hero Slide ${idx + 1}`}
                fill
                priority={idx === 0}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-center px-6 sm:px-10 md:px-16 text-white">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#fea38e] mb-3 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg max-w-xl">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
