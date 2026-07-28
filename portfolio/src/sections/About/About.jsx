import "./About.css";
import { FaLaptopCode, FaCode, FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";

const About = () => {
  return (
    <section className="about section" id="about">
      <div className="container">

        <div className="section-header">
          <span className="section-tag">About Me</span>

          <h2 className="section-title">
            Building clean, responsive and modern web experiences.
          </h2>

          <p className="section-description">
            I'm <strong>Aman Kumar Jha</strong>,a Frontend Developer passionate about building clean, responsive, and user-friendly web applications. I enjoy transforming ideas into modern, interactive interfaces using React, JavaScript, HTML, and CSS, with a strong focus on performance, accessibility, and user experience.
Alongside frontend development, I'm currently learning UI/UX design to create more intuitive and visually appealing digital experiences. I'm also expanding my knowledge of backend development with Node.js, Express.js, and MongoDB to better understand the complete web development process and become a more versatile developer.
I'm actively seeking a Frontend Developer Internship where I can contribute, collaborate with experienced developers, and continue growing by building real-world products.

          </p>
        </div>

        <div className="about-grid">

          <div className="about-card">
            <FaLaptopCode className="about-icon" />

            <h3>Frontend Development</h3>

            <p>
              Building responsive, accessible and high-performance websites
              using modern frontend technologies.
            </p>
          </div>

          <div className="about-card">
            <FaCode className="about-icon" />

            <h3>Projects</h3>

            <p>
              Developed multiple frontend projects with React, JavaScript,
              APIs and responsive UI design.
            </p>
          </div>

          <div className="about-card">
            <FaGraduationCap className="about-icon" />

            <h3>Learning</h3>

            <p>
              Continuously improving my skills by building real-world projects
              and exploring modern frontend practices.
            </p>
          </div>

          <div className="about-card">
            <FaMapMarkerAlt className="about-icon" />

            <h3>Location</h3>

            <p>
              India • Available for Remote & On-site Frontend Internship
              opportunities.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;