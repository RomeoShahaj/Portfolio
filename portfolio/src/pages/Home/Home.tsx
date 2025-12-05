import profileImg from "../../assets/images/profile-pic.svg"

export default function Home() {
  return (
    <section
  id="home"
  style={{
    height: "100vh",
    maxWidth: "800px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    justifyContent: "flex-start",
    paddingBottom: "150px",
  }}
>
  {/* Left: circular image */}
  <div
    style={{
      width: "180px",
      height: "180px",
      borderRadius: "50%",
      overflow: "hidden",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
      flexShrink: 0,
    }}
  >
    <img
      src={profileImg}
      alt="Portrait of Romeo Shahaj"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </div>

  {/* Right: text */}
  <div style={{ textAlign: "left" }}>
    <h1>
      Hello, i'm
      <br />
      <span style={{ color: "#7132CA", fontWeight: "bold" }}>Romeo</span> Shahaj
    </h1>
    <p>
      I am a{" "}
      <span style={{ color: "#7132CA", fontWeight: "bold" }}>
        Software Developer
      </span>{" "}
      passionate about building scalable web apps, databases & end-to-end
      solutions.
    </p>
  </div>
</section>

  );
}
