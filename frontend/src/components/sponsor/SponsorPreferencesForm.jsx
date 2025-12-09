import { useFormik } from "formik";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PersonIcon from "@mui/icons-material/Person";
import { BasicAlert } from "..";
import { categories } from "../../utils/constants";
import { sponsorProfileSchema } from "../../utils/validationSchemas";
import {
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
  Select,
  Option,
  Checkbox,
  Button,
  Autocomplete,
  RadioGroup,
  Box,
  Typography,
} from "@mui/joy";

export const SponsorPreferencesForm = ({ activeTab }) => {
  const [alertMsg, setAlertMsg] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState();

  const formik = useFormik({
    initialValues: {
      minBudget: 1000,
      maxBudget: 50000,
      sponsorshipTypes: [],
      durationPreference: "",
      categories: [],
      gender: "",
      ageGroup: "",
    },
    validationSchema: sponsorProfileSchema,
    onSubmit: (values, { setSubmitting }) => {
      setAlertMsg(null);

      // Simulate API call delay
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
        <Box className="max-w-4xl  mx-auto border-2 border-white-light p-lg rounded-md ">
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-2 gap-lg"
          >
            <Box className="col-span-2">
              <Typography
                level="title-lg"
                className="pb-2 border-b-2 border-white-light"
              >
                Budget Details
              </Typography>
            </Box>
            {/* Min Budget Field */}
            <FormControl
              error={
                formik.touched.minBudget && Boolean(formik.errors.minBudget)
              }
            >
              <FormLabel>Min Budget</FormLabel>
              <Input
                startDecorator={
                  <AttachMoneyIcon sx={{ color: "dark.main", fontSize: 20 }} />
                }
                type="number"
                name="maxBudget"
                placeholder="Min Amount"
                {...formik.getFieldProps("minBudget")}
              />

              {formik.touched.minBudget && formik.errors.minBudget && (
                <FormHelperText>{formik.errors.minBudget}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              error={
                formik.touched.maxBudget && Boolean(formik.errors.maxBudget)
              }
            >
              <FormLabel>Max Budget</FormLabel>
              <Input
                startDecorator={
                  <AttachMoneyIcon sx={{ color: "dark.main", fontSize: 20 }} />
                }
                type="number"
                name="maxBudget"
                placeholder="Max Amount"
                {...formik.getFieldProps("maxBudget")}
              />

              {formik.touched.maxBudget && formik.errors.maxBudget && (
                <FormHelperText>{formik.errors.maxBudget}</FormHelperText>
              )}
            </FormControl>

            <Box className="col-span-2">
              <Typography
                level="title-lg"
                className="pb-2 border-b-2 border-white-light"
              >
                Target Audience
              </Typography>
            </Box>

            <FormControl
              error={formik.touched.ageGroup && Boolean(formik.errors.ageGroup)}
            >
              <FormLabel>Age Group</FormLabel>
              <Select
                startDecorator={
                  <PersonIcon sx={{ color: "dark.main", fontSize: 20 }} />
                }
                name="ageGroup"
                value={formik.values.ageGroup}
                onChange={(e, newValue) => {
                  formik.setFieldValue("ageGroup", newValue);
                }}
              >
                <Option value="" disabled>
                  Select Age Group
                </Option>
                <Option value="13-17">13-17 years</Option>
                <Option value="18-24">18-24 years</Option>
                <Option value="25-34">25-34 years</Option>
                <Option value="35-44">35-44 years</Option>
                <Option value="45-54">45-54 years</Option>
                <Option value="55-64">55-64 years</Option>
                <Option value="65+">65+ years</Option>
              </Select>

              {formik.touched.ageGroup && formik.errors.ageGroup && (
                <FormHelperText className="text-sm text-red-600">
                  {formik.errors.ageGroup}
                </FormHelperText>
              )}
            </FormControl>

            {/* Gender Field - Changed to a select dropdown for better user experience */}
            <FormControl
              error={formik.touched.gender && Boolean(formik.errors.gender)}
            >
              <FormLabel>Gender</FormLabel>
              <Select
                startDecorator={
                  <PersonIcon sx={{ color: "dark.main", fontSize: 20 }} />
                }
                name="gender"
                value={formik.values.gender}
                onChange={(e, newValue) => {
                  formik.setFieldValue("gender", newValue);
                }}
              >
                <Option value="" disabled>
                  Select Gender
                </Option>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Both</Option>
              </Select>

              {formik.touched.gender && formik.errors.gender && (
                <FormHelperText>{formik.errors.gender}</FormHelperText>
              )}
            </FormControl>

            <Box className="col-span-2">
              <Typography
                level="title-lg"
                className="pb-2 border-b-2 border-white-light"
              >
                Other Preferences
              </Typography>
            </Box>

            <FormControl
              error={
                formik.touched.durationPreference &&
                Boolean(formik.errors.durationPreference)
              }
            >
              <FormLabel>Duration Preference</FormLabel>

              <Select
                startDecorator={
                  <AccessTimeIcon sx={{ color: "dark.main", fontSize: 20 }} />
                }
                name="durationPreference"
                value={formik.values.durationPreference}
                onChange={(e, newValue) => {
                  formik.setFieldValue("durationPreference", newValue);
                }}
              >
                <Option value="" disabled>
                  Select duration
                </Option>
                <Option value="short">Short-term (1-6 months)</Option>
                <Option value="oneTime">One-time Event</Option>
                <Option value="long">Long-term (1+ years)</Option>
              </Select>

              {formik.touched.durationPreference &&
                formik.errors.durationPreference && (
                  <FormHelperText>
                    {formik.errors.durationPreference}
                  </FormHelperText>
                )}
            </FormControl>

            <FormControl
              error={
                formik.touched.sponsorshipTypes &&
                Boolean(formik.errors.sponsorshipTypes)
              }
            >
              <FormLabel>Sponsorship Type</FormLabel>

              <Autocomplete
                multiple
                options={["cash", "inkind"]}
                value={formik.values.sponsorshipTypes}
                onChange={(e, newValue) => {
                  formik.setFieldValue("sponsorshipTypes", newValue);
                }}
                onBlur={() => formik.setFieldTouched("sponsorshipTypes", true)}
              />

              {formik.touched.sponsorshipTypes &&
                formik.errors.sponsorshipTypes && (
                  <FormHelperText>
                    {formik.errors.sponsorshipTypes}
                  </FormHelperText>
                )}
            </FormControl>

            <FormControl
              error={
                formik.touched.categories && Boolean(formik.errors.categories)
              }
              className="col-span-2"
            >
              <FormLabel>Categories</FormLabel>

              <Autocomplete
                multiple
                options={categories}
                value={formik.values.categories}
                onChange={(e, newValue) => {
                  formik.setFieldValue("categories", newValue);
                }}
                onBlur={() => formik.setFieldTouched("categories", true)}
              />

              {formik.touched.categories && formik.errors.categories && (
                <FormHelperText>{formik.errors.categories}</FormHelperText>
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
    </>
  );
};

export default SponsorPreferencesForm;
