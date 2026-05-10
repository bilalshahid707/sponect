import React from "react";
import { Box, Typography } from "@mui/joy";

const Sponsorships = ({ sponsorships }) => {
  return (
    <Box className="flex flex-col gap-4">
      <Typography level="h4" className="relative w-max" sx={{ color: "dark.main" }}>
        Sponsorships
        <div className="absolute w-1/2 bg-primary -bottom-1 left-0 h-0.5"></div>
      </Typography>
      <Box className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {sponsorships?.length > 0 ? (
          sponsorships.map((sponsorship) => (
            <Box
              key={sponsorship.id}
              className="group flex items-stretch gap-3 overflow-hidden rounded-xl border border-white-lighter shadow-sm transition-colors duration-200 hover:border-primary"
            >
              <div className="w-36 shrink-0 overflow-hidden">
                <img
                  className="h-full w-full object-cover scale-100 transition duration-300 group-hover:scale-105"
                  src={sponsorship.thumbnailURL || "https://placehold.co/144x144/e2e8f0/94a3b8?text=No+Image"}
                  alt={sponsorship.title}
                />
              </div>

              <Box className="w-full p-4 min-h-[120px]">
                <Box sx={{ display: "flex", gap: 2, width: "100%", height: "100%" }}>
                  {/* Left: title + description */}
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography level="body-md" className="font-semibold capitalize" sx={{ color: "dark.main" }}>
                      {sponsorship.title}
                    </Typography>
                    <Typography level="body-xs" sx={{ color: "dark.light", mt: 1 }}>
                      {sponsorship.description}
                    </Typography>
                  </Box>

                  {/* Right: status (top) and amount (bottom-right) */}
                  <Box
                    sx={{
                      width: 140,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <Box>
                      <p
                        className={`${sponsorship.status === "active" ? "bg-primary" : "bg-dark"} h-min w-min rounded-lg px-2 py-1 text-xs font-medium text-white capitalize`}
                      >
                        {sponsorship.status}
                      </p>
                    </Box>

                    <Typography level="title-lg" sx={{ color: "dark.main", fontWeight: 700 }}>
                      {sponsorship.amountSponsored
                        ? `Rs. ${sponsorship.amountSponsored.split(".")[0]}`
                        : "N/A"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Box className="col-span-2 rounded-xl border border-dashed border-white-lighter bg-white-light p-6 text-center">
            <Typography level="body-md" sx={{ color: "dark.light" }}>
              No sponsorships added
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Sponsorships;
