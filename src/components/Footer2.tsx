import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../app/white_logo.png";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

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
    <footer className="px-40 bg-[#171a21]">
      <FooterFirstRow />
      <div className="grid grid-cols-4 gap-4 border-b border-solid border-[#FFFFFF12] pb-4">
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
    <div className="border-b border-solid border-[#FFFFFF12] items-center py-4 flex justify-between min-h-25">
      <div>
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={logo} // path relative to public
            alt="Dr. Vani R Logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-white">Dr. Vani R</span>
        </Link>
      </div>
      <div className="flex">
        <button className="text-white flex hover:bg-[#ED9282] bg-[#FFFFFF12] cursor-pointer py-1.5 px-4 rounded-xl items-center">
          <FaFacebookF className="text-xl transition mr-2" />
          Facebook
        </button>
        <button className="text-white hover:bg-[#ED9282] cursor-pointer flex bg-[#FFFFFF12] py-1.5 px-4 mx-2 rounded-xl items-center">
          <FaYoutube className="text-xl transition mr-2" />
          Youtube
        </button>
        <button className="text-white flex hover:bg-[#ED9282] bg-[#FFFFFF12] cursor-pointer py-1.5 px-4 rounded-xl items-center">
          <FaInstagram className="text-xl transition mr-2" />
          Instagram
        </button>
      </div>
    </div>
  );
};

const FooterLinks = (props: { title: string; links: string[] }) => {
  const links = props.links;
  return (
    <div className="col-span-1 text-white py-4 px-2">
      <div className="text-lg text-white pb-2">{props.title}</div>
      <div className="grid grid-cols-1 gap-2">
        <div className="flex flex-col">
          {links.map((link, index) => {
            return (
              <div key={index} className="text-sm py-2 text-[#FFFFFF99]">
                {link}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const BusinessHours = () => {
  return (
    <div className="col-span-1 text-white p-4">
      <div className="text-lg text-white pb-2">Business hours</div>
      <div>
        <div className="text-[#FFFFFF99] py-2 flex justify-between border-b border-solid border-[#FFFFFF12]">
          <div>Weekdays</div>
          <div>09.00 AM - 21.00 PM</div>
        </div>
        <div className="text-[#FFFFFF99] py-2 flex justify-between border-b border-solid border-[#FFFFFF12]">
          <div>Saturday</div>
          <div>09.00 AM - 18.00 PM</div>
        </div>
        <div className="text-[#FFFFFF99] py-2 flex justify-between">
          <div>Sunday</div>
          <div>Closed</div>
        </div>
      </div>
    </div>
  );
};

const ThirdRow = () => {
  return (
    <div className="py-6 grid grid-cols-3">
      <div className="text-[#FFFFFF99] col-span-2">
        © {new Date().getFullYear()} Dr. Vani&lsquo;s Clinic. All Rights
        Reserved.
      </div>
      <div className="text-[#FFFFFF99] flex col-span-1 text-right justify-end">
        <div className="mr-4">Terms & conditions</div>
        <div className="ml-4">Privacy policy</div>
      </div>
    </div>
  );
};
