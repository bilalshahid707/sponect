export const Footer = () => {
  return (
    <section className="section">
      <div className="container bg-dark">
        <div className="flex flex-col gap-(--space-xl)">
          {/* Logo */}
          <div className="text-white font-bold text-3xl">Logo</div>

          {/* Footer Columns */}
          <div className="flex items-start justify-between flex-col md:flex-row gap-(--space-xl) md:gap-(--space-lg)">
            {/* Contact Us */}
            <div className="flex flex-col gap-(--space-md) flex-1">
              <h3 className="heading-tertiary text-white border-b-2 border-primary">
                Contact Us
              </h3>
              <a
                href="mailto:info@sponect.com"
                className="body-text text-white flex gap-(--space-sm) items-center hover:text-primary transition-colors"
              >
                <i className="bi bi-envelope-fill text-xl shrink-0"></i>
                <span>info@sponect.com</span>
              </a>
              <a
                href="tel:+92123456789"
                className="body-text text-white flex gap-(--space-sm) items-center hover:text-primary transition-colors"
              >
                <i className="bi bi-telephone-fill text-xl shrink-0"></i>
                <span>+92 123 456 7890</span>
              </a>
              <p className="body-text text-white flex gap-(--space-sm) items-start">
                <i className="bi bi-geo-alt-fill text-xl shrink-0 mt-1"></i>
                <span>Islamabad, Pakistan</span>
              </p>
            </div>

            {/* Menu */}
            <div className="flex flex-col gap-(--space-md) flex-1">
              <h3 className="heading-tertiary text-white border-b-2 border-primary">
                Menu
              </h3>
              <a
                href="#home"
                className="body-text text-white hover:text-primary transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                className="body-text text-white hover:text-primary transition-colors"
              >
                About us
              </a>
              <a
                href="#how-it-works"
                className="body-text text-white hover:text-primary transition-colors"
              >
                How it works
              </a>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-(--space-md) flex-1">
              <h3 className="heading-tertiary text-white border-b-2 border-primary">
                Socials
              </h3>

              <div className="flex items-center gap-(--space-xl) justify-center">
                {[
                  { icon: "facebook", url: "https://facebook.com" },
                  { icon: "twitter-x", url: "https://twitter.com" },
                  { icon: "instagram", url: "https://instagram.com" },
                  { icon: "linkedin", url: "https://linkedin.com" },
                ].map(({ icon, url }) => (
                  <a
                    key={icon}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="body-text text-white flex gap-(--space-sm) items-center hover:text-primary transition-colors"
                  >
                    <i className={`bi bi-${icon} text-3xl shrink-0`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-1 bg-primary rounded-full mt-(--space-xl)"></div>

        {/* Footer Bottom */}
        <footer className="w-full mt-(--space-lg) flex items-center justify-center">
          <p className="body-text text-white text-center w-full">
            &copy; {new Date().getFullYear()} Sponect. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
