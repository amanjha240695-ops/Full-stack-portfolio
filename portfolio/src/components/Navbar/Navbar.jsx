import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiMoon, FiSun } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";

import "./Navbar.css";
import navLinks from "../../data/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });


  // Theme handling
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  // Scroll detection
  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 20);


      if (location.pathname !== "/") return;


      const sections = navLinks.map((item) =>
        document.getElementById(item.id)
      );


      sections.forEach((section) => {

        if (!section) return;


        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;


        if (
          window.scrollY >= top &&
          window.scrollY < bottom
        ) {
          setActive(section.id);
        }

      });

    };


    window.addEventListener(
      "scroll",
      handleScroll
    );


    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );


  }, [location.pathname]);



  // Navbar section navigation
  const scrollToSection = (id) => {

    setMenuOpen(false);


    // If user is not on homepage
    if (location.pathname !== "/") {

      window.location.href = `/#${id}`;

      return;
    }


    // If already on homepage
    const section = document.getElementById(id);


    if (!section) return;


    section.scrollIntoView({
      behavior: "smooth",
    });

  };



  return (
    <header
      className={`navbar ${
        scrolled ? "navbar-scroll" : ""
      }`}
    >

      <div className="container navbar-container">


        <div className="logo">
          Aman<span>.</span>
        </div>



        <nav
          className={`nav-links ${
            menuOpen ? "show-menu" : ""
          }`}
        >

          {navLinks.map((link) => (

            <button
              key={link.id}
              className={
                active === link.id
                  ? "active"
                  : ""
              }
              onClick={() =>
                scrollToSection(link.id)
              }
            >
              {link.label}
            </button>

          ))}



          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive
                ? "blog-nav-link active"
                : "blog-nav-link"
            }
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Blogs
          </NavLink>


        </nav>




        <div className="navbar-actions">


          <button
            className="theme-btn"
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
          >
            {
              theme === "dark"
                ? <FiSun />
                : <FiMoon />
            }
          </button>




          <a
            href="CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="resume-btn"
          >
            Resume
          </a>




          <button
            className="menu-btn"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {
              menuOpen
                ? <HiX />
                : <HiMenuAlt3 />
            }
          </button>


        </div>


      </div>


    </header>
  );
};


export default Navbar;