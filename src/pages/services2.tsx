import Image from "next/image";
import React from "react";
import AdolescentHealth from "../app/adolescent-health.jpg";
import AnnualWellnessChecks from "../app/annual-wellness-checks.jpg";
import ContraceptionCounseling from "../app/contraception-counseling.jpg";
import FertilityServices from "../app/fertility-services.jpg";
import HysteroscopicSurgeries from "../app/hysteroscopic-surgeries.jpg";
import LaparoscopicSurgeries from "../app/laparoscopic-surgeries.jpg";
import pregnancyCare from "../app/pregnancy-care.jpg";
import UltrasoundServices from "../app/ultrasound-services.jpg";
import MenopauseManagement from "../app/menopause-management.jpg";
import VaginalSurgerie from "../app/vaginal-surgerie.jpg";

const services = [
  {
    title: "Adolescent Health",
    description:
      "Guiding teenagers through physical, emotional, and hormonal changes with empathy and expertise.",
    image: AdolescentHealth,
  },
  {
    title: "Pregnancy Care",
    description:
      "End-to-end care from conception to postpartum, ensuring the wellbeing of both mother and baby.",
    image: pregnancyCare,
  },
  {
    title: "Contraception Counseling",
    description:
      "Personalized guidance on safe and effective family planning methods.",
    image: ContraceptionCounseling,
  },
  {
    title: "Laparoscopic Surgeries",
    description:
      "Minimally invasive procedures using modern techniques for faster recovery.",
    image: LaparoscopicSurgeries,
    subServices: [
      "Sterilization",
      "Hysterectomy for fibroids/cancers",
      "Myomectomy",
      "Ovarian Cystectomy",
      "Salpingectomy",
      "Fertility-enhancing procedures",
      "Adenomyomectomy",
      "Endometriosis treatment",
      "Ovarian drilling (PCOS)",
      "Tubal recanalization",
    ],
  },
  {
    title: "Hysteroscopic Surgeries",
    description:
      "Scar-free procedures for intrauterine pathologies with diagnostic and therapeutic applications.",
    image: HysteroscopicSurgeries,
    subServices: [
      "Polypectomy",
      "Submucous fibroid resection",
      "Septum resection",
      "IUCD removal",
      "Diagnostic hysteroscopy",
    ],
  },
  {
    title: "Fertility Services",
    description:
      "Comprehensive workups and treatments tailored for couples trying to conceive.",
    image: FertilityServices,
    subServices: [
      "Ovulation induction",
      "Follicular monitoring",
      "IUI",
      "IVF",
      "Donor/Surrogacy programs",
    ],
  },
  {
    title: "Vaginal Surgeries",
    description:
      "Restorative procedures through the vaginal route to treat prolapse and related concerns.",
    image: VaginalSurgerie,
    subServices: [
      "Anterior repair",
      "Posterior repair",
      "Vaginal hysterectomy",
    ],
  },
  {
    title: "Annual Wellness Checks",
    description:
      "Preventive health check-ups to ensure holistic gynaecological wellness.",
    image: AnnualWellnessChecks,
    subServices: [
      "PAP smear",
      "Breast sonography",
      "Clinical breast exam",
      "Blood tests (HB, Sugar, Thyroid, Vit-D, B12)",
      "Cervical cancer vaccination",
    ],
  },
  {
    title: "Menopause Management",
    description:
      "Supportive care to manage hormonal transitions and symptoms for a better quality of life.",
    image: MenopauseManagement,
    subServices: [
      "Hot flashes",
      "Mood swings",
      "Sleep disturbances",
      "Vaginal dryness",
      "Osteoporosis prevention",
    ],
  },
  {
    title: "Ultrasound Services",
    description: "Accurate scans for pregnancy and gynaecological assessments.",
    image: UltrasoundServices,
    subServices: [
      "Early pregnancy scan",
      "NT scan",
      "Anomaly scan",
      "Growth scan",
      "Follicular scan",
      "Pelvic scan",
      "Doppler study",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-gray-50 py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Our Services
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative w-full h-48 bg-white">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#ed9282] mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-700 text-sm mb-4">
                  {service.description}
                </p>
                {service.subServices && (
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {service.subServices.map((item, subIdx) => (
                      <li key={subIdx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
