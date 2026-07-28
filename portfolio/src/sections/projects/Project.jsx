import "./Project.css";
import projectsData from "../../data/projects";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const Projects = () => {
  return (
    <section className="projects section" id="projects">
      <div className="container">

        <div className="section-header">
          <span className="section-tag">Projects</span>

          <h2 className="section-title">
            Some of my recent work.
          </h2>

          <p className="section-description">
            Here are some of the projects I've built while learning and
            improving my frontend development skills. Each project reflects my
            focus on responsive design, clean code, and creating intuitive user
            experiences.
          </p>
        </div>

        <div className="projects-grid">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;