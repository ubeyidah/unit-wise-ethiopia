import AboutSection from "@/components/landing/AboutSection";
import Accordion from "@/components/landing/Accordion";
import CTA from "@/components/landing/CTA";
import Fetures from "@/components/landing/Fetures";
import Hero from "@/components/landing/Hero";
import Pricing from "@/components/landing/Pricing";
import Testimonial from "@/components/landing/Testimonial";
import WhyChooseUs from "@/components/landing/WhyChooseUs";

const Home = () => {
  return (
    <main>
      <Hero />
      <AboutSection />
      <Fetures />
      <WhyChooseUs />
      <Pricing />
      <Testimonial />
      <CTA />
      <Accordion />
    </main>
  );
};

export default Home;
