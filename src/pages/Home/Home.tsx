import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react"
import profileImg from "../../assets/images/prof.jpeg"
import cvFile from "../../assets/files/CV_Romeo_Shahaj_01.pdf"
import "./Home.css"

import { isValidElement } from "react" // Added MouseEvent, ReactElement, HTMLProps
import type { ReactNode, ReactElement, HTMLProps, MouseEvent } from "react"

const FONT_WEIGHTS = {
  subtitle: { min: 400, max: 1000, default: 400 },
  title: { min: 400, max: 900, default: 400 }
}

const renderText = (
  children: ReactNode,
  className?: string,
  baseWeight = 400
): ReactNode => {
  if (typeof children === "string") {
    return [...children].map((char, i) => (
      <span
        key={i}
        className={className}
        style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }

  
  if (isValidElement(children)) {
    
    const element = children as ReactElement<HTMLProps<HTMLElement>>;
    
   
    const childProps = element.props;
    
    return (
      <element.type {...childProps}>
        {renderText(childProps.children, className, baseWeight)}
      </element.type>
    );
  }

  if (Array.isArray(children)) {
    return children.map((child, i) => (
      <span key={i}>{renderText(child, className, baseWeight)}</span>
    ));
  }
  
  return children;
};

type FontType = keyof typeof FONT_WEIGHTS;

const setupTextHover = (container: HTMLElement | null, type: FontType) => {
  if (!container) return () => { };

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type]; 

  const animateLetter = (letter: Element, weight: number, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: 'power2.out',
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter: Element) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 20000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  }

  const handleMouseLeave = () =>
    letters.forEach((letter: Element) => animateLetter(letter, base, 0.5))

  container.addEventListener("mousemove", handleMouseMove as unknown as EventListener);
  container.addEventListener("mouseleave", handleMouseLeave as unknown as EventListener);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove as unknown as EventListener);
    container.removeEventListener("mouseleave", handleMouseLeave as unknown as EventListener);
  };

};


export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null); 
  const subtleRef = useRef<HTMLSpanElement>(null); 

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleaup = setupTextHover(subtleRef.current, "subtitle");

    return () => {
      subtitleCleaup();
      titleCleanup();
    }
  }, []);

  return (
    <section
      id="welcome"
      className="welcome-section"

    >
      {/* Left: circular image */}
      <div className="prof-pic"
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
          alt="Portrait"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Right: text */}
      <div style={{ textAlign: "left" }}>
        <h1 ref={titleRef}>
          {renderText(
            <>
              Hello, i'm
              <br />
              <span style={{ color: "#7132CA" }}>Romeo</span> Shahaj
            </>,
            "h1",
            400
          )}
        </h1>

        <p className="subText">
          I am a{" "}
          <span
            ref={subtleRef} // only this span gets the effect
            style={{ color: "#7132CA", fontWeight: "bold" }}
          >
            {renderText("Software Developer")}
          </span>{" "}
          passionate about building scalable <br /> web apps, databases & end-to-end
          solutions.
        </p>
        <a
          href={cvFile}
          target="_blank"
          rel="noopener noreferrer"
          className="cv-button" // Apply custom styling here
        >
          CV
        </a>

      </div>
    </section>

  );
}
