//import aboutBg from "../../assets/images/about-bg-01.jpg";
import './About.css'
export default function About() {
  return (
    <section
      id="about"
      style={{
        position: "relative",
        width: "100vw",         // full viewport width
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
    background: "linear-gradient(to bottom, #7132CA 100%, rgba(79, 0, 128, 0) 0%)",
    zIndex: -1,
  }}
/>

<div />

      {/* Content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: "2rem",
          color: "white",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            padding: "2rem",
            paddingTop: "8rem",
            borderRadius: "1rem",
          }}
        >
          <h1>About Me</h1>
          <p>
            I'm Romeo, a software developer focused on building scalable web apps,
            clean code, and great user experiences.
          </p>
          
        </div>
      </div>
      <div className="about-wave-top">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
          </svg>
      </div>   
      <div className="about-wave-bot">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
        </svg>
      </div> 
</section>
  );
}
