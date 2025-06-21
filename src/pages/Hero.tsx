import { ArrowRight, Heart, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-br from-pink-50 to-white min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Journey to
                <span className="text-pink-600 block">Motherhood</span>
                Starts Here
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Expert pregnancy care with compassionate support. From
                conception to delivery, we&apos;re here to guide you through
                every precious moment of your pregnancy journey.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact2" style={{ cursor: "pointer" }}>
                <Button
                  size="lg"
                  style={{ cursor: "pointer" }}
                  className="bg-pink-600 hover:bg-pink-700 text-white group"
                >
                  Book Consultation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/services2" style={{ cursor: "pointer" }}>
                <Button
                  size="lg"
                  style={{ cursor: "pointer" }}
                  variant="outline"
                  className="border-pink-600 text-pink-600 hover:bg-pink-50"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">5000+</div>
                <div className="text-sm text-gray-600">Happy Mothers</div>
              </div>
              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-8 w-8 text-pink-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                {/* <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-pink-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Expert Doctors</div> */}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-pink-100 to-pink-50 rounded-3xl p-8 overflow-hidden">
              <div className="aspect-square bg-white rounded-2xl shadow-2xl flex items-center justify-center">
                <Image
                  src={
                    "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80"
                  }
                  alt="Clinic Banner"
                  fill
                  priority
                  className="object-cover object-center sm:object-top"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-200 rounded-full opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-200 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
