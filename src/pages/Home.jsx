import Hero from "../sections/Hero";
import InfoSection from "../sections/InfoSection";
import Gallery from "../sections/Gallery";
import NewArrivals from "../sections/NewArrivals";
import RunningText from "../sections/RunningText";
import About from "../sections/About";
import Journey from "../sections/Journey";

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <InfoSection />
      <Gallery />
      <NewArrivals />
      <RunningText />
      <About />
      <Journey />
    </div>
  );
}