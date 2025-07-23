import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

// export const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.screenY > 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//   return (
//     <nav
//       className={cn(
//         "fixed w-full z-40 transition-all duration-300",
//         isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
//       )}
//     >
//       <div className="container flex items-center justify-between">
//         <a
//           className="flex items-center text-xl font-bold text-primary"
//           href="#hero"
//         >
//           <span className="relative z-10">
//             <span className="text-glow text-foreground"> PedroTech </span>{" "}
//             Portfolio
//           </span>
//         </a>

//         {/* desktop nav */}
//         <div className="hidden space-x-8 md:flex">
//           {navItems.map((item, key) => (
//             <a
//               key={key}
//               href={item.href}
//               className="transition-colors duration-300 text-foreground/80 hover:text-primary"
//             >
//               {item.name}
//             </a>
//           ))}
//         </div>

//         {/* mobile nav */}

//         <button
//           onClick={() => setIsMenuOpen((prev) => !prev)}
//           className="z-50 p-2 md:hidden text-foreground"
//           aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
//         >
//           {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
//         </button>

//         <div
//           className={cn(
//             "fixed inset-0 bg-background/95 backdroup-blur-md z-40 flex flex-col items-center justify-center",
//             "transition-all duration-300 md:hidden",
//             isMenuOpen
//               ? "opacity-100 pointer-events-auto"
//               : "opacity-0 pointer-events-none"
//           )}
//         >
//           <div className="flex flex-col space-y-8 text-xl">
//             {navItems.map((item, key) => (
//               <a
//                 key={key}
//                 href={item.href}
//                 className="transition-colors duration-300 text-foreground/80 hover:text-primary"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {item.name}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (href) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false }); // navigate to homepage
      // Delay scrolling to allow time for page to render
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // You might tweak this delay
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }

    setIsMenuOpen(false); // close mobile menu
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.screenY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <div
          className="flex items-center text-xl font-bold cursor-pointer text-primary"
          onClick={() => handleNavClick("#hero")}
        >
          <img
            src="/ss.png"
            alt="Logo"
            className="fixed top-0 left-0 mt-0 mr-0 lg:fixed lg:top-auto lg:left-auto w-18 h-18 lg:mt-4 lg:mr-12 lg:w-25 lg:h-25"
          />
          <span className="relative z-10">
            {/* <span className="text-glow text-foreground"> </span> Portfolio */}
          </span>
        </div>

        <div className="hidden space-x-8 md:flex">
          {navItems.map((item, key) => (
            <span
              key={key}
              onClick={() => handleNavClick(item.href)}
              className="transition-colors duration-300 cursor-pointer text-foreground/80 hover:text-primary"
            >
              {item.name}
            </span>
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="z-50 p-2 md:hidden text-foreground"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <span
                key={key}
                onClick={() => handleNavClick(item.href)}
                className="transition-colors duration-300 cursor-pointer text-foreground/80 hover:text-primary"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
