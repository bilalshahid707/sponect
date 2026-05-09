import { useState } from "react";
import { Box, Typography, Button } from "@mui/joy";
import { AddSocialModal } from "../../../components/AddSocialModal";
import { useSelector } from "react-redux";
import { SocialCard } from "../../../components/SocialCard";
import { FormFeedback } from "../../../../../components";

export const SponseeSocialsForm = () => {
  const sponsee = useSelector((state) => state.Profile?.Data);
  const socials = sponsee?.socials;
  const [formFeedback, setFormFeedback] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(true);
  };

  return (
    <Box component="section" sx={{ py: { xs: 2, md: 0 } }}>
      {openModal && (
        <AddSocialModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <Box className="max-w-4xl mx-auto sm:border-2 sm:border-white-light sm:p-6 p-lg rounded-md bg-card">
        <Box className="flex flex-col gap-lg">
          <Box component="container" className="grid grid-cols-3 gap-sm">
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
                <Box className="flex flex-col items-center justify-between md:flex-row flex-wrap gap-md">
                  {socials.map((social) => (
                    <SocialCard
                      key={social.id}
                      social={social}
                      setFormFeedback={setFormFeedback}
                    />
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

export default SponseeSocialsForm;
