import React from "react";
import HeroSection from "../components/home/HeroSection";
import ServicesOverview from "../components/home/ServicesOverview";
import LessonsShowcase from "../components/home/LessonsShowcase";
import PricingSection from "../components/home/PricingSection";
import ReferralSection from "../components/home/ReferralSection";
import LifeguardShowcase from "../components/home/LifeguardShowcase";
import LifeguardPricingSection from "../components/home/LifeguardPricingSection";
import WhatToExpectSection from "../components/home/WhatToExpectSection";
import ServiceAreaSection from "../components/home/ServiceAreaSection";
import FAQSection from "../components/home/FAQSection";
import EmailCaptureSection from "../components/home/EmailCaptureSection";
import AboutSection from "../components/home/AboutSection";
import CTASection from "../components/home/CTASection";
import ContactSection from "../components/home/ContactSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesOverview />
      <LessonsShowcase />
      <PricingSection />
      <ReferralSection />
      <LifeguardShowcase />
      <LifeguardPricingSection />
      <WhatToExpectSection />
      <ServiceAreaSection />
      <FAQSection />
      <EmailCaptureSection />
      <AboutSection />
      <CTASection />
      <ContactSection />
    </div>
  );
}