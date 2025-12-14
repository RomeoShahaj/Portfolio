import { useState, useEffect } from "react";
import useActiveSection from "./hooks/useActiveSection";
import Sidebar from "./components/Sidebar/Sidebar";
import Selection from "./components/Section/Section";
import { Home, About, Skills, Projects, Contact} from "./pages"
import "./App.css";

function App() {
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const activeItem = useActiveSection(["home","about","skills","projects","contact"])

  
  // Detect screen size
  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true); // always collapsed on mobile
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);


  // Desktop only: auto collapse when scroll passes home
  useEffect(() => {
    if (isMobile) return; // skip for mobile

    const homeSection = document.getElementById("home");
    if (!homeSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting;
        setCollapsed(!isVisible);
      },
      { threshold: 0.3 }
    );

    observer.observe(homeSection);
    return () => observer.disconnect();
  }, [isMobile]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    // Mobile: close menu after click
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  };

  const handleClick = (id: string) => {
    scrollToSection(id);
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
        <About />
        <Selection id="skills">
          <Skills />
        </Selection>
        <Projects />
        <Contact />
        
      </div>
    </div>
  );
}

export default App;
