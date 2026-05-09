import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
} from "@mui/joy";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQueryClient } from "@tanstack/react-query";

import { AddContactModal } from "../../../components/AddContactModal";
import { useDelete } from "../../../../../hooks/useDelete";
import { FormFeedback } from "../../../../../components";

export const SponsorContactsForm = () => {
  const queryClient = useQueryClient();
  const sponsor = useSelector((state) => state.Profile?.Data);
  console.log(sponsor)
  const contacts = sponsor?.contacts;

  const [openModal, setOpenModal] = useState(false);
  const [formFeedback, setFormFeedback] = useState();

  const handleClick = () => {
    setOpenModal(true);
  };

  const mutation = useDelete({ path: "contacts" });

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
        <AddContactModal openModal={openModal} setOpenModal={setOpenModal} />
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
                Contacts <Typography level="body-sm">(You can add upto 3 contacts)</Typography>
              </Typography>
              <Button onClick={handleClick}>Add Contact</Button>
            </Box>
            <Box className="col-span-3">
              {contacts?.length > 0 ? (
                <Box className="flex flex-col md:flex-row gap-md">
                  {contacts.map((contact) => (
                    <Card
                      key={contact.id}
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

                        {/* Follower count */}
                        <Box className="flex flex-col gap-md ">
                          <Box className="flex flex-col gap-xs items-start">
                            <Typography
                              level="title-lg"
                              sx={{ color: "dark.main",fontWeight:"bold" }}
                            >
                              {contact.name}
                            </Typography>
                            <Typography
                              level="body-sm"
                            >
                              {contact.email}
                            </Typography>
                            <Typography
                              level="body-sm"
                            >
                              +{contact.phone}
                            </Typography>
                          </Box>

                          <Box className="flex gap-sm">
                            <IconButton
                              variant="soft"
                              color="danger"
                              size="sm"
                              onClick={() => handleDelete(contact.id)}
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
                    No contacts have added now!
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

export default SponsorContactsForm;
