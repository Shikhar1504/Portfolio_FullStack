import axios from "axios";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const ProjectsSection = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "https://portfolio-backend-gs79.onrender.com/api/v1/project/getall",
        { withCredentials: true }
      );
      //   setProjects(data.projects);
      setProjects([...data.projects].reverse());
    };
    getMyProjects();
  }, []);
  const getTrimmedDescription = (desc) => {
    if (!desc) return "";
    const words = desc.split(" ");
    return words.slice(0, 10).join(" ") + (words.length > 10 ? "..." : "");
  };
  const [user, setUser] = useState({});
  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "https://portfolio-backend-gs79.onrender.com/api/v1/user/me/portfolio",
        { withCredentials: true }
      );
      setUser(data.user);
    };
    getMyProfile();
  }, []);

  const displayedProjects = viewAll ? projects : projects.slice(0, 6);

  const sectionRef = useRef(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative px-6 py-35 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-center md:text-5xl"
        >
          <span className="inline-block pb-2">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              Projects
            </span>
          </span>
        </motion.h2>
        <p className="max-w-3xl mx-auto mb-20 text-center text-muted-foreground">
          Explore a curated collection of my recent work – crafted with
          precision and passion.
        </p>

        {/* <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"> */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayedProjects.map((project) => (
            <div
              key={project._id}
              className="overflow-hidden transition-transform shadow-md bg-card rounded-xl hover:-translate-y-1 hover:shadow-xl"
            >
              <Link to={`/project/${project._id}`}>
                <div className="overflow-hidden h-52">
                  <img
                    src={project.projectBanner?.url}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </Link>
              <div className="flex flex-col gap-3 p-5">
                <div className="flex flex-wrap gap-2">
                  {(project.technologies || "").split(", ").map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {getTrimmedDescription(project.description)}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-4">
                    {project.projectLink && (
                      <a
                        href={project.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition text-foreground/80 hover:text-primary"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.gitRepoLink && (
                      <a
                        href={project.gitRepoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition text-foreground/80 hover:text-primary"
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewAll(!viewAll)}
            className="inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-semibold text-white transition-all duration-300 rounded-lg cursor-pointer bg-primary hover:bg-primary/90 hover:shadow-md focus:outline-none"
          >
            {viewAll ? "Show Less" : "View All Projects"}
          </motion.button>
        </div>

        {user.githubURL && (
          <div className="mt-12 text-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={user.githubURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium transition-all duration-300 border rounded-lg border-primary text-primary hover:bg-primary hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Check My GitHub <ArrowRight size={16} />
            </motion.a>
          </div>
        )}
      </div>
    </section>
  );
};
