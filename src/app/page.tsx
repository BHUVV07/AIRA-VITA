import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import AirflowTransition from "@/components/sections/AirflowTransition";
import ProductWorld from "@/components/sections/ProductWorld";
import AboutIntroduction from "@/components/sections/AboutIntroduction";
import EngineeringPrinciples from "@/components/sections/EngineeringPrinciples";
import IndustriesPreview from "@/components/sections/IndustriesPreview";
import AirflowAssistant from "@/components/sections/AirflowAssistant";
import DistributorSection from "@/components/sections/DistributorSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

export const metadata: Metadata = {
  title: "Aria Vita | HVAC Air Distribution Products & Solutions",
  description:
    "Aria Vita manufactures and supplies HVAC air distribution products for commercial, industrial and residential applications, including disc valves, flexible ducts, air curtains and airflow control solutions.",
  alternates: {
    canonical: "https://www.ariavita.in",
  },
  openGraph: {
    title: "Aria Vita | HVAC Air Distribution Products & Solutions",
    description:
      "Aria Vita manufactures and supplies HVAC air distribution products for commercial, industrial and residential applications, including disc valves, flexible ducts, air curtains and airflow control solutions.",
    url: "https://www.ariavita.in",
    siteName: "Aria Vita",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <AirflowTransition />
      <ProductWorld />
      <AboutIntroduction />
      <EngineeringPrinciples />
      <IndustriesPreview />
      <AirflowAssistant />
      <DistributorSection />
      <FinalCTASection />
    </>
  );
}
