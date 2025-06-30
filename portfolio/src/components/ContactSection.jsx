import { cn } from "@/lib/utils";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  Loader,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

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

export const ContactSection = () => {
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
  const [senderName, setSenderName] = useState("");
  //   const [subject, setSubject] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Sending message...");

    await axios
      .post(
        "https://portfolio-backend-gs79.onrender.com/api/v1/message/send",
        { senderName, email: senderEmail, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.update(toastId, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        setSenderName("");
        setSenderEmail("");
        setMessage("");
      })
      .catch((error) => {
        toast.update(toastId, {
          render: error.response?.data?.message || "Something went wrong.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
      });

    setLoading(false);
  };

  const theme = useThemeMode();
  //   const iconColor = theme === "dark" ? "white" : "black";
  //   const hoverColor = theme === "dark" ? "#9ca3af" : "#6b7280"; // optional
  const iconColor = useMemo(
    () => (theme === "dark" ? "white" : "black"),
    [theme]
  );
  const hoverColor = useMemo(
    () => (theme === "dark" ? "#9ca3af" : "#6b7280"),
    [theme]
  );

  const sectionRef = useRef(null);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative px-6 py-28 md:px-12"
    >
      <div className="container max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-center md:text-5xl"
        >
          <span className="inline-block pb-2"></span>
          Get In{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
            Touch
          </span>
        </motion.h2>

        <p className="max-w-2xl mx-auto mb-12 text-center text-muted-foreground">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <h3 className="mb-6 text-2xl font-semibold">
              {" "}
              Contact Information
            </h3>

            <div className="justify-center space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="w-6 h-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Email</h4>
                  <a
                    href={`mailto:${user.email}`}
                    className="transition-colors text-muted-foreground hover:text-primary"
                  >
                    {user.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="w-6 h-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Location</h4>
                  <p className="transition-colors text-muted-foreground hover:text-primary">
                    {user.location || "Your Location"}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="w-6 h-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Phone</h4>
                  <a
                    href={`tel:${user.phone}`}
                    className="transition-colors text-muted-foreground hover:text-primary"
                  >
                    {user.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Portfolio</h4>
                  <a
                    href={user.portfolioURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors text-muted-foreground hover:text-primary"
                  >
                    {user.portfolioURL || "Visit Portfolio"}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="mb-4 font-medium"> Connect With Me</h4>
              <div className="flex flex-wrap justify-center space-x-5 space-y-5">
                <a
                  href={user.linkedInURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="transition w-7 h-7 hover:opacity-80" />
                </a>
                <a
                  href={user.githubURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="transition w-7 h-7 hover:opacity-80" />
                </a>
                <a
                  href={user.instagramURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="transition w-7 h-7 hover:opacity-80" />
                </a>
                <a
                  href={user.leetcodeURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="../leetcode.svg"
                    alt="LeetCode"
                    // className="w-6 h-6 transition hover:opacity-80"
                    className={cn(
                      "w-7 h-7 transition hover:opacity-80",
                      theme === "dark" && "invert"
                    )}
                  />
                </a>
                <a
                  href={user.codeforcesURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="../codeforces.svg"
                    alt="Codeforces"
                    className={cn(
                      "w-7 h-7 transition hover:opacity-80",
                      theme === "dark" && "invert"
                    )}
                  />
                </a>
                <a
                  href={user.codechefURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="../codechef.svg"
                    alt="CodeChef"
                    className={cn(
                      "w-7 h-7 transition hover:opacity-80",
                      theme === "dark" && "invert"
                    )}
                  />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-lg shadow-xs bg-card"
          >
            <h3 className="mb-6 text-2xl font-semibold"> Send a Message</h3>

            <form className="space-y-6" onSubmit={handleMessage}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  {" "}
                  Your Name
                </label>
                <input
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border rounded-md border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  {" "}
                  Your Email
                </label>
                <input
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border rounded-md border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium"
                >
                  {" "}
                  Your Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  id="message"
                  name="message"
                  required
                  className="w-full px-4 py-3 border rounded-md resize-none border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="Tell me a bit about your project or idea..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                // className={cn(
                //   "cosmic-button w-full cursor-pointer flex items-center justify-center gap-2"
                // )}
                className={cn(
                  "cosmic-button w-full flex items-center cursor-pointer justify-center gap-2 px-4 py-3 rounded-md text-white bg-primary hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                )}
              >
                {/* {loading ? "Sending..." : "Send Message"}
                <Send size={16} /> */}
                {loading ? (
                  <Loader className="animate-spin" size={16} />
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
