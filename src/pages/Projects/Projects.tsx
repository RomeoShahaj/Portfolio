import { useState } from "react";
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
    description: "A small SaaS web app that analyses bank statement for forgotten subscriptions, build without a framework, with the goal of learning stripe integrations, will be refactor using Next.js",
    imageUrl: tyraki,
    link: "https://tyraki.vercel.app/",
  }
]

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? projectData.length - 1: prev - 1
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === projectData.length - 1 ? 0 : prev + 1
    );
  }

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

          <div className="carousel-window">
            <div className="carousel-track" style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
            >
              {projectData.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
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
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
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
