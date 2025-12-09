import React, { useState } from "react";
import { ArrowDown } from "lucide-react";
import cheeziousLogo from "../../assets/cheezious-logo.webp";
import heroBanner from "../../assets/hero-banner.svg";
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
    cheeziousLogo,
    cheeziousLogo,
    cheeziousLogo,
    cheeziousLogo,
    cheeziousLogo,
    cheeziousLogo,
    cheeziousLogo,
    cheeziousLogo,
    cheeziousLogo,
    cheeziousLogo,
    cheeziousLogo,
    cheeziousLogo,
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
      <section className="section">
        <div className="container gradient-bg overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-(--space-xl)">
            {/* Left Content */}
            <div className="flex flex-col w-full lg:w-[60%] gap-(--space-lg) text-left">
              <FadeInWhenVisible>
                <h1 className="heading-primary text-white">
                  Smart Sponsorship Platform in Pakistan
                </h1>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <p className="body-text text-white">
                  Join the leading sponsorship platform in Pakistan where brands
                  and seekers collaborate for impactful partnerships.
                </p>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <div className="mt-(--space-md) flex justify-center lg:justify-start">
                  <button className="btn-primary">
                    Join the waitlist
                    <ArrowDown className="w-5 h-5" />
                  </button>
                </div>
              </FadeInWhenVisible>
            </div>

            {/* Right Content (Hero Illustration / Image) */}
            <div className="w-full lg:w-[40%] flex justify-center z-30 relative">
              <FadeInWhenVisible>
                <div>
                  <img src={heroBanner} className="object-cover w-full" />
                </div>
              </FadeInWhenVisible>
            </div>
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

          <div className="flex gap-(--space-lg) mt-(--space-2xl) overflow-hidden">
            {logos &&
              logos.map((logo, index) => (
                <motion.div
                  transition={{
                    duration: 5,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  initial={{ translateX: 0 }}
                  animate={{ translateX: "-100%" }}
                >
                  <div
                    key={index}
                    className="img-box shrink-0 w-20 h-fit sm:w-32 md:w-48  flex items-center justify-center"
                  >
                    <img
                      src={logo}
                      alt="Cheezious"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* How is works section */}
      <section className="section">
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
                    image={step.image}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section  */}
      <section className="section">
        <div className="container bg-dark">
          <FadeInWhenVisible>
            <h2 className="heading-secondary text-white text-center">
              Be the First to Join the Future of Sponsorships in Pakistan
            </h2>
          </FadeInWhenVisible>

          <FadeInWhenVisible>
            <div className="waitlist-form flex items-center justify-center mt-(--space-lg)">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 sm:gap-0 w-full max-w-md rounded-2xl overflow-hidden"
              >
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="p-(--space-md) rounded-2xl sm:rounded-l-2xl sm:rounded-r-none border-none focus:border-none focus:outline-none bg-white grow"
                />
                <button
                  type="submit"
                  className={`btn-primary sm:rounded-l-none! ${
                    mutation.isPending ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  disabled={mutation.isPending}
                >
                  Join Waitlist
                </button>
              </form>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
};

export default HomePage;
