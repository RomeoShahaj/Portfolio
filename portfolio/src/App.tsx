import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [isMobile, setIsMobile] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

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

  // Measure width of items for desktop collapsed width
  useEffect(() => {
    if (!isMobile && contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, [collapsed, isMobile]);

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
    //setActiveItem(id);
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* MOBILE HAMBURGER BUTTON */}
      {isMobile && !mobileSidebarOpen && (
        <button
          onClick={() => setMobileSidebarOpen(true)}
          style={{
            position: "fixed",
            right: "1rem",
            left: "auto",
            zIndex: 9999,
            padding: "0.5rem 1rem",
            fontSize: "1.5rem",
            background: "transparent",
            border: "none"
          }}
        >
          ☰
        </button>
      )}

      {/* Main content */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          overflowY: "auto",
          padding: "2rem",
        }}
      >
        <section
  id="home"
  style={{
    height: "100vh",
    paddingTop: "4rem",
    textAlign: "left",        // ensures lines start at the same point
    maxWidth: "600px",        // optional: keeps lines from stretching too wide
    margin: "0 auto"          // centers the whole block while text stays left-aligned
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

      {/* SIDEBAR (desktop or mobile overlay) */}
      <div
         className={`sidebar ${isMobile ? "mobile" : "desktop"} ${
          collapsed ? "collapsed" : "expanded"
          } ${mobileSidebarOpen ? "open" : ""}`}
      >

        <div ref={contentRef} style={{ display: "inline-block", color:"white"}}>
          {!collapsed && !isMobile && <h2>Where To?</h2>}

          <ul className="sidebar-menu"
          >
            <li className={activeItem === "home" ? "active" : ""} onClick={() => handleClick("home")}>Home</li>
            <li className={activeItem === "about" ? "active" : ""} onClick={() => handleClick("about")}>About</li>
            <li className={activeItem === "skills" ? "active" : ""} onClick={() => handleClick("skills")}>Skills</li>
            <li className={activeItem === "projects" ? "active" : ""} onClick={() => handleClick("projects")}>Projects</li>
            <li className={activeItem === "contact" ? "active" : ""} onClick={() => handleClick("contact")}>Contact</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
