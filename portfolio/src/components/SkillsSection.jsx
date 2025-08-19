import { cn } from "@/lib/utils";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Fallback for skills without type field (backward compatibility)
const getCategory = (skill) => {
  // Use the type field if available, otherwise fallback to tools
  return skill.type || "tools";
};

const categories = [
  "all",
  "frontend",
  "backend",
  "languages",
  "databases",
  "ai",
  "tools",
];

export const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "https://portfolio-backend-gs79.onrender.com/api/v1/skill/getall",
        { withCredentials: true }
      );

      const categorizedSkills = data.skills.map((skill) => ({
        ...skill,
        category: getCategory(skill),
      }));

      setSkills(categorizedSkills);
    };

    getMySkills();
  }, []);

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  const sectionRef = useRef(null);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative px-6 py-28 md:px-12 bg-secondary/30"
    >
      <div className="container max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 text-4xl font-extrabold leading-tight tracking-tight text-center md:text-5xl"
        >
          <span className="inline-block pb-2">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              Skills
            </span>
          </span>
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-4 py-2 text-sm md:text-base cursor-pointer font-medium rounded-full border shadow-sm transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted text-muted-foreground hover:bg-secondary/50"
              )}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="p-4 lg:p-6 rounded-2xl bg-card shadow-md transition-transform hover:scale-[1.015] duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {skill.title}
                  </h3>
                  {skill.svg?.url && (
                    <img
                      src={skill.svg.url}
                      alt={skill.title}
                      className="object-contain w-5 h-5"
                    />
                  )}
                </div>

                <div className="w-full h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-2 rounded-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1, delay: 0.1 }}
                    viewport={{ once: false, amount: 0.3 }}
                  />
                </div>
                <div className="mt-2 text-right">
                  <span className="text-sm text-muted-foreground">
                    {skill.proficiency}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
};
