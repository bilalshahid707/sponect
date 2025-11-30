import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <nav className="p-sm border-b-2 border-dark-lighter md:p-0 md:border-none">
        <ul className="flex flex-col gap-md md:flex-row text-white text-base font-medium">
          <NavLink to="#home" className="hover:text-primary transition-colors">
            Home
          </NavLink>
          <NavLink to="#about" className="hover:text-primary transition-colors">
            About us
          </NavLink>
          <NavLink
            to="#how-it-works"
            className="hover:text-primary transition-colors"
          >
            How it works
          </NavLink>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
