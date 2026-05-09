import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { X, Menu } from "lucide-react";
import { UserDropDown } from "./UserDropDown";
import { Navbar } from "./Navbar";
import { UserNav } from "./UserNav";
import AccountOverview from "../common/AccountOverview";
import logo from "../../assets/sponect-logo-header.png";

export const Header = () => {
  const loggedIn = useSelector((state) => state.User?.LoggedIn);
  const user = useSelector((state) => state.User?.Data);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="w-full relative z-50 bg-white border-b border-dark-lighter drop-shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-1 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Sponect"
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <Navbar dark={false} />
          </div>

          {/* Desktop CTA Buttons */}
          {loggedIn ? (
            <div className="hidden md:flex items-center gap-3">
              <UserDropDown user={user} />
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/signin"
                className="px-5 py-2 rounded-xl border-2 border-primary text-primary font-medium text-sm hover:bg-primary hover:text-white transition-all"
              >
                Log In
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-dark focus:outline-none"
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <button
        aria-label="Close menu"
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 w-full h-full bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 cursor-default ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed overflow-scroll top-0 left-0 h-full w-72 bg-dark z-50 flex flex-col gap-4 px-5 py-6 md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between mb-2">
          <img
            src={logo}
            alt="Sponect"
            className="h-8 w-auto object-contain"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-primary transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {loggedIn && <AccountOverview />}

        <div className="border-t border-dark-lighter pt-4">
          <Navbar dark />
        </div>

        {loggedIn && (
          <div className="border-t border-dark-lighter pt-2">
            <UserNav />
          </div>
        )}

        {!loggedIn && (
          <div className="flex flex-col gap-3 mt-auto pb-4">
            <Link
              to="/signin"
              className="w-full text-center px-5 py-2 rounded-xl border-2 border-primary text-primary font-medium text-sm hover:bg-primary hover:text-white transition-all"
              onClick={() => setIsOpen(false)}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="btn-primary justify-center"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
