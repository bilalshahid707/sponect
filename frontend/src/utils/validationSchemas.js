import * as Yup from "yup";
import validator from "validator";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Password is required"),
});

export const signupSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/[0-9+\s()-]{7,}/, "Enter a valid phone number")
    .required("Phone number is required"),
  accountType: Yup.string().required("Please select an account type"),
  organizationName: Yup.string().required("Organization Name is required"),
  designation: Yup.string().required("Designation is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const profileSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name is required"),

  email: Yup.string()
    .required("Valid email is required")
    .test(
      "is-valid-email",
      "Please enter valid email",
      (value) => value && validator.isEmail(value)
    ),

  phone: Yup.string()
    .required("Phone number is required"),

  designation: Yup.string()
    .required("Designation is required"),
});

export const sponsorSchema = Yup.object().shape({
  organizationName: Yup.string()
    .required("Organization name is required"),

  website: Yup.string()
    .nullable()
    .notRequired()
    .test(
      "is-valid-url",
      "Please enter valid url",
      (value) => !value || validator.isURL(value)
    ),

  budgetRange: Yup.object().shape({
    min: Yup.number()
      .typeError("Budget values must be numbers")
      .nullable(),
    max: Yup.number()
      .typeError("Budget values must be numbers")
      .nullable(),
  }).nullable(),
});

export const applicantSchema = Yup.object().shape({
  organizationName: Yup.string()
    .required("Organization name is required"),

  website: Yup.string()
    .nullable()
    .notRequired()
    .test(
      "is-valid-url",
      "Please enter valid url",
      (value) => !value || validator.isURL(value)
    ),

  teamSize: Yup.number()
    .nullable()
    .notRequired()
    .typeError("Please enter a valid team size")
    .min(1, "Please enter a valid team size"),
});