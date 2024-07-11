import Navbar from "@/components/navbar/navbar.jsx";
import HeroSection from "@/components/homepage/hero-section/hero-section.jsx";
import HomepageSecondSection from "@/components/homepage/second-section/second-section-container.jsx";
import HomepageThirdSection from "@/components/homepage/third-section/third-section-container.jsx";
import HomepageFourthSection from "@/components/homepage/fourth-section/fourth-section-container.jsx";
import CommonBottomSection from "@/components/bottom-section/common-bottom-section.jsx";
import CommonFooter from "@/components/footer/common-footer.jsx";

function Homepage() {
  return (
    <>
      <div className="w-full h-[760px] bg-blue-100 relative overflow-hidden">
        <div className="w-full relative z-10">
          <Navbar />
        </div>
        <HeroSection />
      </div>
      <main>
        <HomepageSecondSection />
        <HomepageThirdSection />
        <HomepageFourthSection />
        <CommonBottomSection />
      </main>
      <footer>
        <CommonFooter />
      </footer>
    </>
  );
}

export default Homepage;
