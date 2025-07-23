import { cn } from "@/lib/utils";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowDown, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Typewriter from "typewriter-effect";

export const useThemeMode = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
};

export const HeroSection = () => {
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
  const iconColor = useMemo(
    () => (theme === "dark" ? "white" : "black"),
    [theme]
  );
  const hoverColor = useMemo(
    () => (theme === "dark" ? "#9ca3af" : "#6b7280"),
    [theme]
  );

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen px-4"
    >
      <div className="container grid items-center max-w-6xl grid-cols-1 gap-10 mx-auto md:grid-cols-2">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="space-y-6 text-center md:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold leading-tight tracking-tight md:text-6xl"
          >
            <span className="block lg:mb-1">Hi, I'm</span>
            <span className="roboto text-primary lg:text-7xl">
              {user.fullName ? (
                user.fullName
              ) : (
                <span className="inline-block w-32 h-8 bg-gray-200 rounded animate-pulse dark:bg-zinc-700"></span>
              )}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl font-medium md:text-3xl text-muted-foreground min-h-[2.5rem]"
            aria-label="User roles"
            aria-live="polite"
          >
            {user.skills?.length > 0 ? (
              <Typewriter
                options={{
                  strings: user.skills,
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 30,
                  delay: 80,
                  pauseFor: 1500,
                }}
              />
            ) : (
              <span className="inline-block w-40 h-6 bg-gray-200 rounded animate-pulse dark:bg-zinc-700" />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="pt-4"
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector("#projects");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className="mr-4 cosmic-button hover:bg-primary/10"
              style={{ color: iconColor }}
              onMouseOver={(e) => (e.currentTarget.style.color = hoverColor)}
              onMouseOut={(e) => (e.currentTarget.style.color = iconColor)}
            >
              View My Work
            </a>
            <a
              href={user.resume?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 transition-colors duration-300 border rounded-full cosmic-button border-primary hover:bg-primary/10"
              style={{ color: iconColor }}
              onMouseOver={(e) => (e.currentTarget.style.color = hoverColor)}
              onMouseOut={(e) => (e.currentTarget.style.color = iconColor)}
            >
              Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Profile Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex justify-center md:justify-start"
        >
          <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 group animate-float">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-pink-500 to-purple-500 p-[3px] animate-glow group-hover:scale-105 transition-transform duration-500 ease-in-out shadow-2xl">
              <div className="w-full h-full p-1 rounded-full bg-background dark:bg-zinc-900">
                <img
                  loading="eager"
                  src={user.avatar?.url || "../Shikhar-pica.png"}
                  alt={user?.fullName || "Profile"}
                  className="object-cover w-full h-full transition-transform duration-500 rounded-full group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Social Icons */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
        className="absolute flex flex-row gap-4 transform -translate-x-1/2 bottom-25 left-1/2 text-primary lg:top-1/3 lg:right-4 lg:left-auto lg:transform-none lg:flex-col lg:gap-6"
      >
        {user.githubURL && (
          <a href={user.githubURL} target="_blank" rel="noopener noreferrer">
            <Github
              className="w-6 h-6 transition-transform duration-200 hover:scale-110 lg:w-9 lg:h-9 hover:text-muted-foreground"
              style={{ color: iconColor }}
              onMouseOver={(e) => (e.currentTarget.style.color = hoverColor)}
              onMouseOut={(e) => (e.currentTarget.style.color = iconColor)}
            />
          </a>
        )}
        {user.linkedInURL && (
          <a href={user.linkedInURL} target="_blank" rel="noopener noreferrer">
            <Linkedin
              className="w-6 h-6 transition-transform duration-200 hover:scale-110 lg:w-9 lg:h-9 hover:text-muted-foreground"
              style={{ color: iconColor }}
              onMouseOver={(e) => (e.currentTarget.style.color = hoverColor)}
              onMouseOut={(e) => (e.currentTarget.style.color = iconColor)}
            />
          </a>
        )}
        {user.instagramURL && (
          <a href={user.instagramURL} target="_blank" rel="noopener noreferrer">
            <Instagram
              className="w-6 h-6 transition-transform duration-200 hover:scale-110 lg:w-9 lg:h-9 hover:text-muted-foreground"
              style={{ color: iconColor }}
              onMouseOver={(e) => (e.currentTarget.style.color = hoverColor)}
              onMouseOut={(e) => (e.currentTarget.style.color = iconColor)}
            />
          </a>
        )}
        {user.leetcodeURL && (
          <a href={user.leetcodeURL} target="_blank" rel="noopener noreferrer">
            <img
              src="../leetcode.svg"
              alt="LeetCode"
              className={cn(
                "w-6 h-6 transition-transform duration-200 hover:scale-110 lg:w-9 lg:h-9",
                theme === "dark" && "invert"
              )}
              style={{
                filter: theme === "dark" ? "invert(100%)" : "invert(0%)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.filter =
                  "invert(57%) sepia(4%) saturate(0%) hue-rotate(177deg) brightness(97%) contrast(90%)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.filter =
                  theme === "dark" ? "invert(100%)" : "invert(0%)";
              }}
            />
          </a>
        )}

        <a href="#contact">
          <Mail
            className="w-6 h-6 transition-transform duration-200 hover:scale-110 lg:w-9 lg:h-9 hover:text-muted-foreground"
            style={{ color: iconColor }}
            onMouseOver={(e) => (e.currentTarget.style.color = hoverColor)}
            onMouseOut={(e) => (e.currentTarget.style.color = iconColor)}
          />
        </a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute flex flex-col items-center transform -translate-x-1/2 bottom-1 lg:bottom-8 left-1/2 animate-bounce"
      >
        <span className="mb-2 text-sm text-muted-foreground">Scroll</span>
        <ArrowDown className="w-5 h-5 text-primary" />
      </motion.div>
    </section>
  );
};
