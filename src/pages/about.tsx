import React from "react";
import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type AboutProps = {
  title: string;
  description: any;
  profileImage: SanityImageSource;
};

const AboutPage = ({ title, description, profileImage }: AboutProps) => {
  return (
    <main className="about-page">
      <h1>{title}</h1>

      {profileImage && (
        <Image
          className="profile-image"
          width={300}
          height={300}
          src={urlFor(profileImage).width(300).url()}
          alt="Doctor Vani"
        />
      )}

      {description && (
        <div className="prose">
          <PortableText value={description} />
        </div>
      )}
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "about"][0]`;
  const data = await sanityClient.fetch(query);

  return {
    props: {
      title: data?.title || "",
      description: data?.description || [],
      profileImage: data?.profileImage || null,
    },
    revalidate: 60,
  };
};

export default AboutPage;
