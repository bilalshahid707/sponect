import React from "react";
import { Box, Typography } from "@mui/joy";

const AboutSection = ({ description }) => {
  return (
    <Box className="flex flex-col gap-4 w-full">
      <Typography level="h4" className="relative w-max" sx={{ color: "dark.main" }}>
        About
        <div className="absolute w-1/2 bg-primary -bottom-1 left-0 h-0.5"></div>
      </Typography>
      <Typography
        level="body-md"
        className=""
        sx={{ color: "dark.main", lineHeight: 1.65 }}
      >
        {description || "N/A"}
      </Typography>
    </Box>
  );
};

export default AboutSection;
