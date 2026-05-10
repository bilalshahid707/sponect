import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/sponect-logo-header.png";

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-14 flex flex-col gap-10">

        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="Sponect" className="h-14 w-auto object-contain" />
        </Link>

        {/* 3 Columns */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">

          {/* Contact Us */}
          <div className="flex flex-col gap-4 flex-1">
            <h3 className="heading-tertiary text-dark border-b-2 border-primary pb-2">
              Contact Us
            </h3>
            <a
              href="mailto:info@sponect.com"
              className="body-text text-dark flex gap-2 items-center hover:text-primary transition-colors"
            >
              <i className="bi bi-envelope-fill text-lg shrink-0"></i>
              <span>sponect.pk@gmail.com</span>
            </a>
            <p className="body-text text-dark flex gap-2 items-start">
              <i className="bi bi-geo-alt-fill text-lg shrink-0 mt-1"></i>
              <span>Lahore, Pakistan</span>
            </p>
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-4 flex-1">
            <h3 className="heading-tertiary text-dark border-b-2 border-primary pb-2">
              Menu
            </h3>
            <NavLink to="/" className="body-text text-dark hover:text-primary transition-colors">
              Home
            </NavLink>
            <NavLink to="/pitches" className="body-text text-dark hover:text-primary transition-colors">
              Pitch Board
            </NavLink>
            <NavLink to="/sponsors" className="body-text text-dark hover:text-primary transition-colors">
              Find Sponsors
            </NavLink>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4 flex-1">
            <h3 className="heading-tertiary text-dark border-b-2 border-primary pb-2">
              Socials
            </h3>
            <div className="flex items-center gap-6">
              {[
                { icon: "twitter-x", url: "https://x.com/sponectpk" },
                { icon: "instagram", url: "https://www.instagram.com/sponectpk" },
                { icon: "linkedin", url: "www.linkedin.com/in/sponectpk " },
              ].map(({ icon, url }) => (
                <a
                  key={icon}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark hover:text-primary transition-colors text-3xl"
                >
                  <i className={`bi bi-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Copyright bar */}
      <div className="bg-dark w-full py-4">
        <p className="body-text text-white text-center">
          &copy; {new Date().getFullYear()} Sponect. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
