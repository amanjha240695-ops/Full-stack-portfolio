import "./Contact.css";

import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section className="contact section" id="contact">
      <div className="container">

        <div className="section-heading">
          <span className="section-tag">Contact</span>

          <h2>
            Let's Build Something <span>Together</span>
          </h2>

          <p>
            I am currently looking for frontend development opportunities.
            Feel free to connect with me for internships, projects, or
            collaborations.
          </p>
        </div>


        <div className="contact-grid">

          <a
            href="mailto:jha493815@gmail.com"
            className="contact-card"
          >
            <div className="contact-icon">
              <FaEnvelope />
            </div>

            <div>
              <h3>Email</h3>
              <p>jha493815@gmail.com</p>
            </div>

            <FaExternalLinkAlt />
          </a>


          <a
            href="https://www.linkedin.com/in/aman-jha-917401273"
            target="_blank"
            rel="noreferrer"
            className="contact-card"
          >
            <div className="contact-icon">
              <FaLinkedin />
            </div>

            <div>
              <h3>LinkedIn</h3>
              <p>Aman Jha</p>
            </div>

            <FaExternalLinkAlt />
          </a>


          <a
            href="https://github.com/amanjha240695-ops"
            target="_blank"
            rel="noreferrer"
            className="contact-card"
          >
            <div className="contact-icon">
              <FaGithub />
            </div>

            <div>
              <h3>GitHub</h3>
              <p>View My Projects</p>
            </div>

            <FaExternalLinkAlt />
          </a>


          <div className="contact-card">
            <div className="contact-icon">
              <FaMapMarkerAlt />
            </div>

            <div>
              <h3>Location</h3>
              <p>New Delhi, India</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;