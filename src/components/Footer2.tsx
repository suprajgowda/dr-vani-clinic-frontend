import Image from "next/image";
import Link from "next/link";
import React from "react";
// import logo from "../app/white_logo.png";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../app/logo.png";

export default function Footer2() {
  const features = [
    "Page builder",
    "Theme options",
    "Theme builder",
    "Template library",
  ];
  const resources = ["Support center", "Documentation", "Community", "Hosting"];
  const socials = ["Behance", "Dribbble", "Facebook", "Instagram"];

  return (
    <footer className="bg-[#c1e8f0] px-6 sm:px-10 md:px-20 lg:px-40 pt-10 pb-6 text-white">
      <FooterFirstRow />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 border-b border-[#FFFFFF12] py-8">
        <FooterLinks title="Features" links={features} />
        <FooterLinks title="Resources" links={resources} />
        <FooterLinks title="Social" links={socials} />
        <BusinessHours />
      </div>
      <ThirdRow />
    </footer>
  );
}

const FooterFirstRow = () => {
  return (
    <div className="border-b border-[#FFFFFF12] py-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={logo}
          alt="Dr. Vani R Logo"
          width={40}
          height={40}
          priority
        />
        <span className="text-black text-lg font-semibold">Dr. Vani R</span>
      </Link>

      <div className="flex flex-wrap justify-center gap-3">
        <SocialButton icon={<FaFacebookF />} label="Facebook" />
        <SocialButton icon={<FaYoutube />} label="Youtube" />
        <SocialButton icon={<FaInstagram />} label="Instagram" />
      </div>
    </div>
  );
};

const SocialButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <button className="flex items-center gap-2 bg-[#ed9282] hover:bg-[#60b6c7] cursor-pointer text-white px-4 py-1.5 rounded-xl text-sm transition">
    <span className="text-xl">{icon}</span>
    {label}
  </button>
);

const FooterLinks = ({ title, links }: { title: string; links: string[] }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-3 text-black">{title}</h4>
      <ul className="space-y-2 text-sm text-stone-500">
        {links.map((link, index) => (
          <li key={index}>{link}</li>
        ))}
      </ul>
    </div>
  );
};

const BusinessHours = () => {
  const hours = [
    { day: "Weekdays", time: "09.00 AM - 21.00 PM" },
    { day: "Saturday", time: "09.00 AM - 18.00 PM" },
    { day: "Sunday", time: "Closed" },
  ];

  return (
    <div>
      <h4 className="text-lg font-semibold mb-3 text-black">Business hours</h4>
      <ul className="text-sm text-[#898989] space-y-2">
        {hours.map((h, idx) => (
          <li
            key={idx}
            className={`flex justify-between ${
              idx < 2 ? "border-b border-[#FFFFFF12] pb-2" : ""
            }`}
          >
            <span>{h.day}</span>
            <span>{h.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ThirdRow = () => {
  return (
    <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-[#898989] gap-4">
      <div>
        © {new Date().getFullYear()} Dr. Vani‘s Clinic. All Rights Reserved.
      </div>
      <div className="flex gap-6">
        <a href="#" className="hover:underline">
          Terms & conditions
        </a>
        <a href="#" className="hover:underline">
          Privacy policy
        </a>
      </div>
    </div>
  );
};
