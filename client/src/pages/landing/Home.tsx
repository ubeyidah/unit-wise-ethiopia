import AboutSection from "@/components/landing/AboutSection";
import Fetures from "@/components/landing/Fetures";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";

const Home = () => {
  return (
    <main>
      <Header />
      <Hero />
      <AboutSection />
      <Fetures />
      <Footer />
    </main>
  );
};

export default Home;
