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
  role: Yup.string().required("Select role")
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

export const socialSchema = Yup.object().shape({
  name: Yup.string().required("Social platform name is required"),
  followerCount: Yup.number()
    .min(0, "Follower count must be positive")
    .required("Follower count is required"),
  URL: Yup.string()
    .url("Please enter a valid URL")
    .required("URL is required"),
});

export const sponsorshipSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  amountSponsored: Yup.number()
    .min(0, "Amount must be positive")
    .required("Amount is required"),
  status: Yup.string().required("Status is required"),
  thumbnail: Yup.mixed().required("Thumbnail is required"),
});

export const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  phone: Yup.string()
    .min(10, "Phone must be at least 10 digits")
    .required("Phone is required"),
});

// Sponsee Profile Schema
const sponseeBase = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  tagline: Yup.string().max(100, "Too Long!"),
  description: Yup.string()
    .min(30, "Must be at least 30 characters")
    .max(300, "Max 300 characters"),
  location: Yup.string(),
  activityType: Yup.string(),
  teamSize: Yup.string(),
  founded: Yup.number()
    .min(1800, "Year seems too old")
    .max(new Date().getFullYear(), "Cannot be a future year"),
});

const sponseeLinks = Yup.object({
  facebook: URLField,
  instagram: URLField,
  linkedin: URLField,
  x: URLField,
  website: URLField,
});

export const sponseeProfileSchema = sponseeBase.concat(sponseeLinks);

// Package Schema
export const packageSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Title must be at least 2 characters")
    .max(80, "Title must be at most 80 characters")
    .required("Title is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .min(0, "Price cannot be negative")
    .required("Price is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters")
    .required("Description is required"),
  deliverables: Yup.array()
    .min(1, "Add at least one deliverable")
    .required("Deliverables are required"),
});

// Pitch Tab Schemas
export const pitchTab0Schema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters")
    .required("Title is required"),
  category: Yup.string().required("Category is required"),
  venue: Yup.string()
    .min(3, "Venue must be at least 3 characters")
    .required("Venue is required"),
  startAt: Yup.date()
    .typeError("Enter a valid start date")
    .required("Start date is required"),
  endAt: Yup.date()
    .typeError("Enter a valid end date")
    .min(Yup.ref("startAt"), "End date cannot be before start date")
    .required("End date is required"),
});

export const pitchTab1Schema = Yup.object().shape({
  expectedAudience: Yup.number()
    .typeError("Must be a number")
    .min(1, "Must be at least 1")
    .required("Expected audience is required"),
  gender: Yup.string().required("Target gender is required"),
  ageGroup: Yup.string().required("Age group is required"),
  occupation: Yup.array()
    .min(1, "Select at least one occupation")
    .required("Occupation is required"),
});

export const pitchTab2Schema = Yup.object().shape({
  opportunities: Yup.array().min(1, "Add at least one opportunity"),
  promotionChannels: Yup.array().min(1, "Add at least one promotion channel"),
  preferences: Yup.array().min(1, "Select at least one sponsorship type"),
});
