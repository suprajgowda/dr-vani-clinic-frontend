import React, { useState } from "react";
import Head from "next/head";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Clinic",
    details: [
      "04/1, Bull Temple Rd, NR Colony",
      "Basavanagudi, Bengaluru, Karnataka 560050",
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 9591493575", "+91 9886413073"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@dr_vani.com", "appointments@dr_vani.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat-Sun: 9:00 AM - 4:00 PM"],
  },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);

    if (!executeRecaptcha) {
      console.warn("reCAPTCHA not loaded yet");
      setLoading(false);
      return;
    }

    try {
      const token = await executeRecaptcha("contact_form");
      const data = new FormData(form);

      const formData = {
        firstName: data.get("firstName")?.toString() || "",
        lastName: data.get("lastName")?.toString() || "",
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
      setLoading(false);
    } catch (error) {
      console.error("There is an error while executing form submit--->", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact | Dr. Vani’s Clinic</title>
      </Head>
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your pregnancy journey with us? Contact our team
              today to schedule your consultation or ask any questions you may
              have.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-pink-100 w-12 h-12 rounded-xl flex items-center justify-center">
                        <info.icon className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Schedule Your Consultation
                  </h3>
                  {submitted ? (
                    <p className="thank-you">
                      Thank you! Your message has been sent.
                    </p>
                  ) : loading ? (
                    <p className="thank-you">Loading....</p>
                  ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <Input
                            placeholder="Enter your first name"
                            className="border-gray-300"
                            name="firstName"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <Input
                            placeholder="Enter your last name"
                            className="border-gray-300"
                            name="lastName"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="border-gray-300"
                            name="email"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <Input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="border-gray-300"
                            name="phone"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Appointment Date
                        </label>
                        <Input
                          type="date"
                          className="border-gray-300"
                          name="preferredDate"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message
                        </label>
                        <Textarea
                          placeholder="Tell us about your needs or any specific concerns..."
                          className="border-gray-300 min-h-[120px]"
                          name="message"
                        />
                      </div>

                      <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3">
                        Schedule Consultation
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

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

          <div className="mt-16 bg-pink-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Emergency Contact
            </h3>
            <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
              For urgent pregnancy-related concerns or emergencies, please
              don&apos;t hesitate to contact our 24/7 emergency hotline. Our
              medical team is always ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-pink-400 hover:text-pink-600"
              >
                Call Emergency Line
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-pink-400 hover:text-pink-600"
              >
                Chat with Nurse
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
