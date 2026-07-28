import "./Education.css";
import { FaGraduationCap, FaCalendarAlt } from "react-icons/fa";

const Education = () => {
  return (
    <section className="education section" id="education">
      <div className="container">

        <div className="section-heading">
          <span className="section-tag">Education</span>

          <h2>
            Academic <span>Background</span>
          </h2>

          <p>
            My academic journey has provided a strong foundation in computer
            science while allowing me to enhance my practical skills through
            real-world web development projects.
          </p>
        </div>

        <article className="education-card">

          <div className="education-icon">
            <FaGraduationCap />
          </div>

          <div className="education-content">

            <h3>Bachelor of Computer Applications (BCA)</h3>

            <h4>
              JB Knowledge Park • Maharshi Dayanand University (MDU)
            </h4>

            <div className="education-info">
              <span>
                <FaCalendarAlt />
                2024 – 2027
              </span>

              <span className="status">
                Pursuing
              </span>
            </div>

            <p>
              Currently pursuing my Bachelor's degree while building modern,
              responsive web applications and strengthening my frontend
              development skills through hands-on projects.
            </p>

          </div>

        </article>

      </div>
    </section>
  );
};

export default Education;