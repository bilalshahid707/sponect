import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export const Navbar = ({ dark = false }) => {
  const textColor = dark ? "text-white" : "text-dark";

  return (
    <nav className="p-sm md:p-0">
      <ul className={`flex flex-col gap-md md:flex-row md:gap-8 text-base font-medium ${textColor}`}>
        <NavLink to="#home" className="hover:text-primary transition-colors">
          Home
        </NavLink>
        <NavLink to="#about" className="hover:text-primary transition-colors">
          About us
        </NavLink>
        <NavLink to="#how-it-works" className="hover:text-primary transition-colors">
          How it works
        </NavLink>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  dark: PropTypes.bool,
};

export default Navbar;
