import "./ProjectCard.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={project.image} alt={project.title} />

        {project.featured && (
          <span className="featured-badge">Featured</span>
        )}
      </div>

      <div className="project-content">
        <h3>{project.title}</h3>

        <p>{project.description}</p>

        <div className="tech-stack">
          {project.tech.map((item) => (
            <span key={item} className="tech-chip">
              {item}
            </span>
          ))}
        </div>

        <div className="project-buttons">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <FaExternalLinkAlt />
            Live Demo
          </a>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <FaGithub />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;