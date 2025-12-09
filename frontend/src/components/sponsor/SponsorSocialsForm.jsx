import { useState } from "react";
import { useFormik } from "formik";
import PublicIcon from "@mui/icons-material/Public";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Box,
  Typography,
  Button
} from "@mui/joy";
import { sponsorProfileSchema } from "../../utils/validationSchemas";

export const SponsorSocialsForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      facebook: "",
      instagram: "",
      linkedin: "",
      x: "",
      website: "",
    },
    validationSchema: sponsorProfileSchema,
    onSubmit: (values, { setSubmitting /*, resetForm */ }) => {
      console.log(values);
      setIsSubmitted(true);
      setSubmitting(false);

      // Optional: clear form after submit
      // resetForm();

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    },
  });

  return (
    <Box component="section">
      <Box className="max-w-4xl mx-auto border-2 border-white-light p-lg rounded-md bg-card">
        <Box className="flex flex-col gap-lg">
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-2 gap-sm"
          >
            {/* Social Profile Section */}
            <Box className="col-span-2">
              <Typography
                level="title-lg"
                className=" pb-2 border-b-2 border-white-light"
              >
                Social Links
              </Typography>
            </Box>

            <FormControl
              error={formik.touched.facebook && Boolean(formik.errors.facebook)}
            >
              <FormLabel>facebook</FormLabel>
              <Input
                startDecorator={
                  <FacebookIcon sx={{ color: "dark.main", fontSize: 18 }} />
                }
                type="url"
                name="facebook"
                placeholder="https://yourcompany.com"
                {...formik.getFieldProps("facebook")}
              />

              {formik.touched.facebook && formik.errors.facebook && (
                <FormHelperText>{formik.errors.facebook}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              error={
                formik.touched.instagram && Boolean(formik.errors.instagram)
              }
            >
              <FormLabel>instagram</FormLabel>
              <Input
                startDecorator={
                  <InstagramIcon sx={{ color: "dark.main", fontSize: 18 }} />
                }
                type="url"
                name="instagram"
                placeholder="https://yourcompany.com"
                {...formik.getFieldProps("instagram")}
              />

              {formik.touched.instagram && formik.errors.instagram && (
                <FormHelperText>{formik.errors.instagram}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              error={formik.touched.linkedin && Boolean(formik.errors.linkedin)}
            >
              <FormLabel>linkedin</FormLabel>
              <Input
                startDecorator={
                  <LinkedInIcon sx={{ color: "dark.main", fontSize: 18 }} />
                }
                type="url"
                name="linkedin"
                placeholder="https://yourcompany.com"
                {...formik.getFieldProps("linkedin")}
              />

              {formik.touched.linkedin && formik.errors.linkedin && (
                <FormHelperText>{formik.errors.linkedin}</FormHelperText>
              )}
            </FormControl>

            <FormControl error={formik.touched.x && Boolean(formik.errors.x)}>
              <FormLabel>x</FormLabel>
              <Input
                startDecorator={
                  <XIcon sx={{ color: "dark.main", fontSize: 18 }} />
                }
                type="url"
                name="x"
                placeholder="https://yourcompany.com"
                {...formik.getFieldProps("x")}
              />

              {formik.touched.x && formik.errors.x && (
                <FormHelperText>{formik.errors.x}</FormHelperText>
              )}
            </FormControl>

            {/* Website Section */}
            <Box className="col-span-2">
              <Typography
                level="title-lg"
                className=" pb-2 border-b-2 border-white-light"
              >
                Website
              </Typography>
            </Box>

            {/* Website Link */}
            <FormControl
              error={formik.touched.website && Boolean(formik.errors.website)}
              className="col-span-2"
            >
              <FormLabel>Website Link</FormLabel>
              <Input
                startDecorator={
                  <PublicIcon sx={{ color: "dark.main", fontSize: 18 }} />
                }
                type="url"
                name="website"
                placeholder="https://yourcompany.com"
                {...formik.getFieldProps("website")}
              />

              {formik.touched.website && formik.errors.website && (
                <FormHelperText>{formik.errors.website}</FormHelperText>
              )}
            </FormControl>

            {/* Submit Button */}
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
  );
};

export default SponsorSocialsForm;
