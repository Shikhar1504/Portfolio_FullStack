import axios from "axios";
import { motion } from "framer-motion";
import { Briefcase, Code, ExternalLink, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

export const useThemeMode = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    // Run on mount
    updateTheme();

    // Watch for class changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
};

const highlightKeywords = (text, keywords) => {
  const regex = new RegExp(`(${keywords.join("|")})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    keywords.some((k) => k.toLowerCase() === part.toLowerCase()) ? (
      <strong key={index}>{part}</strong>
    ) : (
      part
    )
  );
};

// Render minimal markdown for bold text: use **bold** in dashboard
const renderBold = (text) => {
  if (!text) return "";
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
};

export const AboutSection = () => {
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

  const theme = useThemeMode();

  const keywordsToBold = [
    "MERN stack",
    "Competitive Programming",
    "CP",
    "Data Structures & Algorithms",
    "DSA",
    "Java",
    "Python",
    "Machine Learning",
    "MongoDB",
    "Express",
    "React",
    "Node.js",
  ];

  const aboutLines = user.aboutMe
    ? user.aboutMe.replace(/\r\n/g, "\n").split("\n")
    : [];

  const sectionRef = useRef(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative px-6 py-28 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 text-4xl font-extrabold leading-tight tracking-tight text-center md:text-5xl"
        >
          <span className="inline-block pb-2">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              Me
            </span>
          </span>
        </motion.h2>

        <div className="grid items-start grid-cols-1 gap-16 md:grid-cols-2">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            {aboutLines.length > 0 && (
              <>
                <blockquote className="text-xl font-bold leading-snug md:text-2xl text-muted-foreground">
                  {highlightKeywords(aboutLines[0], keywordsToBold)}
                </blockquote>
                <div className="space-y-4 text-base text-muted-foreground">
                  {aboutLines.slice(1).map((line, idx) => (
                    <p key={idx}>{highlightKeywords(line, keywordsToBold)}</p>
                  ))}
                </div>
              </>
            )}

            <div className="flex flex-wrap justify-center gap-4 pt-6 sm:flex-row">
              <a
                href="#contact"
                className="px-6 py-2 text-sm font-medium text-white transition rounded-full shadow-md bg-primary hover:shadow-lg hover:bg-primary/80 hover:scale-110"
              >
                Get In Touch
              </a>
              {user.resume?.url && (
                <a
                  href={user.resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium transition-all duration-200 border rounded-full border-primary text-primary hover:bg-primary hover:text-white hover:shadow-md hover:scale-110"
                >
                  <ExternalLink size={16} className="animate-pulse" />
                  View Resume
                </a>
              )}
            </div>

            <div className="flex justify-center gap-4 pt-4">
              {["leetcodeURL", "codeforcesURL", "codechefURL"].map((platform) =>
                user[platform] ? (
                  <a
                    key={platform}
                    href={user[platform]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-2 transition-all border rounded-full group hover:bg-primary/10 hover:scale-110"
                  >
                    <img
                      src={`../${platform.replace("URL", "")}.svg`}
                      alt={platform}
                      className={cn("w-6 h-6", theme === "dark" && "invert")}
                    />
                    <span className="absolute hidden px-2 py-1 mb-2 text-xs text-white bg-black rounded opacity-0 bottom-full group-hover:block group-hover:opacity-100">
                      {platform.replace("URL", "")}
                    </span>
                  </a>
                ) : null
              )}
            </div>
          </motion.div>

          {/* Right side - Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {(user.aboutCards && user.aboutCards.length > 0
              ? user.aboutCards
              : []
            ).map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: idx * 0.2 }}
                className="p-6 transition-transform duration-300 transform border shadow-xl rounded-2xl bg-card hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    {(() => {
                      const iconMap = { User, Code, Briefcase };
                      const IconComp = iconMap[card.icon] || User;
                      return <IconComp className="w-6 h-6 text-primary" />;
                    })()}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">{card.title}</h4>
                    <p
                      className="mt-2 text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: renderBold(card.description || ""),
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
