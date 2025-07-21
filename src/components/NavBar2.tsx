import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../app/logo.png";

export default function NavBar2() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={logo} // path relative to public
            alt="Dr. Vani R Logo"
            width={50}
            height={50}
            priority
          />
          <span className="sr-only">Dr. Vani R</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center md:flex space-x-8 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services2">Services</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
          <button
            className="text-stone-50 bg-[#ED9282] hover:bg-[#f3b6ab] cursor-pointer px-6 py-2 rounded-full"
            onClick={() => router.push("/contact")}
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700 focus:outline-none transition-transform duration-300"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
              }
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white shadow-md px-4 pb-4 flex flex-col space-y-2 text-gray-700 font-medium"
          >
            <Link href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/services2" onClick={() => setIsOpen(false)}>
              Services
            </Link>
            <Link href="/blogs" onClick={() => setIsOpen(false)}>
              Blogs
            </Link>
            <Link href="/gallery" onClick={() => setIsOpen(false)}>
              Gallery
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Book Appointment
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
