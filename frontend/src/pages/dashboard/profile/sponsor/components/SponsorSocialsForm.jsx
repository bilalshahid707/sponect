import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  AspectRatio,
  Card,
} from "@mui/joy";
import { AddSocialModal } from "../../../components/AddSocialModal";
import { useSelector } from "react-redux";
import NumericLabel from "react-pretty-numbers";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useQueryClient } from "@tanstack/react-query";
import { FormFeedback } from "../../../../../components";
import {useDelete} from "../../../../../hooks/useDelete"
import { brandImages } from "../../../../../utils/constants";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const SponsorSocialsForm = () => {
  const queryClient = useQueryClient();
  const sponsor = useSelector((state) => state.Profile?.Data);
  const socials = sponsor?.socials;

  const [openModal, setOpenModal] = useState(false);
  const [formFeedback, setFormFeedback] = useState();

  const handleClick = () => {
    setOpenModal(true);
  };

  const mutation = useDelete({path:"socials"})

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
    <Box component="section" sx={{ py: { xs: 2, md: 0 } }}>
      {openModal && (
        <AddSocialModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <Box className="max-w-4xl mx-auto sm:border-2 sm:border-white-light sm:p-6 p-lg rounded-md bg-card">
        <Box className="flex flex-col gap-lg">
          <Box component="container" className="grid grid-cols-3 gap-sm">
            {/* Social Profile Section */}
            {formFeedback && (
              <FormFeedback
                severity={formFeedback.severity}
                message={formFeedback.message}
              />
            )}
            <Box className="flex flex-col sm:flex-row justify-between col-span-3">
              <Typography
                level="title-lg"
                className=" pb-2 border-b-2 border-white-light"
              >
                Social Links
              </Typography>
              <Button onClick={handleClick}>Connect Social</Button>
            </Box>
            <Box className="col-span-3">
              {socials?.length > 0 ? (
                <Box className="flex flex-col md:flex-row gap-md">
                  {socials.map((social) => (
                    <Card
                      key={social.id}
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
                      <Box className="flex flex-col sm:flex-row gap-md h-full">
                        <Box className="flex items-center gap-md">
                          <AspectRatio
                            ratio={1}
                            variant="plain"
                            sx={{
                              width: 64,
                              borderRadius: "100%",
                            }}
                          >
                            {brandImages[social.name]?<img src={brandImages[social.name].logo} alt={social.name}/>:social.name[0]}
                          </AspectRatio>
                        </Box>

                        {/* Follower count */}
                        <Box className="flex flex-col gap-md ">
                          <Box className="flex flex-col gap-xs items-start">
                            <Typography
                              level="body-sm"
                              sx={{ color: "dark.main" }}
                            >
                              Followers
                            </Typography>
                            <Typography
                              level="title-lg"
                              sx={{ fontWeight: "bold" }}
                            >
                              <NumericLabel
                                params={{ precision: 1, shortFormat: true }}
                              >
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
                  ))}
                </Box>
              ) : (
                <Box
                  className="text-center py-lg"
                  sx={{
                    p: 3,
                    bgcolor: "background.level2",
                    borderRadius: "sm",
                  }}
                >
                  <Typography level="body-md" sx={{ color: "neutral.600" }}>
                    No socials have connected now!
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SponsorSocialsForm;
