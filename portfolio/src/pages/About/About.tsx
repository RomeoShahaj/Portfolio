//import aboutBg from "../../assets/images/about-bg-01.jpg";

export default function About() {
  return (
    <section
      id="about"
      style={{
        position: "relative",
        width: "100vw",         // full viewport width
        minHeight: "100vh",
        overflow: "hidden",
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
            backdropFilter: "blur(6px)",
            background: "rgba(0,0,0,0.3)",
            padding: "2rem",
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
    </section>
  );
}
