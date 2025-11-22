import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserDropDown } from "../../imports";

export const Header = () => {
  const loggedIn = useSelector((state) => state.User.LoggedIn);
  const user = useSelector((state) => state.User.Data);

  const [isOpen, setIsOpen] = useState(false);


  return (
    <header className="w-full px-3 sm:px-8">
      <div
        initial="hidden"
        animate="visible"
        className={`max-w-7xl mx-auto rounded-4xl rounded-tl-none rounded-tr-none bg-dark px-(--space-lg) sm:px-(--space-xl) lg:px-(--space-2xl) py-(--space-md) flex items-center justify-between`}
      >
        {/* Logo */}
        <div className="text-white font-bold text-xl">Logo</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-(--space-xl) text-white text-base font-medium">
            <li>
              <a href="#home" className="hover:text-primary transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-primary transition-colors">
                About us
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="hover:text-primary transition-colors"
              >
                How it works
              </a>
            </li>
          </ul>
        </nav>

        {/* CTA Button (Desktop only) */}
        {loggedIn ? (
          <UserDropDown user={user} />
        ) : (
          <div className="hidden md:flex gap-(--space-md)">
            <Link to={"/login"} className="btn-primary cursor-pointer">
              Log In
            </Link>
            <Link to={"/signup"} className="btn-primary cursor-pointer">
              Sign Up
            </Link>
          </div>
        )}

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <i className="bi bi-x-lg" style={{ fontSize: "28px" }}></i> : <i className="bi bi-list" style={{ fontSize: "28px" }}></i>}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-dark rounded-4xl mt-3 p-(--space-lg) md:hidden">
          <ul className="space-y-(--space-lg) text-white text-lg font-medium">
            <li>
              <a
                href="#home"
                className="block hover:text-primary transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="block hover:text-primary transition-colors"
              >
                About us
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="block hover:text-primary transition-colors"
              >
                How it works
              </a>
            </li>
          </ul>

          {/* CTA Button in mobile menu */}
          <div className="mt-(--space-lg)">
            <button className="inline-flex items-center gap-(--space-sm) rounded-xl bg-primary hover:bg-primary-hover text-white text-base sm:text-lg font-medium px-(--space-lg) py-3 shadow-lg transition-all">
              Join the waitlist ↓
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
