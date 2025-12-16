import "./Contact.css"
import { useEffect, useRef } from "react";
import { FaLinkedin, FaGithub} from "react-icons/fa"
import KUTE from "kute.js";


export default function Contact() {
const blob1Ref = useRef<SVGPathElement>(null);
  const blob2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (blob1Ref.current && blob2Ref.current) {
      const tween = KUTE.fromTo(
        blob1Ref.current,
        { path: blob1Ref.current },
        { path: blob2Ref.current },
        { repeat: 999, duration: 3000, yoyo: true }
      );
      tween.start();
    }
  }, []);

  return (
    <section className="contact" >
    <div className="page-content">
      <h1 className="page-heading">Contact</h1>

      <p>
        Feel free to reach out for collaboration, opportunities, or just to
        say hello.
      </p>

      <div className="contact-links">
        <a href="mailto:shahajromeo@gmail.com" aria-label="Email">
            <span className="contact-text"> Email: shahajromeo@gmail.com</span>
          </a>

        <a
            href="https://www.linkedin.com/in/romeo-shahaj-018665304/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/RomeoShahaj"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
      </div>
    </div>
    
      <svg id="visual" className="blob-background" viewBox="0 0 900 1200" width="900" height="1200" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1">
      <g transform="translate(418.18817001992676 324.39216103222975)">
      <path id="blob1" ref={blob1Ref} d="M120.7 -113.2C170.7 -70.7 235.4 -35.4 246.9 11.5C258.5 58.5 216.9 116.9 166.9 146.4C116.9 175.9 58.5 176.5 10.1 166.3C-38.2 156.2 -76.4 135.4 -109 105.9C-141.7 76.4 -168.9 38.2 -179.9 -11.1C-191 -60.3 -186 -120.7 -153.3 -163.2C-120.7 -205.7 -60.3 -230.3 -12.5 -217.8C35.4 -205.4 70.7 -155.7 120.7 -113.2" 
      fill="#7132CA">
        </path></g>
        <g transform="translate(450.20300890728146 255.39815707816905)">
        <path id="blob2" ref={blob2Ref} d="M101.4 -98.5C132 -70.7 158 -35.4 160.5 2.5C163 40.3 141.9 80.6 111.3 130.6C80.6 180.6 40.3 240.3 -3.3 243.6C-46.9 246.9 -93.8 193.8 -122.3 143.8C-150.8 93.8 -160.9 46.9 -161.1 -0.2C-161.4 -47.4 -151.8 -94.8 -123.3 -122.6C-94.8 -150.4 -47.4 -158.7 -6 -152.7C35.4 -146.7 70.7 -126.4 101.4 -98.5" 
        fill="#BB004B" style={{visibility:"hidden"}}></path></g>
      </svg>

    </section>
  );
}
