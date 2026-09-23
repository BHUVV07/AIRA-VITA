import HeroSection from "@/components/sections/HeroSection";
import AirflowTransition from "@/components/sections/AirflowTransition";
import ProductWorld from "@/components/sections/ProductWorld";
import AboutIntroduction from "@/components/sections/AboutIntroduction";
import EngineeringPrinciples from "@/components/sections/EngineeringPrinciples";
import IndustriesPreview from "@/components/sections/IndustriesPreview";
import AirflowAssistant from "@/components/sections/AirflowAssistant";
import DistributorSection from "@/components/sections/DistributorSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

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
