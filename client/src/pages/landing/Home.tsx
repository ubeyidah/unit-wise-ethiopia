import AboutSection from "@/components/landing/AboutSection";
import CTA from "@/components/landing/CTA";
import Fetures from "@/components/landing/Fetures";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Pricing from "@/components/landing/Pricing";
import Testimonial from "@/components/landing/Testimonial";
import WhyChooseUs from "@/components/landing/WhyChooseUs";

const Home = () => {
  return (
    <main>
      <Header />
      <Hero />
      <AboutSection />
      <Fetures />
      <WhyChooseUs />
      <Pricing />
      <Testimonial />
      <CTA />
      <Footer />
    </main>
  );
};

export default Home;
