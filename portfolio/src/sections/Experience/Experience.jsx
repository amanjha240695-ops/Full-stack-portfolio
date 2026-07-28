import "./Experience.css";
import {
  FaCode,
  FaLaptopCode,
  FaTools,
  FaBriefcase,
} from "react-icons/fa";

const Experience = () => {
  return (
    <section className="experience section" id="experience">
      <div className="container">

        <div className="section-heading">
          <span className="section-tag">Experience</span>

          <h2>
            Building Skills Through <span>Real Projects</span>
          </h2>

          <p>
            As a fresher, I have developed practical frontend skills by building
            real-world projects, solving development challenges, and creating
            responsive user interfaces.
          </p>
        </div>

        <div className="experience-grid">

          <article className="experience-card">
            <div className="experience-icon">
              <FaCode />
            </div>

            <h3>Frontend Development Journey</h3>

            <p>
              Started my web development journey by learning HTML, CSS,
              JavaScript, and React. Focused on building responsive, modern,
              and user-friendly web applications.
            </p>
          </article>

          <article className="experience-card">
            <div className="experience-icon">
              <FaLaptopCode />
            </div>

            <h3>Personal Projects</h3>

            <p>
              Built multiple frontend and full-stack projects that strengthened
              my problem-solving skills, component architecture, responsive
              design, and clean coding practices.
            </p>
          </article>

          <article className="experience-card">
            <div className="experience-icon">
              <FaTools />
            </div>

            <h3>Hands-on Development</h3>

            <p>
              Experienced in creating reusable React components, integrating
              REST APIs, using Git & GitHub, debugging applications, and
              optimizing responsive user interfaces.
            </p>
          </article>

          <article className="experience-card">
            <div className="experience-icon">
              <FaBriefcase />
            </div>

            <h3>Open for Opportunities</h3>

            <p>
              Currently looking for a Frontend Developer Internship or
              entry-level Frontend Developer role where I can contribute,
              collaborate, and continue growing as a developer.
            </p>
          </article>

        </div>

      </div>
    </section>
  );
};

export default Experience;