import React, { useState } from "react";
import Head from "next/head";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Head>
        <title>Contact | Dr. Vani’s Clinic</title>
      </Head>

      {/* Section 1 – Banner */}
      <section className="relative w-full py-16 sm:py-20 md:py-24 bg-blue-800 text-white text-center">
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
                action="https://formspree.io/f/mwpoyqnk"
                method="POST"
                onSubmit={() => setSubmitted(true)}
                className="space-y-6"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded px-4 py-3"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded px-4 py-3"
                />
                <textarea
                  placeholder="Your Message"
                  rows={6}
                  className="w-full border border-gray-300 rounded px-4 py-3"
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded"
                >
                  Send Message
                </button>
              </form>
            </div>
          )}

          {/* Right – Contact Info */}
          <div className="text-gray-700">
            <h2 className="text-2xl font-bold mb-6">Clinic Info</h2>
            <p className="mb-4">
              <strong>Phone:</strong>
              <br />
              +91 95914 93575
            </p>
            <p className="mb-4">
              <strong>Email:</strong>
              <br />
              dr.vani@example.com
            </p>
            <p className="mb-4">
              <strong>Address:</strong>
              <br />
              04/1, Bull Temple Rd, NR Colony, Basavanagudi, Bengaluru,
              Karnataka 560050
            </p>

            {/* Google Maps Embed */}
            <div className="mt-6 w-full h-64">
              <iframe
                title="Clinic Location"
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
        </div>
      </section>
    </>
  );
};

export default ContactPage;
