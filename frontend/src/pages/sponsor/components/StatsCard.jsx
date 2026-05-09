import React from "react";

const StatsCard = ({ sponsorData }) => {
  const totalInvestment = sponsorData?.totalInvestment
    ? `$${(sponsorData.totalInvestment / 1000000).toFixed(1)}M`
    : "$0.0M";

  return (
    <div className="rounded-md bg-white p-4 md:p-5 drop-shadow-xl">
      <div className="flex flex-col gap-4">

      <h2 className="font-semibold text-xl w-max relative">
        Stats
        <div className="absolute w-1/2 bg-primary -bottom-1 left-0 h-0.5"></div>
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-3">
          <h3 className="text-white text-lg font-semibold leading-tight">
            {sponsorData?.totalSponsorships ?? 0}
          </h3>
          <p className="text-gray-400 text-sm">Total Sponsorships</p>
        </div>
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-3">
          <h3 className="text-white text-lg font-semibold leading-tight">
            {totalInvestment}
          </h3>
          <p className="text-gray-400 text-sm">Total Investment</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default StatsCard;
