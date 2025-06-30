import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpaceBackground, {
  ThemeToggle,
  useThemeAnimationToggle,
} from "space-background";
import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { Navbar } from "../components/Navbar";
import { ProjectsSection } from "../components/ProjectsSection";
import { SkillsSection } from "../components/SkillsSection";

export const Home = () => {
  const disableAnimation = useThemeAnimationToggle();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <ThemeToggle mobilePosition="absolute" desktopPosition="fixed" />
      <SpaceBackground
        visual={{
          disableAnimation: disableAnimation,
          mobilePosition: "absolute",
          desktopPosition: "fixed",
        }}
      />

      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};
