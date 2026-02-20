import { useState, useRef } from "react";
import "./Projects.css"
import kep from "../../assets/images/projects/tab.webp"
import stockFinder from "../../assets/images/projects/fint.webp"
import tyraki from "../../assets/images/projects/tyraki.png"
import waveSVG from "../../assets/images/projects/layered-waves-haikei.svg";
import waveSVGbot from "../../assets/images/projects/layered-waves-haikei-1.svg";



const projectData = [
  
  {
    title: "Stock Portfolio",
    description: "A personal stock portfolio tracking application built using .NET and React and PostgreSQL. A live demo is available.",
    imageUrl: stockFinder,
    link: "https://stocksfinder.vercel.app/"
  },
  {
    title: "E-queuing solution",
    description: "Designed and implemented an electronic queue management system using Python Flask and React.js. Collaborated with another software engineer to develop both the frontend and backend for the government program 'Modernization of Civil Service Centers' on the island of Ithaca. We had full autonomy in selecting and implementing the technology stack and explored methods for communicating with a thermal printer. This project enhanced my ability to plan and execute a full-cycle software solution in a high-responsibility environment.",
    imageUrl: kep,
  },
  {
    title: "Tyraki",
    description: "A small SaaS web app that analyses bank statement for forgotten subscriptions, build without a framework, with the goal of learning stripe integrations, will be refactor using React.js",
    imageUrl: tyraki,
    link: "https://tyraki.vercel.app/",
  }
]

// Extended slides: [clone of last, ...real slides, clone of first]
// trackIndex 0 = clone of last, 1..N = real slides, N+1 = clone of first
const extendedSlides = [
  projectData[projectData.length - 1],
  ...projectData,
  projectData[0],
];

export default function Projects() {
  const slideCount = projectData.length;
  const [trackIndex, setTrackIndex] = useState(1); // 1 = first real slide
  const dragStartX = useRef(0);
  const dragOffset = useRef(0);
  const isDragging = useRef(false);
  const wasDragged = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isSnapping = useRef(false);

  // Real index for dots (0-based into projectData)
  const realIndex =
    trackIndex === 0 ? slideCount - 1
    : trackIndex === slideCount + 1 ? 0
    : trackIndex - 1;

  const goTo = (idx: number) => {
    if (isSnapping.current) return;
    setTrackIndex(idx);
  };

  const prevSlide = () => goTo(trackIndex - 1);
  const nextSlide = () => goTo(trackIndex + 1);

  const handleTransitionEnd = () => {
    if (trackIndex === 0) {
      isSnapping.current = true;
      if (trackRef.current) trackRef.current.style.transition = "none";
      setTrackIndex(slideCount);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (trackRef.current) trackRef.current.style.transition = "";
          isSnapping.current = false;
        });
      });
    } else if (trackIndex === slideCount + 1) {
      isSnapping.current = true;
      if (trackRef.current) trackRef.current.style.transition = "none";
      setTrackIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (trackRef.current) trackRef.current.style.transition = "";
          isSnapping.current = false;
        });
      });
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (isSnapping.current) return;
    isDragging.current = true;
    wasDragged.current = false;
    dragStartX.current = e.clientX;
    dragOffset.current = 0;
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    dragOffset.current = e.clientX - dragStartX.current;
    if (Math.abs(dragOffset.current) > 5) {
      wasDragged.current = true;
    }
    if (trackRef.current) {
      const base = -(trackIndex * 100);
      const container = trackRef.current.parentElement!;
      const pxToPercent = (dragOffset.current / container.clientWidth) * 100;
      trackRef.current.style.transform = `translateX(${base + pxToPercent}%)`;
    }
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.style.transition = "";
    }
    const threshold = 50;
    if (dragOffset.current < -threshold) {
      nextSlide();
    } else if (dragOffset.current > threshold) {
      prevSlide();
    } else if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${trackIndex * 100}%)`;
    }
    dragOffset.current = 0;
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (wasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
      wasDragged.current = false;
    }
  };

  return (
    <section id="projects" className="projects-section">
    <div className="wave-wrapper">
      <img src={waveSVG} alt="wave" className="wave-transition" />
    </div>
    <div className="page-content">
        <h1 className="page-heading">Projects</h1>

        <div className="carousel">
          <button className="nav left" onClick={prevSlide}>
            &#10094;
          </button>

          <div
            className="carousel-window"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            onPointerCancel={onPointerUp}
            onClickCapture={onClickCapture}
          >
            <div
              className="carousel-track"
              ref={trackRef}
              style={{
                transform: `translateX(-${trackIndex * 100}%)`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedSlides.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      draggable={false}
                    >
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        loading="lazy"
                        draggable={false}
                      />
                    </a>
                  ) : (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      draggable={false}
                    />
                  )}
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          </div>

          <button className="nav right" onClick={nextSlide}>
            &#10095;
          </button>
        </div>

        <div className="carousel-dots">
          {projectData.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === realIndex ? "active" : ""}`}
              onClick={() => setTrackIndex(index + 1)}
            ></span>
          ))}
        </div>
      </div>

    <div className="wave-wrapper-bot">
      <img src={waveSVGbot} alt="wave" className="wave-transition-bot" />
    </div>

    </section>
  );
}
