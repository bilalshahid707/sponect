import PropTypes from "prop-types";
import { motion } from "framer-motion";

export const StepCard = ({ number, name, description, icon: Icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
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

        {/* Icon Section */}
        <div className="flex flex-1 justify-center items-center">
          <div className="w-40 h-40 rounded-3xl bg-dark flex items-center justify-center shadow-lg">
            {Icon && <Icon size={72} className="text-white" strokeWidth={1.2} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

StepCard.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

export default StepCard;
