import Navbar from "@/components/navbar.jsx";
import HeroSection from "./homepage/hero-section/hero-section.jsx";
import HomepageSecondSection from "./homepage/second-section/second-section-container";
import HomepageThirdSection from "./homepage/third-section/third-section-container.jsx";
import HomepageFourthSection from "./homepage/fourth-section/fourth-section-container.jsx";

function Homepage() {
  return (
    <>
      <div className="w-full h-[760px] bg-blue-100 relative overflow-hidden">
        <Navbar />
        <HeroSection />
      </div>
      <main>
        <HomepageSecondSection />
        <HomepageThirdSection />
        <HomepageFourthSection />
      </main>
    </>
  );
}

export default Homepage;
