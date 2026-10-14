import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import AirflowTransition from "@/components/sections/AirflowTransition";
import ProductWorld from "@/components/sections/ProductWorld";
import AboutIntroduction from "@/components/sections/AboutIntroduction";
import EngineeringPrinciples from "@/components/sections/EngineeringPrinciples";
import IndustriesPreview from "@/components/sections/IndustriesPreview";
import DistributorSection from "@/components/sections/DistributorSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import { HOMEPAGE_MONEY_KEYWORDS } from "@/lib/seo/homepage-keywords";

export const metadata: Metadata = {
  title: "Aria Vita | HVAC Air Distribution Products & Solutions South India",
  description:
    "Aria Vita manufactures & supplies high-performance HVAC air distribution products across South India. Fire retardant canvas, CAR, disc valves, air curtains & flexible duct distributed via Ecosta Systems Bangalore.",
  keywords: HOMEPAGE_MONEY_KEYWORDS.map((k) => k.phrase),
  alternates: {
    canonical: "https://www.ariavita.in",
  },
  openGraph: {
    title: "Aria Vita | HVAC Air Distribution Products & Solutions South India",
    description:
      "Aria Vita manufactures & supplies high-performance HVAC air distribution products across South India. Fire retardant canvas, CAR, disc valves, air curtains & flexible duct distributed via Ecosta Systems Bangalore.",
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
      <DistributorSection />
      <FinalCTASection />
    </>
  );
}
