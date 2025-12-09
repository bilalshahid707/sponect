import * as Yup from "yup";
import validator from "validator";

const URLField = Yup.string()
  .trim()
  .transform((value) => (value === "" ? undefined : value))
  .url("Please enter a valid URL")
  .max(255, "Link must be at most 255 characters")
  .notRequired();

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Password is required"),
});

export const signupSchema = Yup.object({
  username: Yup.string().required("username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const profileSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),

  email: Yup.string()
    .required("Valid email is required")
    .test(
      "is-valid-email",
      "Please enter valid email",
      (value) => value && validator.isEmail(value)
    ),

  phone: Yup.string().required("Phone number is required"),

  designation: Yup.string().required("Designation is required"),
});

// Sponsor Profile Schema
const sponsorBase = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  tagline: Yup.string().max(100, "Too Long!"),
  description: Yup.string()
    .min(30, "Must be at least 30 characters")
    .max(300, "Max 300 characters"),
  location: Yup.string(),
  industry: Yup.string(),
  founded: Yup.number()
    .min(1800, "Year seems too old")
    .max(new Date().getFullYear(), "Cannot be a future year"),
});

const sponsorPreferences = Yup.object().shape({
  minBudget: Yup.number().min(0, "Must be positive"),
  maxBudget: Yup.number().min(
    Yup.ref("minBudget"),
    "Max budget cannot be less than min budget"
  ),
  durationPreference: Yup.string(),
  sponsorshipTypes: Yup.array().min(1, "Select at least one sponsorship type"),
  categories: Yup.array().min(1, "Select at least one category"),
});

const sponsorLinks = Yup.object({
  facebook: URLField,
  instagram: URLField,
  linkedin: URLField,
  x: URLField,
  website: URLField,
});
export const sponsorProfileSchema = sponsorBase.concat(
  sponsorPreferences,
  sponsorLinks
);
