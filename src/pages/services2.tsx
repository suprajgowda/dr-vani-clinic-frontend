import {
  Stethoscope,
  Baby,
  Heart,
  Calendar,
  Clock,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Stethoscope,
      title: "Prenatal Care",
      description:
        "Comprehensive prenatal checkups and monitoring throughout your pregnancy journey.",
      features: [
        "Regular checkups",
        "Health monitoring",
        "Risk assessment",
        "Nutrition guidance",
      ],
    },
    {
      icon: Baby,
      title: "Ultrasound Services",
      description:
        "Advanced 3D/4D ultrasound imaging to see your baby's development and growth.",
      features: [
        "3D/4D imaging",
        "Gender reveal",
        "Growth monitoring",
        "Digital photos",
      ],
    },
    {
      icon: Heart,
      title: "High-Risk Pregnancy",
      description:
        "Specialized care for high-risk pregnancies with expert monitoring and support.",
      features: [
        "Specialist care",
        "Advanced monitoring",
        "Risk management",
        "Emergency support",
      ],
    },
    {
      icon: Calendar,
      title: "Birth Planning",
      description:
        "Personalized birth plan development and delivery preparation services.",
      features: [
        "Birth plan creation",
        "Hospital tours",
        "Delivery prep",
        "Pain management",
      ],
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock support and emergency care whenever you need us.",
      features: [
        "Emergency hotline",
        "24/7 availability",
        "Urgent care",
        "Peace of mind",
      ],
    },
    {
      icon: Shield,
      title: "Postpartum Care",
      description:
        "Comprehensive care and support for mother and baby after delivery.",
      features: [
        "Recovery support",
        "Breastfeeding help",
        "Baby care",
        "Follow-up visits",
      ],
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Pregnancy Care Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From the moment you conceive to postpartum care, we provide complete
            medical support with the latest technology and compassionate care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2"
            >
              <CardContent className="p-8">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <service.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-blue-600 text-white rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Schedule your first consultation today and let our expert team
              guide you through every step of your pregnancy with personalized
              care and support.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
