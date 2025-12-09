import { useFormik } from "formik";
import { useState } from "react";
import { BasicAlert } from "../../components";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import {
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
  Button,
  Autocomplete,
  Box,
  Typography,
} from "@mui/joy";

import { UploadPhoto } from "../../components";
import { sponsorProfileSchema } from "../../utils/validationSchemas";

export const SponsorOverviewForm = () => {
  const [alertMsg, setAlertMsg] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState();

  const formik = useFormik({
    initialValues: {
      name: "",
      tagline: "",
      description: "",
      location: "",
      industry: "",
      founded: new Date().getFullYear(),
    },
    validationSchema: sponsorProfileSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log(values);
      setSubmitting(false);
    },
  });

  return (
    <>
      {alertMsg && (
        <BasicAlert
          message={alertMsg}
          severity={alertSeverity}
          setAlertMsg={setAlertMsg}
        />
      )}

      <Box component="section">
        <Box className="max-w-4xl mx-auto border-2 border-white-light p-lg rounded-md ">
          <Box className="p-0.5 bg-white relative flex flex-col gap-lg">
            <Box>
              <Typography
                level="title-lg"
                className="pb-2 border-b-2 border-white-light"
              >
                Upload Logo
              </Typography>
            </Box>

            <Box className="upload-photo">
              <UploadPhoto path={"/sponsors"} />
            </Box>

            <Box>
              <Typography
                level="title-lg"
                className="pb-2 border-b-2 border-white-light"
              >
                Overview
              </Typography>
            </Box>

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
                error={formik.touched.tagline && Boolean(formik.errors.tagline)}
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
                error={
                  formik.touched.location && Boolean(formik.errors.location)
                }
              >
                <FormLabel>Location</FormLabel>

                <Autocomplete
                  startDecorator={
                    <LocationOnIcon sx={{ color: "dark.main", fontSize: 20 }} />
                  }
                  autoSelect
                  // placeholder={locationOptions[0]}
                  options={[]}
                  value={formik.values.location}
                  onChange={(e, newValue) => {
                    formik.setFieldValue("location", newValue);
                  }}
                  onBlur={() => formik.setFieldTouched("location", true)}
                />

                {formik.touched.location && formik.errors.location && (
                  <FormHelperText>{formik.errors.location}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                error={
                  formik.touched.industry && Boolean(formik.errors.industry)
                }
              >
                <FormLabel>Industry</FormLabel>

                <Autocomplete
                  startDecorator={
                    <WorkIcon sx={{ color: "dark.main", fontSize: 20 }} />
                  }
                  // placeholder={industryOptions[0]}
                  options={[]}
                  value={formik.values.industry}
                  onChange={(e, newValue) => {
                    formik.setFieldValue("industry", newValue);
                  }}
                  onBlur={() => formik.setFieldTouched("industry", true)}
                />

                {formik.touched.industry && formik.errors.industry && (
                  <FormHelperText>{formik.errors.industry}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                error={formik.touched.founded && Boolean(formik.errors.founded)}
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
    </>
  );
};

export default SponsorOverviewForm;
