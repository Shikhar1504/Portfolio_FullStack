import axios from "axios";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const Footer = () => {
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
  return (
    <footer className="relative flex flex-wrap items-center justify-between px-4 py-5 pt-5 mt-12 border-t bg-card border-border">
      {" "}
      <p className="text-sm text-muted-foreground ">
        {" "}
        &copy; {new Date().getFullYear()}{" "}
        {user?.fullName?.toUpperCase() || "Loading..."}
      </p>
      <a
        href="#hero"
        className="p-2 transition-colors rounded-full bg-primary/10 hover:bg-primary/20 text-primary"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};
