import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PublicIcon from "@mui/icons-material/Public";

const socialIconMap = {
  facebook: <FacebookIcon sx={{ fontSize: 40, color: "#1877F2" }} />,
  instagram: <InstagramIcon sx={{ fontSize: 40, color: "#E1306C" }} />,
  linkedin: <LinkedInIcon sx={{ fontSize: 40, color: "#0A66C2" }} />,
  x: <XIcon sx={{ fontSize: 40, color: "#000000" }} />,
  youtube: <YouTubeIcon sx={{ fontSize: 40, color: "#FF0000" }} />,
  website: <PublicIcon sx={{ fontSize: 40, color: "#334155" }} />,
};

const SocialsSection = ({ socials }) => {
  return (
    <div className="rounded-md w-full bg-white p-4 md:p-5 drop-shadow-xl">
      <div className="flex flex-col gap-4">
        <h4 className="text-dark text-xl w-max font-semibold relative">
          Socials
          <div className="absolute w-1/2 bg-primary -bottom-1 left-0 h-0.5"></div>
        </h4>

        {socials?.length > 0 ? (
          <div className="w-full flex flex-wrap gap-6 items-center">
            {socials.map((social) => {
              const icon = socialIconMap[social.name?.toLowerCase()];

              return (
                <a
                  key={social.name}
                  href={social.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-300 hover:scale-125"
                  title={social.name}
                >
                  {icon ?? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-dark">
                      <span className="text-white font-bold text-sm">
                        {social.name?.charAt(0)?.toUpperCase() || "S"}
                      </span>
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        ) : (
          <div className="p-6 text-center border border-gray-300 rounded-lg bg-gray-50">
            <p className="text-gray-600">No socials have been linked</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialsSection;
