import React from "react";
import { User, Cake } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SponsorshipPreferences = ({ sponsorData }) => {
  const sponsorshipTypes = [
    sponsorData.cashSponsorship && "Cash",
    sponsorData.inkindSponsorship && "In-Kind",
  ].filter(Boolean);

  const durations = [
    sponsorData.shortDuration && "Short Duration",
    sponsorData.longDuration && "Long Duration",
    sponsorData.oneTimeDuration && "One Time",
  ].filter(Boolean);

  return (
    <div className="">
      <div className="flex flex-col gap-4">
        <h4 className="text-dark text-xl w-max font-semibold relative">
          Sponsorship Preferences
          <div className="absolute w-1/2 bg-primary -bottom-1 left-0 h-0.5"></div>
        </h4>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {/* Budget Range */}
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                Budget Range
              </p>
              <p className="text-lg font-bold text-gray-900">
                {sponsorData.minBudget && sponsorData.maxBudget ? (
                  <>
                    ${(sponsorData.minBudget / 1000).toFixed(0)}K - $
                    {(sponsorData.maxBudget / 1000000).toFixed(1)}M
                  </>
                ) : (
                  "N/A"
                )}
              </p>
            </div>

            {/* Sponsorship Types */}
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                Sponsorship Types
              </p>
              <div className="flex gap-2 flex-wrap">
                {sponsorshipTypes.length > 0 ? (
                  sponsorshipTypes.map((type) => (
                    <Badge key={type} className="bg-dark  px-3 py-1">
                      {type}
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs font-semibold text-dark">N/A</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {/* Duration Preferences */}
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                Duration Preferences
              </p>
              <div className="flex gap-2 flex-wrap">
                {durations.length > 0 ? (
                  durations.map((duration) => (
                    <Badge key={duration} className="bg-dark  px-3 py-1">
                      {duration}
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs font-semibold text-dark">N/A</p>
                )}
              </div>
            </div>
          </div>

          {/* Target Demographics - Full Width */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold text-dark mb-3 uppercase tracking-wide">
              Target Demographics
            </p>
            <div className="flex gap-3 flex-wrap">
              {/* Gender */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-gray-50 px-3 py-2">
                <User size={18} className="text-dark shrink-0" />
                <span className="text-sm font-semibold text-gray-900">Gender</span>
                <Badge className="bg-dark px-2 py-0.5 text-xs">
                  {sponsorData.gender || "N/A"}
                </Badge>
              </div>

              {/* Age Group */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-gray-50 px-3 py-2">
                <Cake size={18} className="text-dark shrink-0" />
                <span className="text-sm font-semibold text-gray-900">Age</span>
                <Badge className="bg-dark px-2 py-0.5 text-xs">
                  {sponsorData.ageGroup || "N/A"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorshipPreferences;
