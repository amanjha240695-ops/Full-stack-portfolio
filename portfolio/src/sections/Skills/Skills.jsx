import "./Skills.css";
import skillsData from "../../data/skills";

const Skills = () => {
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Skills</span>

          <h2 className="section-title">
            Technologies I use to build modern web applications.
          </h2>

          <p className="section-description">
            My primary focus is frontend development, where I enjoy building
            responsive, accessible, and user-friendly web applications. Alongside
            that, I'm continuously learning backend development and UI/UX design
            to broaden my skill set and become a more versatile developer.
          </p>
        </div>

        <div className="skills-grid">
          {skillsData.map((category) => (
            <div className="skills-card" key={category.title}>
              <h3 className="skills-card-title">{category.title}</h3>

              <div className="skills-list">
                {category.skills.map((skill) => (
                  <span className="skill-chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;