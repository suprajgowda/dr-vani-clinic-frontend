import React from "react";
import { Award, Users, Star, CheckCircle } from "lucide-react";

const About = () => {
  const achievements = [
    { icon: Users, number: "5000+", label: "Successful Deliveries" },
    { icon: Award, number: "15+", label: "Years of Excellence" },
    { icon: Star, number: "4.9", label: "Patient Rating" },
    { icon: CheckCircle, number: "99%", label: "Success Rate" },
  ];

  const features = [
    "Board-certified obstetricians and gynecologists",
    "State-of-the-art medical equipment and facilities",
    "Personalized care plans for every patient",
    "24/7 emergency support and consultation",
    "Multilingual staff for diverse communities",
    "Insurance-friendly pricing and payment plans",
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Medicora for Your Pregnancy Journey?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                With over 15 years of experience in maternal care, Medicora has
                been the trusted partner for thousands of families. Our team of
                expert doctors and caring staff provide personalized attention
                and world-class medical care.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We understand that every pregnancy is unique, which is why we
                create customized care plans that address your specific needs,
                concerns, and preferences throughout your journey to motherhood.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center"
                >
                  <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To provide exceptional maternal healthcare with compassion,
                expertise, and cutting-edge medical technology, ensuring the
                health and well-being of both mother and baby throughout the
                pregnancy journey.
              </p>
            </div>

            <div className="bg-white border-2 border-blue-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Patient Testimonial
              </h3>
              <p className="text-gray-600 italic mb-4">
                &quot;The care I received at Medicora was exceptional. Dr. Smith
                and her team made me feel comfortable and confident throughout
                my entire pregnancy. I couldn&lsquo;t have asked for better
                support.&quot;
              </p>
              <div className="text-sm font-semibold text-blue-600">
                — Sarah Johnson, New Mom
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
