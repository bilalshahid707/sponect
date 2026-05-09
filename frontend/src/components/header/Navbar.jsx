import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export const Navbar = () => {

  return (
    <nav className="p-sm md:p-0">
      <ul className={`flex flex-col gap-md md:flex-row md:gap-8 text-base font-medium text-dark`}>
        <NavLink to="/" className="hover:text-primary transition-colors">
          Home
        </NavLink>
        <NavLink to="/pitches" className="hover:text-primary transition-colors">
          Pitch Board
        </NavLink>
        <NavLink to="/sponsors" className="hover:text-primary transition-colors">
          Find Sponsors
        </NavLink>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  dark: PropTypes.bool,
};

export default Navbar;
