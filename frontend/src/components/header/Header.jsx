import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserDropDown } from "./UserDropDown";
import { Navbar } from "./Navbar";
import { UserNav } from "./UserNav";
import { UserInfo } from "./UserInfo";

export const Header = () => {
  const loggedIn = useSelector((state) => state.User.LoggedIn);
  const user = useSelector((state) => state.User.Data);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full px-2 sm:px-4">
      <div
        initial="hidden"
        animate="visible"
        className={`max-w-7xl mx-auto rounded-2xl rounded-tl-none rounded-tr-none bg-dark px-(--space-lg) sm:px-(--space-xl) lg:px-(--space-2xl) py-(--space-md) flex items-center justify-between`}
      >
        {/* Logo */}
        <div className="text-white font-bold text-xl">Logo</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <Navbar />
        </div>

        {/* CTA Button (Desktop only) */}
        {loggedIn ? (
          <div className="flex gap-sm items-center justify-center">
            <UserDropDown user={user} />
          </div>
        ) : (
          <div className="hidden md:flex gap-md">
            <Link to={"/signin"} className="btn-primary cursor-pointer">
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
          {isOpen ? (
            <i className="bi bi-x-lg" style={{ fontSize: "28px" }}></i>
          ) : (
            <i className="bi bi-list" style={{ fontSize: "28px" }}></i>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-dark rounded-2xl mt-3 p-lg flex flex-col gap-lg md:hidden">
          <UserInfo user={user} />
          <Navbar />
          <UserNav />
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
