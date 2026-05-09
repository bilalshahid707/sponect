import { Card, Box, Typography, Button, Avatar } from "@mui/joy";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import NumericLabel from "react-pretty-numbers";

export const SponsorCard = ({ sponsor }) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log(sponsor);
  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: "100%",
        transition: "all 0.2s ease",
        border: "1px solid",
        borderColor: "white.lighter",
        cursor: "pointer",
        p: 2.5,
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "white.main",
      }}
      className={` ${isHovered ? "shadow-xl -translate-1" : ""} relative overflow-hidden`}
    >
      <div className="absolute w-full bg-dark h-24 top-0 left-0"></div>
      <p className="absolute rounded-full text-xs top-2 right-2 bg-primary-dark-soft px-3 py-1 font-medium">
        Active
      </p>

      {/* Card content */}
      <div className="flex flex-col gap-3 mt-8">
        {/* Header: Logo, Name, Tagline */}
        <Box className="flex gap-2 flex-col items-start">
          <Avatar
            src={sponsor.logo?.url || ""}
            alt={sponsor.name}
            sx={{
              width: 72,
              height: 72,
              borderRadius: "8px",
              border: "2px solid",
              borderColor: "white.main",
              flexShrink: 0,
              objectFit: "cover",
              backgroundColor: "white.lighter",
            }}
          />
          <Box className="flex flex-col gap-1">
            <Box className="flex flex-col">
              <Typography
                level="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "dark.main",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {sponsor.name}
              </Typography>
              <Typography
                level="body-xs"
                sx={{
                  color: "dark.light",
                }}
              >
                {sponsor.tagline}
              </Typography>
            </Box>
            {sponsor.industry && (
              <Box className="flex gap-1 items-center px-2 py-0.5 bg-primary-dark-soft rounded w-max">
                <BusinessIcon sx={{ fontSize: "0.9rem", color: "dark.main" }} />
                <p className="text-dark text-xs">{sponsor.industry}</p>
              </Box>
            )}
          </Box>
        </Box>

        {/* Budget Section */}
        <Box className="bg-white border-2 border-white-lighter p-3 rounded-md flex justify-between">
          <Box className="flex flex-col gap-2 items-start">
            <Typography
              level="body-xs"
              sx={{
                color: "dark.main",
                textTransform: "uppercase",
                fontSize: "0.65rem",
                fontWeight: 600,
                bgcolor: "dark.soft",
                px: 2,
                py: 0.5,
                borderRadius: "2px",
              }}
            >
              Budget Range
            </Typography>
            <Typography
              level="h4"
              sx={{ fontWeight: 700, color: "dark.main", fontSize: "0.95rem" }}
            >
              {sponsor.minBudget && sponsor.maxBudget ? (
                <Box className="flex gap-1">
                  <NumericLabel params={{ precision: 1, shortFormat: true }}>
                    {sponsor.minBudget}
                  </NumericLabel>{" "}
                  -{" "}
                  <NumericLabel params={{ precision: 1, shortFormat: true }}>
                    {sponsor.maxBudget}
                  </NumericLabel>
                </Box>
              ) : (
                "Not specified"
              )}
            </Typography>
          </Box>
          <Box className="flex flex-col gap-2 items-start">
            <Typography
              level="body-xs"
              sx={{
                color: "dark.main",
                textTransform: "uppercase",
                fontSize: "0.65rem",
                fontWeight: 600,
                bgcolor: "dark.soft",
                px: 2,
                py: 0.5,
                borderRadius: "2px",
              }}
            >
              Total Investment
            </Typography>
            <Typography
              level="h4"
              sx={{ fontWeight: 700, color: "dark.main", fontSize: "0.95rem" }}
            >
              <Box className="flex gap-1">
                Rs.
                <NumericLabel params={{ precision: 1, shortFormat: true }}>
                  {sponsor.totalInvestment}
                </NumericLabel>
              </Box>
            </Typography>
          </Box>
        </Box>

        {/* Location & Sponsorships */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {sponsor.location && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocationOnIcon sx={{ fontSize: "1rem", color: "dark.main" }} />
              <Typography
                level="body-xs"
                sx={{ color: "dark.main", fontWeight: 500 }}
              >
                {sponsor.location}
              </Typography>
            </Box>
          )}
          {sponsor.totalSponsorships && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <GroupIcon sx={{ fontSize: "1rem", color: "dark.main" }} />
              <Typography
                level="body-xs"
                sx={{ color: "dark.main", fontWeight: 500 }}
              >
                {sponsor.totalSponsorships} Sponsorships
              </Typography>
            </Box>
          )}
        </Box>

        {/* Demographics Row */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {sponsor.ageGroup && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <GroupIcon sx={{ fontSize: "1rem", color: "dark.main" }} />
              <Typography
                level="body-xs"
                sx={{ color: "dark.main", fontWeight: 600 }}
              >
                {Array.isArray(sponsor.ageGroup)
                  ? sponsor.ageGroup.join(", ")
                  : sponsor.ageGroup}
              </Typography>
            </Box>
          )}
          {sponsor.gender && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <GroupIcon sx={{ fontSize: "1rem", color: "dark.main" }} />
              <Typography
                level="body-xs"
                sx={{ color: "dark.main", fontWeight: 600 }}
              >
                {Array.isArray(sponsor.gender)
                  ? sponsor.gender.join(", ")
                  : sponsor.gender}
              </Typography>
            </Box>
          )}
          {(sponsor.shortDuration || sponsor.longDuration) && (
            <Box className="flex items-center justify-center">
              <Typography level="body-xs" sx={{ color: "white.light" }}>
                ⏱
              </Typography>
              <Typography
                level="body-xs"
                sx={{ color: "dark.main", fontWeight: 600 }}
              >
                {sponsor.longDuration ? "Long Term" : "Short Term"}
              </Typography>
            </Box>
          )}
        </Box>

        {/* CTA Buttons */}
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Button
            component={RouterLink}
            to={`/sponsors/${sponsor?.id}`}
            variant="outlined"
            color="dark"
            sx={{
              flex: 1,
              fontWeight: 600,
              fontSize: "0.85rem",
              py: 1,
              bgcolor: "dark.main",
              color: "white.main",
              "&:hover": {
                bgcolor: "dark.hover",
              },
            }}
          >
            View Full Profile
          </Button>
        </Box>
      </div>
    </Card>
  );
};

export default SponsorCard;
