import { useFormik } from "formik";
import { categories, occupations } from "../../../../../utils/constants";
import { sponsorProfileSchema } from "../../../../../utils/validationSchemas";
import {
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  Option,
  Button,
  Box,
  Typography,
  Switch,
} from "@mui/joy";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import WorkIcon from "@mui/icons-material/Work";
import { CustomAutocomplete,FormFeedback } from "../../../../../components";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useUpdateSettings } from "../../../../../hooks/useUpdateSettings";
import { useState } from "react";

export const SponsorPreferencesForm = () => {
  const queryClient = useQueryClient();
  const sponsor = useSelector((state) => state.Profile?.Data);
  const mutation = useUpdateSettings({ path: "sponsors/me" });

  const [formFeedback, setFormFeedback] = useState();

  const formik = useFormik({
    initialValues: {
      minBudget: sponsor?.minBudget || 1000,
      maxBudget: sponsor?.maxBudget || 50000,
      cashSponsorship: sponsor?.cashSponsorship || false,
      inkindSponsorship: sponsor?.inkindSponsorship || false,
      shortDuration: sponsor?.shortDuration || false,
      longDuration: sponsor?.longDuration || false,
      oneTimeDuration: sponsor?.oneTimeDuration || false,
      categories: sponsor?.categories || [],
      gender: sponsor?.gender || "",
      ageGroup: sponsor?.ageGroup || "",
      occupation: sponsor?.occupation || [],
      totalInvestment: sponsor?.totalInvestment || 0,
      totalSponsorships: sponsor?.totalSponsorships || 0,
    },
    validationSchema: sponsorProfileSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values)
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
    <Box component="section" sx={{ py: { xs: 2, md: 0 } }}>
      <Box className="max-w-4xl  mx-auto sm:border-2 sm:border-white-light sm:p-6 p-lg rounded-md ">
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-2 gap-lg"
        >
          {formFeedback && (
            <FormFeedback
              severity={formFeedback.severity}
              message={formFeedback.message}
            />
          )}
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
          className="col-span-2 sm:col-span-1"
            error={formik.touched.minBudget && Boolean(formik.errors.minBudget)}
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
          className="col-span-2 sm:col-span-1"
            error={formik.touched.maxBudget && Boolean(formik.errors.maxBudget)}
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
          className="col-span-2 sm:col-span-1"
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
          className="col-span-2 sm:col-span-1"
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
              <Option value="both">Both</Option>
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
          className="col-span-2 sm:col-span-1"
            error={
              formik.touched.cashSponsorship &&
              Boolean(formik.errors.cashSponsorship)
            }
          >
            <Box className="flex gap-2 items-center">
              <FormLabel>Cash Sponsorhip</FormLabel>
              <Switch
                name="cashSponsorship"
                checked={formik.values.cashSponsorship}
                onChange={(e) => {
                  formik.setFieldValue("cashSponsorship", e.target.checked);
                }}
              />
            </Box>
            {formik.touched.cashSponsorship &&
              formik.errors.cashSponsorship && (
                <FormHelperText>{formik.errors.cashSponsorship}</FormHelperText>
              )}
          </FormControl>

          <FormControl
          className="col-span-2 sm:col-span-1"
            error={
              formik.touched.inkindSponsorship &&
              Boolean(formik.errors.inkindSponsorship)
            }
          >
            <Box className="flex gap-2 items-center">
              <FormLabel>In-kind Sponsorship</FormLabel>
              <Switch
                name="inkindSponsorship"
                checked={formik.values.inkindSponsorship}
                onChange={(e) => {
                  formik.setFieldValue("inkindSponsorship", e.target.checked);
                }}
              />
            </Box>
            {formik.touched.inkindSponsorship &&
              formik.errors.inkindSponsorship && (
                <FormHelperText>
                  {formik.errors.inkindSponsorship}
                </FormHelperText>
              )}
          </FormControl>

          <FormControl
          className="col-span-2 sm:col-span-1"
            error={
              formik.touched.shortDuration &&
              Boolean(formik.errors.shortDuration)
            }
          >
            <Box className="flex gap-2 items-center">
              <FormLabel>Short-term Duration</FormLabel>
              <Switch
                name="shortDuration"
                checked={formik.values.shortDuration}
                onChange={(e) => {
                  formik.setFieldValue("shortDuration", e.target.checked);
                }}
              />
            </Box>
            {formik.touched.shortDuration && formik.errors.shortDuration && (
              <FormHelperText>{formik.errors.shortDuration}</FormHelperText>
            )}
          </FormControl>

          <FormControl
          className="col-span-2 sm:col-span-1"
            error={
              formik.touched.longDuration && Boolean(formik.errors.longDuration)
            }
          >
            <Box className="flex gap-2 items-center">
              <FormLabel>Long-term Duration</FormLabel>
              <Switch
                name="longDuration"
                checked={formik.values.longDuration}
                onChange={(e) => {
                  formik.setFieldValue("longDuration", e.target.checked);
                }}
              />
            </Box>
            {formik.touched.longDuration && formik.errors.longDuration && (
              <FormHelperText>{formik.errors.longDuration}</FormHelperText>
            )}
          </FormControl>

          <FormControl
          className="col-span-2 sm:col-span-1"
            error={
              formik.touched.oneTimeDuration &&
              Boolean(formik.errors.oneTimeDuration)
            }
          >
            <Box className="flex gap-2 items-center">
              <FormLabel>One-time Duration</FormLabel>
              <Switch
                name="oneTimeDuration"
                checked={formik.values.oneTimeDuration}
                onChange={(e) => {
                  formik.setFieldValue("oneTimeDuration", e.target.checked);
                }}
              />
            </Box>
            {formik.touched.oneTimeDuration &&
              formik.errors.oneTimeDuration && (
                <FormHelperText>{formik.errors.oneTimeDuration}</FormHelperText>
              )}
          </FormControl>

          <FormControl
          className="col-span-2"
            error={
              formik.touched.categories && Boolean(formik.errors.categories)
            }
          >
            <FormLabel>Categories</FormLabel>

            <CustomAutocomplete
              options={categories}
              formik={formik}
              value={formik.values.categories}
              fieldName={"categories"}
              multiple={true}
              limit={5}
              startDecorator={<CategoryIcon />}
              allowUserInput={true}
            />

            {formik.touched.categories && formik.errors.categories && (
              <FormHelperText>{formik.errors.categories}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            error={
              formik.touched.occupation && Boolean(formik.errors.occupation)
            }
            className="col-span-2"
          >
            <FormLabel>Occupations</FormLabel>

            <CustomAutocomplete
              options={occupations}
              formik={formik}
              value={formik.values.occupation}
              fieldName={"occupation"}
              multiple={true}
              limit={5}
              startDecorator={<WorkIcon />}
              allowUserInput={false}
            />

            {formik.touched.occupation && formik.errors.occupation && (
              <FormHelperText>{formik.errors.occupation}</FormHelperText>
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
  );
};

export default SponsorPreferencesForm;
