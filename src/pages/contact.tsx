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
                className="space-y-6 bg-white p-6 rounded-lg shadow-md"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  console.log("The Contact Us Form---->", form);

                  const formData = {
                    name: form.name.value,
                    email: form.email.value,
                    message: form.message.value,
                    phone: form.phone.value,
                    preferredDate: form.preferredDate.value,
                  };
                  console.log("The Form Data---->", formData);

                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                  });

                  console.log("The Response from the contact api----->", res);

                  if (res.ok) setSubmitted(true);
                }}
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
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded hover:bg-blue-700 transition"
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
