import Image from "next/image";
import Link from "next/link";
import React from "react";
// import logo from "../app/white_logo.png";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import logo from "../app/logo.png";

type socialsType = {
  title: string;
  url: string;
};

export default function Footer2() {
  const resources: socialsType[] = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Services",
      url: "/services2",
    },
    {
      title: "Blogs",
      url: "/blogs",
    },
    {
      title: "Gallery",
      url: "/gallery",
    },
    {
      title: "About",
      url: "/about",
    },
    {
      title: "Contact",
      url: "/contact",
    },
  ];
  const socials: socialsType[] = [
    {
      title: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61572265288032",
    },
    { title: "Instagram", url: "https://www.instagram.com/dr.vani76/" },
    { title: "Whatsapp", url: "https://wa.me/919886413073" },
  ];

  return (
    <footer className="bg-[#c1e8f0] px-6 sm:px-10 md:px-20 lg:px-40 pt-10 pb-6 text-white">
      <FooterFirstRow />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 border-b border-[#FFFFFF12] py-8">
        <FooterLinks title="Resources" links={resources} />
        <FooterLinks title="Social" links={socials} social />
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
        <a
          href="https://www.facebook.com/profile.php?id=61572265288032"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialButton icon={<FaFacebookF />} label="Facebook" />
        </a>
        <a
          href="https://wa.me/919886413073"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialButton icon={<FaWhatsapp />} label="Whatsapp" />
        </a>
        <a
          href="https://www.instagram.com/dr.vani76/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialButton icon={<FaInstagram />} label="Instagram" />
        </a>
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

const FooterLinks = ({
  title,
  links,
  social = false,
}: {
  title: string;
  links: socialsType[];
  social?: boolean;
}) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-3 text-black">{title}</h4>
      <ul className="space-y-2 text-sm text-stone-500">
        {links.map((link, index) => (
          <li key={index}>
            {social ? (
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            ) : (
              <Link href={link.url}>{link.title}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const BusinessHours = () => {
  const hours = [
    { day: "Weekdays", time: "10.00 AM - 07.00 PM" },
    { day: "Saturday", time: "10.00 AM - 07.00 PM" },
    { day: "Sunday", time: "11.00 AM - 01.00 PM" },
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
        © {new Date().getFullYear()} Dr. Vani&lsquo;s Clinic. All Rights
        Reserved.
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
