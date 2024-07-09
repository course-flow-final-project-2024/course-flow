import Navbar from "@/components/navbar.jsx";
import HeroSection from "./homepage/heroSection";

function Homepage() {
  return (
    <>
      <header className="w-full h-screen bg-blue-100 relative overflow-hidden">
        <Navbar />
        <HeroSection />
      </header>
      <main></main>
    </>
  );
}

export default Homepage;
