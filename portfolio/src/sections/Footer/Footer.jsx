import "./Footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-content">

          <div>
            <h3>Aman Kumar Jha</h3>

            <p>
              Frontend Developer building modern,
              responsive web experiences.
            </p>
          </div>


          <div className="footer-links">

            <a
              href="https://github.com/amanjha240695-ops"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/aman-jha-917401273"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>

          </div>

        </div>


        <div className="footer-bottom">

          <p>
            © 2026 Aman Kumar Jha. All rights reserved.
          </p>

          <p>
            Built with React + Vite
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;