import { HeroSection } from "./hero-section";
import { BusinessProblemsSection } from "./business-problems-section";
import { InnovationErpSection } from "./innovation-erp-section";
import { PosSection } from "./pos-section";
import { ImsSection } from "./ims-section";
import { ServicesSection } from "./services-section";
import { PricingSection } from "./pricing-section";
import { ProcessSection } from "./process-section";
import { FounderConsultationSection } from "./founder-consultation-section";
import { FaqSection } from "./faq-section";
import { ContactSection } from "./contact-section";

export async function HomepageShell() {
  return (
    <>
      <HeroSection />
      <BusinessProblemsSection />
      <InnovationErpSection />
      <PosSection />
      <ImsSection />
      <ServicesSection />
      <PricingSection />
      <ProcessSection />
      <FounderConsultationSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
