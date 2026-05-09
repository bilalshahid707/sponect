import { useFormik } from "formik";
import {
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
  Button,
  Box,
  Typography,
  CircularProgress,
  Select,
  Option
} from "@mui/joy";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

import { CustomAutocomplete, FormFeedback } from "../../../../../components";
import { FileUploader } from "../../../components/FileUploader";
import { sponseeProfileSchema } from "../../../../../utils/validationSchemas";
import { activityTypes, teamSizes, cities } from "../../../../../utils/constants";

import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useUpdateSettings } from "../../../../../hooks/useUpdateSettings";

export const SponseeOverviewForm = () => {
  const queryClient = useQueryClient();
  const sponsee = useSelector((state) => state.Profile?.Data);
  const mutation = useUpdateSettings({ path: "sponsees/me" });

  const [formFeedback, setFormFeedback] = useState();

  const formik = useFormik({
    initialValues: {
      name: sponsee?.name || "",
      tagline: sponsee?.tagline || "",
      description: sponsee?.description || "",
      location: sponsee?.location || "",
      founded: sponsee?.founded || new Date().getFullYear(),
      totalCollaborations: sponsee?.totalCollaborations || 0,
      teamSize: sponsee?.teamSize || "",
      audienceReach: sponsee?.audienceReach || 0,
      activityTypes: sponsee?.activityTypes || ["other"],
    },
    validationSchema: sponseeProfileSchema,
    enableReinitialize: true,
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
    <>
      {sponsee ? (
        <Box component="section" sx={{ py: { xs: 2, md: 0 } }}>
          <Box className="max-w-4xl mx-auto sm:border-2 sm:border-white-light sm:p-6 p-lg rounded-md ">
            <Box className="p-0.5 bg-white relative flex flex-col gap-lg">
              <Typography level="title-lg" className="pb-2 border-b-2 border-white-light">
                Images
              </Typography>

              <Box className="flex gap-4">
                <Box className="flex flex-col gap-1.5">
                  <Typography level="body-sm" sx={{ color: "text.secondary" }}>Logo</Typography>
                  <FileUploader
                    path={"sponsees/me/logo"}
                    src={sponsee?.logo?.url}
                    queryKey={"profile"}
                    mediaName={"logo"}
                    type="general"
                    className="w-36"
                  />
                </Box>
                <Box className="flex flex-col gap-1.5 flex-1">
                  <Typography level="body-sm" sx={{ color: "text.secondary" }}>Cover</Typography>
                  <FileUploader
                    path={"sponsees/me/cover"}
                    src={sponsee?.cover?.url}
                    queryKey={"profile"}
                    mediaName={"cover"}
                    type="cover"
                    className="w-full"
                  />
                </Box>
              </Box>

              <Box>
                <Typography
                  level="title-lg"
                  className="pb-2 border-b-2 border-white-light"
                >
                  Overview
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
                  error={formik.touched.name && formik.errors.name}
                  className="col-span-2"
                >
                  <FormLabel className="input-label">Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    placeholder="e.g., Quantum Innovations Inc."
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <FormHelperText>{formik.errors.name}</FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  className="col-span-2"
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                >
                  <FormLabel className="input-label">Description</FormLabel>
                  <Textarea
                    name="description"
                    minRows={4}
                    placeholder="Describe your company's mission, values, and primary services in 4 to 6 sentences."
                    {...formik.getFieldProps("description")}
                  />

                  {formik.touched.description && formik.errors.description && (
                    <FormHelperText>{formik.errors.description}</FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  className="col-span-2 sm:col-span-1"
                  error={
                    formik.touched.tagline && Boolean(formik.errors.tagline)
                  }
                >
                  <FormLabel>Tagline</FormLabel>
                  <Input
                    type="text"
                    name="tagline"
                    placeholder="e.g., Building the future, today."
                    {...formik.getFieldProps("tagline")}
                  />

                  {formik.touched.tagline && formik.errors.tagline && (
                    <FormHelperText>{formik.errors.tagline}</FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  className="col-span-2 sm:col-span-1"
                  error={
                    formik.touched.location && Boolean(formik.errors.location)
                  }
                >
                  <FormLabel>Location</FormLabel>
                  <CustomAutocomplete
                    formik={formik}
                    value={formik.values.location}
                    options={cities}
                    fieldName={"location"}
                    startDecorator={<LocationOnIcon />}
                    allowUserInput={true}
                  />
                  {formik.touched.location && formik.errors.location && (
                    <FormHelperText>{formik.errors.location}</FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  className="col-span-2 sm:col-span-1"
                  error={
                    formik.touched.founded && Boolean(formik.errors.founded)
                  }
                >
                  <FormLabel className="input-label">Founded (Year)</FormLabel>

                  <Input
                    type="number"
                    name="founded"
                    placeholder={new Date().getFullYear()}
                    min="1900"
                    max={new Date().getFullYear()}
                    {...formik.getFieldProps("founded")}
                  />

                  {formik.touched.founded && formik.errors.founded && (
                    <FormHelperText>{formik.errors.founded}</FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  className="col-span-2 sm:col-span-1"
                  error={
                    formik.touched.totalCollaborations &&
                    Boolean(formik.errors.totalCollaborations)
                  }
                >
                  <FormLabel className="input-label">
                    Total Collaborations
                  </FormLabel>

                  <Input
                    type="number"
                    name="totalCollaborations"
                    placeholder={24}
                    {...formik.getFieldProps("totalCollaborations")}
                  />

                  {formik.touched.totalCollaborations &&
                    formik.errors.totalCollaborations && (
                      <FormHelperText>
                        {formik.errors.totalCollaborations}
                      </FormHelperText>
                    )}
                </FormControl>

                <FormControl
                  className="col-span-2 sm:col-span-1"
                  error={
                    formik.touched.audienceReach &&
                    Boolean(formik.errors.audienceReach)
                  }
                >
                  <FormLabel className="input-label">Audience Reach</FormLabel>

                  <Input
                    type="number"
                    name="audienceReach"
                    placeholder={24}
                    {...formik.getFieldProps("audienceReach")}
                  />

                  {formik.touched.audienceReach &&
                    formik.errors.audienceReach && (
                      <FormHelperText>
                        {formik.errors.audienceReach}
                      </FormHelperText>
                    )}
                </FormControl>

                <FormControl
                  className="col-span-2 sm:col-span-1"
                  error={
                    formik.touched.teamSize && Boolean(formik.errors.teamSize)
                  }
                >
                  <FormLabel>Team Size</FormLabel>
                  <Select
                    startDecorator={
                      <PersonIcon sx={{ color: "dark.main", fontSize: 20 }} />
                    }
                    name="ageGroup"
                    value={formik.values.teamSize}
                    onChange={(e, newValue) => {
                      formik.setFieldValue("teamSize", newValue);
                    }}
                  >
                    <Option value="" disabled>
                      Select Team Size
                    </Option>
                    {teamSizes.map((size) => (
                      <Option key={size} value={size}>
                        {size}
                      </Option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl
                  className="col-span-2"
                  error={
                    formik.touched.activityTypes &&
                    Boolean(formik.errors.activityTypes)
                  }
                >
                  <FormLabel>Activity Types</FormLabel>
                  <CustomAutocomplete
                    formik={formik}
                    value={formik.values.activityTypes}
                    options={activityTypes}
                    fieldName={"activityTypes"}
                    startDecorator={<LocationOnIcon />}
                    multiple={true}
                  />
                  {formik.touched.activityTypes &&
                    formik.errors.activityTypes && (
                      <FormHelperText>
                        {formik.errors.activityTypes}
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
            </Box>
          </Box>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default SponseeOverviewForm;
