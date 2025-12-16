import './About.css'
//import UniWALogo from "../../assets/images/timeline/UniWA.png"
//import Qubi from "../../assets/images/timeline/Qubi.png"
//import Kep from "../../assets/images/timeline/kep.png"
//import Isec from "../../assets/images/timeline/isec.png"
//import Thesis from "../../assets/images/timeline/thesis.png"
//import Grad from "../../assets/images/timeline/grad.png"

import {useEffect} from "react"

export default function About() {
  
useEffect(() => {
  const bar = document.querySelector(".timeline_progress-bar") as HTMLElement;
  const section = document.getElementById("about");

  if (!bar || !section) return;

  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const start = windowHeight * 0.2;
    const end = rect.height - windowHeight * 0.3;

    const progress = Math.min(
      Math.max((start - rect.top) / end, 0),
      1
    );

    bar.style.height = `${progress * 100}%`;
    bar.style.opacity = progress > 0 ? "1" : "0";
  };

  window.addEventListener("scroll", onScroll);
  onScroll();

  return () => window.removeEventListener("scroll", onScroll);
}, []);


  return (
    <section
      id="about"
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        margin: 0,
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, #402466 100%, rgba(79, 0, 128, 0) 0%)",
          zIndex: -1,
        }}
      />

      {/* Main content wrapper */}
      <div className="about-content-wrapper">
        {/* EXTRA RIGHT-SIDE BOX */}
        <div className="section-timeline">
          <div className="container">
            <div className="timeline_component">
              <div className="timeline_progress">
                <div className="timeline_progress-bar"> </div>
              </div>
                <div className="timeline_item">
                  <div className="timeline_left">
                    <div className="timeline_date-text">September 2019</div>
                  </div>
                  <div className="timeline_centre">
                    <div className="timeline_circle"></div>
                  </div>
                  <div className="timeline_right">
                    <div className="margin-bottom-xlarge">
                      <div className="timeline_text">
                        Entered University of West Attica in the department of
                        Informatics and Computer Engineering.
                      </div>
                    </div>
                    
                </div>
                </div>
                <div className="timeline_item">
                <div className="timeline_left">
                  <div className="timeline_date-text">May 2023</div>
                </div>
                <div className="timeline_centre">
                    <div className="timeline_circle"></div>
                </div>
                <div className="timeline_right">
                      <div className="margin-bottom-xlarge">
                        <div className="timeline_text">
                          Joined Qubiteq as a Junior Full-Stack Developer, 
                          working on projects using .NET Core, Javascript, and SQL Server.
                        </div>
                      </div>
                      
                  </div>
              </div>
            <div className="timeline_item">
              <div className="timeline_left">
                <div className="timeline_date-text">January 2024</div>
              </div>
              <div className="timeline_centre">
                  <div className="timeline_circle"></div>
              </div>
              <div className="timeline_right">
                    <div className="margin-bottom-xlarge">
                      <div className="timeline_text">
                       Completed an end-to-end solution for a goverment service 
                        as a contract developer. 
                      </div>
                    </div>
                    
                </div>
            </div>
            <div className="timeline_item">
              <div className="timeline_left">
                <div className="timeline_date-text">August 2024</div>
              </div>
              <div className="timeline_centre">
                  <div className="timeline_circle"></div>
              </div>
              <div className="timeline_right">
                    <div className="margin-bottom-xlarge">
                      <div className="timeline_text">
                      I participated in an Erasmus exchange semester in Coimbra, Portugal, 
                      gaining academic experience while immersing myself in a new culture 
                       and way of life.                      </div>
                    </div>
                    
                </div>
            </div>
            <div className="timeline_item">
              <div className="timeline_left">
                <div className="timeline_date-text">January 2025</div>
              </div>
              <div className="timeline_centre">
                  <div className="timeline_circle"></div>
              </div>
              <div className="timeline_right">
                    <div className="margin-bottom-xlarge">
                      <div className="timeline_text">
                       Returned and started my thesis on training an LLM as a legal tool
                       on the Greek legal code(<a href="https://polynoe.lib.uniwa.gr/xmlui/handle/11400/10824"
                       target="_blank" rel="noopener noreferrer"
                       >Read my thesis here
                       </a>). 
                      </div>
                    </div>
                    
                </div>
            </div>
            <div className="timeline_item">
              <div className="timeline_left">
                <div className="timeline_date-text">October 2025</div>
              </div>
              <div className="timeline_centre">
                  <div className="timeline_circle"></div>
              </div>
              <div className="timeline_right">
                    <div className="margin-bottom-xlarge">
                      <div className="timeline_text">
                        Successfully completed my thesis and graduated, 
                        I’m now ready to take the next step by pursuing 
                        career opportunities in my field.
                      </div>
                    </div>
                    {/*<div className="timeline_image-wrapper">
                      <img src={Grad} loading="lazy" alt="Qubi"/>
                    </div>
                    */}
                </div>
            </div>
          </div>
            <div className="overlay-fade-top"></div>
            <div className="overlay-fade-bot"></div>
          </div>
        </div>
        

        {/* ABOUT TEXT */}
        <div className="about-text">
          <h1>About Me</h1>
          <p>
            I am a 24 year old aspiring full-stack developer, currently based in Athens,
            Greece. I have always been curious and fascinated by puzzles, which led me to
            the path of studying software engineering. I graduated in October 2025, while studying i
            gained professional experience working in a software company in Athens.
            I am currently looking to continue my professional journey in Norway, and hope
            to be a valuable asset to future employers.
          </p>
        </div>

        
      </div>

      {/* Waves */}
      <div className="about-wave-top">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
      </div>

      <div className="about-wave-bot">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
      </div>

    </section>
  );
}
