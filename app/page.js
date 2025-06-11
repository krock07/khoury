// import Image from "next/image";
import Footer from "@components/Footer";
import HeroSection from "@components/HeroSection";
import { TextParallaxContentExample } from "@components/KeySteps";
import ParticleRing from "@components/ParticalRingWrapper";
import RevealCards from "@components/RevealCards";
import { ScreenFitText } from "@components/ScreenFitText";
import StackedCardTestimonials from "@components/StackedCardTestimonials";
import { TabsFAQ } from "@components/TabsFAQ";
import TerminalContact from "@components/TerminalContact";
import Testimonials from "@components/Testimonials";
import TheProcess, {
  GridCards,
  HoverImageLinks,
  StickyCards,
} from "@components/GridCards";
import TrustedSection from "@components/TrustedBySection";
import styles from "./page.module.css";
import OppoScroll from "@components/GridCards";

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* <ParticleRing /> */}
      {/* <TrustedSection /> */}
      <RevealCards />
      <TextParallaxContentExample />
      <GridCards />
      <ScreenFitText />
      {/* <StackedCardTestimonials /> */}
      <TabsFAQ />
      <section id="contact">
        <TerminalContact />
      </section>

      <Footer />
    </main>
  );
}
