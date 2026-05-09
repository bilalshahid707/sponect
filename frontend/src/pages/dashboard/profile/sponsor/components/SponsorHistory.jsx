import { useFormik } from "formik";
import {
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Button,
  Box,
  Typography,
} from "@mui/joy";
import { sponsorProfileSchema } from "../../../../../utils/validationSchemas";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { AddSponsorship } from "./AddSponsorship";
import { useUpdateSettings } from "../../../../../hooks/useUpdateSettings";
import { FormFeedback } from "../../../../../components";

export const SponsorHistory = () => {
  const queryClient = useQueryClient();
  const sponsor = useSelector((state) => state.Profile?.Data);
  const sponsorships = sponsor?.sponsorships;
  const mutation = useUpdateSettings({ path: "sponsors/me" });

  const [openModal, setOpenModal] = useState(false);
  const [formFeedback, setFormFeedback] = useState();

  const handleClick = () => {
    setOpenModal(true);
  };
  const formik = useFormik({
    initialValues: {
      totalInvestment: sponsor?.totalInvestment || 0,
      totalSponsorships: sponsor?.totalSponsorships || 0,
    },
    validationSchema: sponsorProfileSchema,
    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          setFormFeedback({
            severity: "success",
            message: "Settings saved successfully",
          });
        },
        onError: (error) => {
          setFormFeedback({
            severity: "error",
            message: error.response?.data?.message || error.message,
          });
        },
        onSettled: () => {
          setSubmitting(false);
        },
      });
    },
  });
  return (
    <Box component="section">
      {openModal && (
        <AddSponsorship openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <Box className="max-w-4xl mx-auto sm:border-2 sm:border-white-light sm:p-6 p-lg rounded-md ">
        <Box className="p-0.5 bg-white relative flex flex-col gap-lg">
          <Box>
            <Typography
              level="title-lg"
              className="pb-2 border-b-2 border-white-light"
            >
              History
            </Typography>
          </Box>

          {formFeedback && (
            <FormFeedback
              severity={formFeedback.severity}
              message={formFeedback.message}
            />
          )}
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-2 gap-sm"
          >
            <FormControl
              error={
                formik.touched.totalSponsorships &&
                formik.errors.totalSponsorships
              }
              className="col-span-2 sm:col-span-1"
            >
              <FormLabel className="input-label">Total Sponsorships</FormLabel>
              <Input
                type="number"
                name="totalSponsorships"
                placeholder="24"
                {...formik.getFieldProps("totalSponsorships")}
              />
              {formik.touched.totalSponsorships &&
                formik.errors.totalSponsorships && (
                  <FormHelperText>
                    {formik.errors.totalSponsorships}
                  </FormHelperText>
                )}
            </FormControl>

            <FormControl
              className="col-span-2 sm:col-span-1"
              error={
                formik.touched.totalInvestment &&
                Boolean(formik.errors.totalInvestment)
              }
            >
              <FormLabel className="input-label">Total Investment</FormLabel>
              <Input
                name="totalInvestment"
                placeholder="200000"
                {...formik.getFieldProps("totalInvestment")}
              />

              {formik.touched.totalInvestment &&
                formik.errors.totalInvestment && (
                  <FormHelperText>
                    {formik.errors.totalInvestment}
                  </FormHelperText>
                )}
            </FormControl>

            <Box className="col-span-2 mt-sm">
              <Button
                type="submit"
                variant="solid"
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
                sx={{
                  width: "100%",
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    transition: "0.15s ",
                  },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>

          <Box className="flex justify-between">
            <Typography
              level="title-lg"
              className="pb-2 border-b-2 border-white-light"
            >
              Sponsorships
              <Typography level="body-sm">
                {" "}
                (You can add upto 3 inactive and 3 active sponsorships)
              </Typography>
            </Typography>
            <Button onClick={handleClick}>Add Sponsorship</Button>
          </Box>

          {sponsorships?.length > 0 ? (
            <Box className="gap-2 grid grid-cols-1">
              {sponsorships.map((sponsorship) => (
                <Box
                  key={sponsorship.id}
                  className="relative flex flex-col sm:flex-row rounded-lg shadow-lg overflow-hidden w-full h-max"
                >
                  <img
                    src={sponsorship.thumbnailURL}
                    alt=""
                    className="h-40 w-40"
                  />
                  <Box className="flex flex-col gap-2 p-md">
                    <Typography level="title-md">
                      {sponsorship.title}
                    </Typography>
                    <Typography level="body-md">
                      {sponsorship.description}
                    </Typography>
                    <Typography level="title-md">Sponsored</Typography>
                    <Typography level="body-md">
                      {sponsorship.amountSponsored}
                    </Typography>
                  </Box>
                  <Typography
                    level="body-xs"
                    className={`absolute ${sponsorship.status === "active" ? "bg-primary" : "bg-dark"} p-sm text-white right-0`}
                    sx={{
                      color: "white",
                    }}
                  >
                    {sponsorship.status}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography>You have not added any sponsorship</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SponsorHistory;
