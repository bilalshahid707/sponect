// FadeInWhenVisible.tsx
import { motion } from "framer-motion";
import React from "react";


export const FadeInWhenVisible = ({
  children,
  delay = 0,
  duration = 0.5,
  y = 60,
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.3 }}
  >
    {children}
  </motion.div>
);

export default FadeInWhenVisible;
