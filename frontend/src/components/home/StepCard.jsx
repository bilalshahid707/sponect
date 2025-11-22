import React from "react";
import { motion} from "framer-motion";

export const StepCard = ({
  number,
  name,
  description,
  image,
}) => {


  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div
        className={`flex flex-col ${
          number % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
        } items-center justify-between gap-6 md:gap-8 lg:gap-20 mt-(--space-2xl)`}
      >
        {/* Text Card */}
        <div
          className="flex flex-1 flex-col text-dark gap-2 rounded-3xl p-3 h-max
             border-2 border-dark transition-all duration-300 
             hover:bg-dark hover:text-white group"
        >
          <h3 className="heading-tertiary border-b-2 border-dark group-hover:border-white transition-colors duration-300">
            0{number} | {name}
          </h3>
          <p className="body-text">{description}</p>
        </div>

        {/* Image Section */}
        <div className="flex flex-1 justify-center items-center">
          <div className="w-[70%] h-[70%] rounded-3xl relative">
            <div className="border-accent-shape bg-dark"></div>
            <img
              src={image}
              alt={`Step ${number} - ${name}`}
              className="object-cover w-full h-full rounded-3xl"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StepCard;
