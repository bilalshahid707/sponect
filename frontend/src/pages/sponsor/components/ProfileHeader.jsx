import React from "react";
import { MapPin, Building2, Briefcase, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProfileHeader = ({ sponsorData }) => {
  return (
    <div className="w-full relative rounded-md overflow-hidden">
      {/* Cover Photo - Full Background */}
      <div className="relative w-full h-[340px] md:h-[400px]">
        <img
          className="w-full h-full object-cover"
          src={sponsorData.cover?.url || "https://placehold.co/1200x400/1e293b/ffffff?text=Cover+Photo"}
          alt="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/15 to-slate-900/60" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Logo and Text */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 flex-1">
              {/* Logo */}
              <img
                src={sponsorData.logo?.url || "https://placehold.co/150x150/1e293b/ffffff?text=Logo"}
                alt={sponsorData.name}
                className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-md shrink-0 object-cover"
              />

              {/* Text Content */}
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {sponsorData.name || "N/A"}
                </h1>
                {sponsorData.tagline && 
                <p className="text-sm md:text-base text-white max-w-2xl">
                  {sponsorData.tagline}
                </p>
}
                <div className="flex gap-3 mt-2 flex-wrap">
                  {sponsorData.location && (
                    <Badge
                      variant="outline"
                      className="text-white border-white flex gap-2"
                    >
                      <MapPin size={14} />
                      {sponsorData.location}
                    </Badge>
                  )}
                  {sponsorData.industry && (
                    <Badge
                      variant="outline"
                      className="text-white border-white flex gap-2"
                    >
                      <Building2 size={14} />
                      {sponsorData.industry}
                    </Badge>
                  )}
                  {sponsorData.founded && (
                    <Badge
                      variant="outline"
                      className="text-white border-white flex gap-2"
                    >
                      <Briefcase size={14} />
                      Founded {sponsorData.founded}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
