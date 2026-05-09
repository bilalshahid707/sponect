import React, { useState } from "react";
import { Search, SlidersHorizontal, MousePointerClick, Zap, MessageCircle, Bookmark, Star } from "lucide-react";
import cherryLogo from "../../assets/partners-logos/cherry-logo.png";
import justujuLogo from "../../assets/partners-logos/justuju-logo.jpg";
import nikonLogo from "../../assets/partners-logos/nikon-logo.jpg";
import somameLogo from "../../assets/partners-logos/somame-logo.jpg";
import tribuneLogo from "../../assets/partners-logos/tribune-logo.jpg";

import { StepCard, FadeInWhenVisible, BasicAlert } from "../../components";
import { applicantSteps, brandSteps } from "../../utils";
import { motion } from "motion/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const HomePage = () => {
  const API_URL = import.meta.env.VITE_APP_API_URL;

  // Managing how it works section state
  const [translate, setTranslate] = useState("0");
  const [activeTab, setActiveTab] = useState("applicant");
  const steps = activeTab === "applicant" ? applicantSteps : brandSteps;

  // Logos for trusted by section
  const logos = [
    cherryLogo,
    nikonLogo,
    somameLogo,
    tribuneLogo,
    justujuLogo
  ];

  const [modalMsg, setModalMsg] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${API_URL}/waitlist/new-member`, data);
      return response;
    },
    onSuccess: () => {
      setModalMsg("You have been added to waitlist!");
    },
    onError: (error) => {
      setAlertMsg(error.response?.data?.message || error.message);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <>
      {modalMsg && <InfoModal setModalMsg={setModalMsg} message={modalMsg} />}
      {alertMsg && (
        <BasicAlert
          setAlertMsg={setAlertMsg}
          message={alertMsg}
          severity="error"
        />
      )}
      {/* Hero Section */}
      <section className="overflow-hidden min-h-[90vh] flex items-stretch bg-dark relative">
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#06758c]/30 to-transparent pointer-events-none z-0" />
        <div className="w-full max-w-7xl mx-auto px-2 py-6 sm:px-8 flex flex-col md:items-start md:mt-4 items-center justify-between gap-8 relative">
          {/* Left Content */}
          <div className="flex flex-col items-center justify-center gap-4 w-full md:px-16 z-10">
            {/* Typewriter heading */}
            <motion.h1
              className="heading-primary text-white text-center"
              initial={{ width: 0, opacity: 1 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              style={{ overflow: "hidden", whiteSpace: "normal" }}
            >
              {"Smart ".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.045, duration: 0 }}
                >
                  {char}
                </motion.span>
              ))}
              <span className="text-primary">
                {"Sponsorship Platform".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (7 + i) * 0.045, duration: 0 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              {" in Pakistan".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (27 + i) * 0.045, duration: 0 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Typewriter paragraph */}
            <motion.p
              className="body-text text-white text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              {"Join the leading sponsorship platform in Pakistan where brands and seekers collaborate for impactful partnerships."
                .split("")
                .map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 + i * 0.018, duration: 0 }}
                  >
                    {char}
                  </motion.span>
                ))}
            </motion.p>

            {/* Fade up button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.2, duration: 0.5, ease: "easeOut" }}
            >
              <a href="#how-it-works" className="btn-primary">
                How it works
              </a>
            </motion.div>
          </div>

          {/* Right Content (Hero Illustration / Image) */}
          <div className="w-full sm:w-[80%] md:w-1/2 absolute flex justify-center items-end self-end md:-bottom-8 bottom-0 right-0 left-0 mx-auto">
            <FadeInWhenVisible>
              <img
                src="https://res.cloudinary.com/sponect/image/upload/v1778266371/Hero-banner_ki0wwx.webp"
                className="w-full  object-contain"
                alt="Hero banner"
              />
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="section">
        <div className="container">
          <FadeInWhenVisible>
            <h2 className="heading-secondary text-dark text-center">
              Trusted By
            </h2>
          </FadeInWhenVisible>

          <div className="mt-(--space-2xl) overflow-hidden">
            <motion.div
              className="flex gap-12 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="shrink-0 w-12 sm:w-20 md:w-28 flex items-center justify-center"
                >
                  <img
                    src={logo}
                    alt="Cheezious"
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-[#f9fafb]">
        <div className="container">
          <FadeInWhenVisible>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest text-center mb-2">
              What We Offer
            </p>
            <h2 className="heading-secondary text-dark text-center">
              Skip the Hustle.{" "}
              <span className="text-primary">Land the Deal.</span>
            </h2>
            <p className="text-text-secondary text-base leading-relaxed text-center max-w-xl mx-auto mt-3">
              No more cold emails, endless DMs, or chasing replies. Sponject
              does the heavy lifting so you can focus on what matters.
            </p>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {[
              {
                Icon: Search,
                title: "Smart Discovery",
                desc: "Hundreds of opportunities in one place — no more endless Googling.",
              },
              {
                Icon: SlidersHorizontal,
                title: "Filter Your Needs",
                desc: "Filter by industry, budget, location, and more — only see what's relevant.",
              },
              {
                Icon: MousePointerClick,
                title: "Skip Manual Outreach",
                desc: "Connect directly with verified sponsors and seekers in one click.",
              },
              {
                Icon: Zap,
                title: "Quick Shortlisting",
                desc: "Evaluate profiles and past collabs side-by-side. No spreadsheets.",
              },
              {
                Icon: MessageCircle,
                title: "In-Platform Chat",
                desc: "Every conversation, proposal, and deal — handled inside Sponject.",
              },
              {
                Icon: Bookmark,
                title: "Saved Profiles",
                desc: "Save profiles and turn one-time deals into long-term partnerships.",
              },
              {
                Icon: Star,
                title: "Featured Listings",
                desc: "Boost visibility with featured placements in front of the right eyes.",
                premium: true,
              },
            ].map((service, i) => (
              <FadeInWhenVisible key={i}>
                <div className="relative bg-white rounded-2xl p-6 border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 h-full">
                  {service.premium && (
                    <span className="absolute top-4 right-4 text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      Premium
                    </span>
                  )}
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <service.Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="text-dark font-semibold text-base">{service.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{service.desc}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="section">
        <div className="container">
          <FadeInWhenVisible>
            <h2 className="heading-secondary text-dark text-center">
              How Our Sponsorship Platform in Pakistan Works
            </h2>
          </FadeInWhenVisible>

          {/* Content */}
          <div className="flex flex-col items-center justify-center w-full text-dark">
            {/* Headings */}

            <FadeInWhenVisible>
              <div className="relative flex items-center justify-center gap-(--space-xl) w-max cursor-pointer">
                <h3
                  onClick={() => {
                    setActiveTab("applicant");
                    setTranslate("0");
                  }}
                  className="heading-tertiary"
                >
                  For Applicants
                </h3>
                <h3
                  onClick={() => {
                    setActiveTab("brand");
                    setTranslate("full");
                  }}
                  className="heading-tertiary"
                >
                  For Brands
                </h3>

                <div className="w-[120%] h-4 border-dark border-2 absolute -bottom-(--space-lg) rounded-full p-(--space-sm) flex items-center">
                  <div
                    className={`w-1/2 h-2 bg-dark rounded-full ${
                      translate === "0" ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300`}
                  ></div>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Steps */}
            <div className="w-full container ">
              {steps &&
                steps.map((step) => (
                  <StepCard
                    key={step.number}
                    number={step.number}
                    name={step.name}
                    description={step.description}
                    icon={step.icon}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
