import { useState, useEffect } from "react";
import useActiveSection from "./hooks/useActiveSection";
import Sidebar from "./components/Sidebar/Sidebar";
import Selection from "./components/Section/Section";
import { debounce } from "./utils/debounce";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Skills from "./pages/Skills/Skills";
import Projects from "./pages/Projects/Projects";
import Contact from "./pages/Contact/Contact";
import "./App.css";

function App() {
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [activeItem, setActiveItem, setManualOverrideId] = useActiveSection(
    ["home","about","skills","projects","contact"]
  ); 
  
  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true); // always collapsed on mobile
      }
    };

    // Debounce resize handler - only run after 150ms of no resize events
    const debouncedUpdate = debounce(update, 150);

    update(); // Run immediately on mount
    window.addEventListener("resize", debouncedUpdate);

    return () => {
      debouncedUpdate.cancel();
      window.removeEventListener("resize", debouncedUpdate);
    };
  }, []);


  useEffect(() => {
    if (isMobile) return; 

    const homeSection = document.getElementById("home");
    if (!homeSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting;
        setCollapsed(!isVisible);
      },
      { threshold: 0.2 }
    );

    observer.observe(homeSection);
    return () => observer.disconnect();
  }, [isMobile]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setManualOverrideId(id);
    setTimeout(() => {
        setManualOverrideId(null); 
    }, 800); 

    
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  };

  const handleClick = (id: string) => {
    scrollToSection(id);
    
    setActiveItem(id); 
    if (isMobile) setMobileSidebarOpen(false);
  }


    return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        isMobile={isMobile}
        mobileSidebarOpen={mobileSidebarOpen}
        activeItem={activeItem}
        onItemClick={handleClick}
        toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0, overflowY: "auto", position: "relative" }}>
        <Selection id="home">
          <Home />
        </Selection>
        <Selection id="projects">
          <Projects />
        </Selection>
        <Selection id="skills">
          <Skills />
        </Selection>
        <Selection id="about">
          <About />
        </Selection>
        
        <Selection id="contact">
          <Contact />
        </Selection>
      </div>
    </div>
  );
}

export default App;
