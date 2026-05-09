import React from "react";
import { brandImages } from "../../../utils/constants";

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
              const logo = brandImages?.[social.name]?.icon;

              return (
                <a
                  key={social.name}
                  href={social.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-300 hover:scale-125"
                  title={social.name}
                >
                  {logo ? (
                    <img
                      className="h-12 w-12"
                      src={logo}
                      alt={`${social.name} logo`}
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-dark">
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
