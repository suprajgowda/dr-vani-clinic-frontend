import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import logo from "../app/logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/Hero" },
    { name: "Services", href: "/services2" },
    { name: "Blogs", href: "/blogs" },
    { name: "About", href: "/about2" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact2" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-pink-50 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm text-pink-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>info@Dr Vani.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Emergency 24/7 Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/Hero" className="flex items-center space-x-2">
                <Image
                  src={logo}
                  alt="Dr. Vani R Logo"
                  width={40}
                  height={40}
                  priority
                />
                <h1 className="text-2xl font-bold text-pink-600">Dr. Vani R</h1>
              </Link>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  href={item.href}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Link
              href="/contact2"
              className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4"
              style={{ borderRadius: "5px" }}
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-pink-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-pink-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Button className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white">
              Book Appointment
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
