import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import TechStack from '@/components/sections/TechStack';
import Projects from '@/components/sections/Projects';
import GitHubActivity from '@/components/sections/GitHubActivity';
import Contact from '@/components/sections/Contact';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

function App() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10 font-sans">
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

export default App;
