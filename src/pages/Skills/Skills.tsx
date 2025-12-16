import "./Skills.css"
import dotnetLogo from "../../assets/images/skills/dotnet.png"
import reactLogo from "../../assets/images/skills/react.png"
import sqlLogo from "../../assets/images/skills/sql.png"
import gitLogo from "../../assets/images/skills/git.png"
import azureLogo from "../../assets/images/skills/azure.png"
import pythonLogo from "../../assets/images/skills/python.png"
import rustLogo from "../../assets/images/skills/rustLogo.png"
import typescriptLogo from "../../assets/images/skills/typescriptlogo.png"
import tailwindLogo from "../../assets/images/skills/tailwindlogo.png"
import postgreSqlLogo from "../../assets/images/skills/postgreLogo.png"

export default function Skills() {
  return (
    <div className="page-content">
      <h1 className="page-heading">Skills</h1>
      <div>
        <div className="core-stack">
          <p>
            Technologies that I have worked with professionally.
          </p>
          <div className="icon-container">
            <div className="skill-pill">
              <img src={dotnetLogo} alt=".NET" />
            </div>
             <div className="skill-pill">
              <img src={reactLogo} alt="React" />
            </div>
             <div className="skill-pill">
              <img src={pythonLogo} alt="Python" />
            </div>
            <div className="skill-pill">
              <img src={sqlLogo} alt="SQL Server" />
            </div>
            <div className="skill-pill">
              <img src={gitLogo} alt="Git" />
            </div>
            <div className="skill-pill">
              <img src={azureLogo} alt="Azure-pipeline" />
            </div>
          </div>
        </div>
        <div className="pers-stack">
          <p>
            Technologies i have worked with privately.
          </p>
          <div className="icon-container">
            <div className="skill-pill">
              <img src={rustLogo} alt="Rust" />
            </div>
            <div className="skill-pill">
              <img src={typescriptLogo} alt="Typescript" />
            </div>
            <div className="skill-pill">
              <img src={postgreSqlLogo} alt="Postgre" />
            </div>
            <div className="skill-pill">
              <img src={tailwindLogo} alt="Tailwind" />
            </div>
          </div>
        </div>
        {/*
        <div className="soft-skills">
          <p>
            Soft skills
          </p>
          <div className="icon-container">
          </div>
        </div>
        */
        }
      </div>
    </div>
  );
}
