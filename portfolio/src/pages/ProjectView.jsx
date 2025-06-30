import axios from "axios";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SpaceBackground, {
  ThemeToggle,
  useThemeAnimationToggle,
} from "space-background";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

const ProjectView = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const disableAnimation = useThemeAnimationToggle();

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await axios.get(
          `https://portfolio-backend-gs79.onrender.com/api/v1/project/get/${id}`,
          { withCredentials: true }
        );
        setProject(data.project);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong.");
      }
    };
    getProject();
  }, [id]);

  if (!project) return null;

  const descriptionList = project.description?.split(". ") || [];
  const technologiesList = project.technologies?.split(", ") || [];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <ThemeToggle mobilePosition="absolute" desktopPosition="fixed" />
      <SpaceBackground
        visual={{
          disableAnimation: disableAnimation,
          mobilePosition: "absolute",
          desktopPosition: "fixed",
        }}
      />
      <Navbar />
      <section className="relative items-center justify-center min-h-screen px-4 py-20 text-foreground ">
        <div className="container max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mt-2 mb-8 text-xl transition cursor-pointer text-muted-foreground hover:text-primary"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </button>

          <div className="space-y-14">
            <div>
              <h1 className="text-5xl font-bold mb-9">{project.title}</h1>
              <img
                src={project.projectBanner?.url || "/avatarHolder.jpg"}
                alt={project.title}
                className="w-full h-full rounded-lg shadow-md object-cover max-h-[500px]"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="mt-5 mb-5 text-3xl font-semibold">
                  Description
                </h2>
                <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                  {descriptionList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="mt-10 mb-5 text-3xl font-semibold">
                  Technologies
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {technologiesList.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <h3 className="mt-10 mb-2 text-xl font-semibold">Stack</h3>
                  <p className="text-muted-foreground">{project.stack}</p>
                </div>

                <div>
                  <h3 className="mt-10 mb-2 text-xl font-semibold">Deployed</h3>
                  <p className="text-muted-foreground">{project.deployed}</p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col items-center text-center">
                  <h3 className="mt-2 mb-2 text-xl font-semibold">
                    GitHub Repository
                  </h3>
                  <a
                    href={project.gitRepoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Github size={18} /> {project.gitRepoLink}
                  </a>
                </div>

                <div className="flex flex-col items-center text-center">
                  <h3 className="mt-2 mb-2 text-xl font-semibold">
                    Live Project
                  </h3>
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink size={18} /> {project.projectLink}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProjectView;
