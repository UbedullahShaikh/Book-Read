import React from "react";
import { useAuth } from "../contexts/AuthContext";
import PageLayout from "../components/layout/PageLayout";
import HeroSection from "../components/home/HeroSection";
import HowItWorks from "../components/home/HowItWorks";
import FeatureHighlights from "../components/home/FeatureHighlights";
import CallToAction from "../components/home/CallToAction";

export default function Home() {
  const { user } = useAuth();

  return (
    <PageLayout >
      <HeroSection />

      <div>
        <HowItWorks />
        <FeatureHighlights />
        <CallToAction />
      </div>
    </PageLayout>
  );
}
