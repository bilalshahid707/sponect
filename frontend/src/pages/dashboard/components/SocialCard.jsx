import {
  Box,
  Card,
  AspectRatio,
  Typography,
  Button,
  IconButton,
} from "@mui/joy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "@mui/icons-material/Delete";
import NumericLabel from "react-pretty-numbers";
import { brandImages } from "../../../utils/constants";
import { useDelete } from "../../../hooks/useDelete";
import { useQueryClient } from "@tanstack/react-query";

export const SocialCard = ({ social,setFormFeedback }) => {
  const queryClient = useQueryClient();
  const mutation = useDelete({ path: "socials" });

  const handleDelete = (id) => {
    mutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        setFormFeedback({
          severity: "success",
          message: "Deleted succesfully",
        });
      },
      onError: (error) => {
        setFormFeedback({
          severity: "error",
          message: error.response?.data?.message || error.message,
        });
      },
    });
  };

  return (
    <Card
      variant="outlined"
      sx={{
        flexShrink: 0,
        boxShadow: "sm",
        borderColor: "divider",
        transition: "all 0.3s ease",
        bgcolor: "white.main",
        minWidth: "max-content",
        "&:hover": {
          boxShadow: "md",
          borderColor: "primary.main",
        },
      }}
    >
      <Box className="flex flex-col items-center gap-md h-full">
        <Box className="flex items-center gap-md">
          <AspectRatio
            ratio={1}
            variant="plain"
            objectFit="cover"
            sx={{
              width: 48,
            }}
          >
            {brandImages[social.name] ? (
              <img src={brandImages[social.name].logo} alt={social.name} />
            ) : (
              social.name[0]
            )}
          </AspectRatio>
        </Box>

        {/* Follower count */}
        <Box className="flex flex-col gap-md">
          <Box className="flex flex-col gap-xs items-start">
            <Typography level="body-sm" sx={{ color: "dark.main" }}>
              Followers
            </Typography>
            <Typography level="title-lg" sx={{ fontWeight: "bold" }}>
              <NumericLabel params={{ precision: 1, shortFormat: true }}>
                {social.followerCount}
              </NumericLabel>
            </Typography>
          </Box>

          <Box className="flex gap-sm">
            <Button
              component="a"
              href={social.URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="soft"
              color="primary"
              size="sm"
              endDecorator={<OpenInNewIcon />}
              sx={{ flex: 1 }}
            >
              Visit
            </Button>
            <IconButton
              variant="soft"
              color="danger"
              size="sm"
              onClick={() => handleDelete(social.id)}
              disabled={mutation.isPending}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Action buttons */}
      </Box>
    </Card>
  );
};

export default SocialCard;
