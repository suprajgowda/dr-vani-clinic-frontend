import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Clinic",
      details: ["123 Medical Center Drive", "Healthcare District, City 12345"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Emergency: +1 (555) 911-HELP"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@medicora.com", "appointments@medicora.com"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat-Sun: 9:00 AM - 4:00 PM"],
    },
  ];

  return (
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
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <Input
                        placeholder="Enter your first name"
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <Input
                        placeholder="Enter your last name"
                        className="border-gray-300"
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
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Appointment Date
                    </label>
                    <Input type="date" className="border-gray-300" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell us about your needs or any specific concerns..."
                      className="border-gray-300 min-h-[120px]"
                    />
                  </div>

                  <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3">
                    Schedule Consultation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16 bg-pink-500 rounded-2xl p-8 md:p-12 text-center text-white">
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
  );
};

export default Contact;
