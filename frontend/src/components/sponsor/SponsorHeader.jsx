import {
  MapPin,
  Calendar,
  Building2,
  Share2,
  Heart,
  MessageSquare,
} from "lucide-react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Chip from "@mui/joy/Chip";
import AspectRatio from "@mui/joy/AspectRatio";

export const SponsorHeader = ({ sponsor }) => {
  return (
    <Box>
      {/* Cover Image */}
      <Box
        sx={{
          height: { xs: 200, md: 280, lg: 320 },
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=400&fit=crop"
          alt="Cover"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(2, 55, 64, 0.85) 0%, rgba(2, 55, 64, 0.4) 50%, transparent 100%)",
          }}
        />
      </Box>

      {/* Profile Section */}
      <Box className="container">
        <Box class="relative -mt-16 md:-mt-20 pb-3">
          <Box className="flex flex-col md:flex-row w-full justify-between gap-4">
            {/* Logo */}
            <Box className="relative">
              <Box class="w-30 h-30 md:w-40 md:h-40 rounded-xl border-2 border-white bg-background-surface shadow-xl overflow-hidden">
                <AspectRatio variant="plain" ratio={1}>
                  <img src={sponsor?.logo} alt={sponsor?.name} />
                </AspectRatio>
              </Box>
              <Chip
                size="sm"
                variant="solid"
                sx={{
                  position: "absolute",
                  bottom: -8,
                  right: -8,
                }}
              >
                Active Sponsor
              </Chip>
            </Box>

            {/* Info */}
            <Box className="flex-1 md:self-end">
              <Box className="flex flex-col md:flex-row items-start gap-4 md:items-center justify-between">
                <Box>
                  <Typography
                    level="h1"
                    sx={{
                      color: "dark.main",
                      mb: 0.5,
                    }}
                  >
                    {sponsor?.name}
                    Mango
                  </Typography>
                  <Typography
                    level="title-lg"
                    sx={{
                      color: "dark.lighter",
                      fontWeight: 500,
                      mb: 1.5,
                    }}
                  >
                    {sponsor?.tagline}
                    tagline
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                      color: "neutral.500",
                      fontSize: "sm",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <MapPin size={16} />
                      <Typography level="body-sm">
                        {sponsor?.location}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Building2 size={16} />
                      <Typography level="body-sm">
                        {sponsor?.industry}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Calendar size={16} />
                      <Typography level="body-sm">
                        Founded {sponsor?.founded}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Actions */}
                <Box class="flex items-center gap-2">
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    sx={{
                      borderRadius: "50%",
                      borderColor: "dark.main",
                      "&:hover": {
                        bgcolor: "primary.main",
                        borderColor: "primary.main",
                        color: "white.main",
                        transition: "all 0.15s",
                      },
                    }}
                  >
                    <Heart size={20} />
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    sx={{
                      borderRadius: "50%",
                      borderColor: "dark.main",
                      "&:hover": {
                        bgcolor: "primary.main",
                        borderColor: "primary.main",
                        color: "white.main",
                        transition: "all 0.15s",
                      },
                    }}
                  >
                    <Share2 size={20} />
                  </IconButton>
                  <Button
                    startDecorator={<MessageSquare size={20} />}
                    variant="solid"
                    sx={{
                      width: "100%",
                      backgroundColor: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                        transition: "0.15s ",
                      },
                    }}
                  >
                    Contact Sponsor
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SponsorHeader;
