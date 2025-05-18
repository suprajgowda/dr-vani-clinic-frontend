import React from "react";
import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../lib/sanity";
import Image from "next/image";

type Service = {
  _id: string;
  title: string;
  description: string;
  icon: any;
};

type ServicesProps = {
  services: Service[];
};

const ServicesPage = ({ services }: ServicesProps) => {
  return (
    <main className="services-page">
      <h1>Our Services</h1>
      <div className="services-grid">
        {services.map((service) => (
          <div key={service._id} className="service-card">
            {service.icon && (
              <Image
                height={120}
                width={120}
                src={urlFor(service.icon).width(120).url()}
                alt={service.title}
              />
            )}
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "service"]`;
  const services = await sanityClient.fetch(query);

  return {
    props: { services },
    revalidate: 60,
  };
};

export default ServicesPage;
