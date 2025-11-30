import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

function App() {
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [isMobile, setIsMobile] = useState(false);

  
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

  // useEffect for activeitem change of sidebar
  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "projects", "contact"];
    const observers: IntersectionObserver[] =[];

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return ;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setActiveItem(id);
          }
        },{
          threshold: 0.5,
        }
      );
      observer.observe(section);
      observers.push(observer);
    });
    return() => {
      observers.forEach((obs) => obs.disconnect());
    };
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

  const handleItemClick = (id: string) => {
    scrollToSection(id);
    setActiveItem(id);
  }


  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar 
        collapsed={collapsed}
        isMobile={isMobile}
        mobileSidebarOpen={mobileSidebarOpen}
        activeItem={activeItem}
        onItemClick={handleItemClick}
        toggleMobileSidebar={() => 
        setMobileSidebarOpen(!mobileSidebarOpen)}
        />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          overflowY: "auto",
          padding: "2rem",
          position: "relative"
        }}
      >
        {isMobile && (
          <button
            className="hamburger"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            aria-label={mobileSidebarOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileSidebarOpen}
            >
              <span />
              <span />
              <span />
            </button>
        )}
        <section
          id="home"
          style={{
            height: "100vh",
            paddingTop: "4rem",
            textAlign: "left",        
            maxWidth: "600px",        
            margin: "0 auto"          
          }}
        >
            <h1>Hello, i'm <br /><span style={{ color: "#7132CA", fontWeight: "bold" }}>Romeo</span> Shahaj</h1>
            <p>
              I am a <span style={{ color: "#7132CA", fontWeight: "bold" }}>Software Developer</span> Passionate About Building Scalable Web Apps,
              Databases & End-to-End Solutions.
            </p>
          </section>
        <section id="about" style={{ height: "100vh", paddingTop: "4rem" }}>
          <h1>About me</h1>
        </section>

        <section id="skills" style={{ height: "100vh", paddingTop: "4rem" }}>
          <h1>Skills</h1>
        </section>

        <section id="projects" style={{ height: "100vh", paddingTop: "4rem" }}>
          <h1>Projects</h1>
        </section>

        <section id="contact" style={{ height: "100vh", paddingTop: "4rem" }}>
          <h1>Contact</h1>
        </section>
      </div>
      </div>
  );
}

export default App;
