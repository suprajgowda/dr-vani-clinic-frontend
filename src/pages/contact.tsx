import React, { useState } from "react";
import Head from "next/head";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ContactImage from "../app/contact_us.jpg";
import Image from "next/image";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!executeRecaptcha) {
      console.warn("reCAPTCHA not loaded yet");
      return;
    }

    const token = await executeRecaptcha("contact_form");
    const data = new FormData(form);

    const formData = {
      name: data.get("name")?.toString() || "",
      email: data.get("email")?.toString() || "",
      phone: data.get("phone")?.toString() || "",
      preferredDate: data.get("preferredDate")?.toString() || "",
      message: data.get("message")?.toString() || "",
      recaptchaToken: token,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Contact | Dr. Vani&lsquo;s Clinic</title>
      </Head>

      {/* Section 1 – Banner */}
      <section className="relative flex items-center justify-center w-full py-16 sm:py-20 md:py-24 min-h-120 text-white text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={ContactImage}
            alt="Contact Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Optional: dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Text Content */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-4">
          Contact Us
        </h1>
      </section>

      {/* Section 2 – Form + Info Grid */}
      <section className="py-16 px-4 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left – Contact Form */}
          {submitted ? (
            <p className="thank-you">Thank you! Your message has been sent.</p>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form
                className="space-y-6 bg-white p-6 rounded-lg shadow-md"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="preferredDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Preferred Appointment Date
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#ed9282] text-white font-semibold py-3 px-6 rounded hover:bg-[#ed9282] transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          )}

          {/* Right – Contact Info */}
          <div className="text-gray-700">
            <h2 className="text-2xl font-bold mb-6">Clinic Info</h2>
            <div className="flex flex-col sm:flex-row mb-4 sm:items-start sm:space-x-12">
              <p className="mb-4 sm:mb-0">
                <strong>Phone:</strong>
                <br />
                <a
                  href="tel:+919886413073"
                  className="text-[#ed9282] hover:underline"
                >
                  +91 98864 13073
                </a>
              </p>
              <p className="mb-4 sm:mb-0">
                <strong>Email:</strong>
                <br />
                <a
                  href="mailto:dr.vani@example.com"
                  className="text-[#ed9282] hover:underline"
                >
                  dr.vani@example.com
                </a>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-8">
              {/* Sri Balaji Hospital Card */}
              <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Sri Balaji Hospital
                </h3>
                <p>
                  <strong>Timings:</strong> 10:00 AM - 2:00 PM
                </p>
                <p>
                  <strong>Address:</strong>
                  <br />
                  Balaji Gynaecology & Infertility Centre, Bangalore
                </p>
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <iframe
                    title="Sri Balaji Hospital Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5345179630567!2d77.5666224!3d12.9376116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae158be206d233%3A0x4bcd1e0d78b8312!2sBalaji%20Gynaecology%20%26%20Infertility%20Centre!5e0!3m2!1sen!2sin!4v1748680686053!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Motherhood Hospital Card */}
              <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Motherhood Hospital, Banashankari
                </h3>
                <p>
                  <strong>Timings:</strong> 3:00 PM - 7:00 PM
                </p>
                <p>
                  <strong>Address:</strong>
                  <br />
                  Motherhood Hospital, Banashankari, Bangalore
                </p>
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <iframe
                    title="Motherhood Hospital Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31109.341750991076!2d77.53507536506682!3d12.920857531496316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15ac760bf0d7%3A0x7d4d3d8f2e519f4d!2sMotherhood%20Hospital%2C%20Banashankari!5e0!3m2!1sen!2sin!4v1723456798000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
