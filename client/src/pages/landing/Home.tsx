import AboutSection from "@/components/landing/AboutSection";
import Fetures from "@/components/landing/Fetures";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import WhyChooseUs from "@/components/landing/WhyChooseUs";

const Home = () => {
  return (
    <main>
      <Header />
      <Hero />
      <AboutSection />
      <Fetures />
      <WhyChooseUs />
      <Footer />
    </main>
  );
};

export default Home;
