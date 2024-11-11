import "./Navbar.css";
import { MenuIcon, CloseIcon } from "./Icons";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 48rem)").matches
  );

  // Monitor changes in viewport width to handle desktop vs mobile menu behavior
  useEffect(() => {
    const media = window.matchMedia("(min-width: 48rem)");

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      if (e.matches) {
        // Close the menu if switching to desktop
        setIsMenuOpen(false);
      }
    };

    media.addEventListener("change", handleMediaChange);

    return () => {
      media.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
    document.body.classList.add("menu-open");
    // e.target.setAttribute = ('aria-expanded', 'true')
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove("menu-open");
    // Enable body scroll when menu is closed
  };

  return (
    <nav className="nav">
      <span id="nav-label" hidden>
        Navigation
      </span>
      <button
        id="btnOpen"
        className="nav-menu-open-button"
        onClick={handleOpenMenu}
        aria-expanded={isMenuOpen ? "true" : "false"}
        aria-labelledby="nav-label"
        style={{ display: isDesktop ? "none" : "block" }}
      >
        <MenuIcon />
      </button>
      <div
        className="nav-menu"
        role="dialog"
        aria-labelledby="nav-label"
      >
        <button
          id="btnClose"
          className="nav-menu-close-button"
          onClick={handleCloseMenu}
          aria-label="Close"
        >
          <CloseIcon fill="" />
        </button>
        <ul className="nav-links">
          <li className="link">
            <a href="#">Collection</a>
          </li>
          <li className="link">
            <a href="#">Men</a>
          </li>
          <li className="link">
            <a href="#">Women</a>
          </li>
          <li className="link">
            <a href="#">About</a>
          </li>
          <li className="link">
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
