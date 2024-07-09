import Navbar from "@/components/navbar.jsx";
import HeroSection from "./homepage/hero-section/hero-section.jsx";
import HomepageSecondSection from "./homepage/second-section/second-section-container";

function Homepage() {
  return (
    <>
      <div className="w-full h-[760px] bg-blue-100 relative overflow-hidden">
        <Navbar />
        <HeroSection />
      </div>
      <main>
        <HomepageSecondSection />
      </main>
    </>
  );
}

export default Homepage;
