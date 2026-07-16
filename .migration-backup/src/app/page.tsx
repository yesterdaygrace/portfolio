import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import GitHubActivity from "@/components/sections/GitHubActivity";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-black">
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Projects />
        <GitHubActivity />
        <Contact />
      </main>
    </>
  );
}
