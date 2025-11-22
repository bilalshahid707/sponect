import { useAuth, BasicAlert } from "../imports";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { User, Mail, Phone, UserCheck, Building2, Briefcase, Lock } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
import { signupSchema } from "../utils/validationSchemas";

export const SignupPage = () => {
  const mutation = useAuth("signup");

  const [alertMsg, setAlertMsg] = useState();
  const [alertSeverity, setAlertSeverity] = useState();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      accountType: "",
      organizationName: "",
      designation: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate(values, {
        onSuccess: () => {
          setAlertMsg("Account created successfully");
          setAlertSeverity("success");
        },
        onError: (error) => {
          setAlertMsg(error.response?.data?.message || error.message);
          setAlertSeverity("error");
        },
        onSettled: () => {
          setSubmitting(false);
        },
      });
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

      <section className="section">
        <div className="container relative">
          <div className="absolute w-full h-1/2 top-0 left-0 rounded-4xl bg-dark -z-10"></div>
          <div className="flex flex-col gap-xl">
            <h1 className="heading-secondary text-white text-center">
              Join the First Smart Sponsorship Platform in Pakistan
            </h1>

            <div className="p-4 md:p-12 bg-white shadow-xl rounded-4xl">
              <div className="flex flex-col gap-lg w-full">
                <h3 className="heading-tertiary text-dark text-center">
                  Create Your Account
                </h3>

                <div className="self-center flex flex-col items-center justify-center cursor-pointer gap-sm">
                  <p className="body-text text-dark">Already joined Sponect?</p>
                  <Link to="/login" className="btn-primary w-max cursor-pointer">
                    Go to Login Page
                  </Link>
                </div>

                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-md">
                  {/* Full Name */}
                  <div className="form-field">
                    <label className="input-label">Full Name</label>
                    <div
                      className={`input-field ${
                        formik.touched.fullName && formik.errors.fullName
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <User size={20} className="text-dark" />
                      <input
                        type="text"
                        name="fullName"
                        className="input text-dark"
                        placeholder="John Doe"
                        autoComplete="name"
                        {...formik.getFieldProps("fullName")}
                      />
                    </div>
                    {formik.touched.fullName && formik.errors.fullName && (
                      <p className="text-sm text-red-600">{formik.errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-field">
                    <label className="input-label">Email Address</label>
                    <div
                      className={`input-field ${
                        formik.touched.email && formik.errors.email
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <Mail size={20} className="text-dark" />
                      <input
                        type="email"
                        name="email"
                        className="input text-dark"
                        placeholder="you@example.com"
                        autoComplete="email"
                        {...formik.getFieldProps("email")}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-sm text-red-600">{formik.errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="form-field">
                    <label className="input-label">Phone Number</label>
                    <div
                      className={`input-field ${
                        formik.touched.phone && formik.errors.phone
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <Phone size={20} className="text-dark" />
                      <input
                        type="tel"
                        name="phone"
                        className="input text-dark"
                        placeholder="+1 234 567 890"
                        autoComplete="tel"
                        {...formik.getFieldProps("phone")}
                      />
                    </div>
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-sm text-red-600">{formik.errors.phone}</p>
                    )}
                  </div>

                  {/* Account Type */}
                  <div className="form-field">
                    <label className="input-label">Registering As</label>
                    <div
                      className={`input-field ${
                        formik.touched.accountType && formik.errors.accountType
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <UserCheck size={20} className="text-dark" />
                      <select
                        name="accountType"
                        className="input text-dark bg-transparent outline-none w-full"
                        {...formik.getFieldProps("accountType")}
                      >
                        <option value="" disabled>
                          Select account type
                        </option>
                        <option value="applicant">Applicant</option>
                        <option value="sponsor">Sponsor</option>
                      </select>
                    </div>
                    {formik.touched.accountType && formik.errors.accountType && (
                      <p className="text-sm text-red-600">{formik.errors.accountType}</p>
                    )}
                  </div>

                  {/* Organization Name */}
                  <div className="form-field">
                    <label className="input-label">Organization Name</label>
                    <div
                      className={`input-field ${
                        formik.touched.organizationName && formik.errors.organizationName
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <Building2 size={20} className="text-dark" />
                      <input
                        type="text"
                        name="organizationName"
                        className="input text-dark"
                        placeholder="Brew Holdings"
                        {...formik.getFieldProps("organizationName")}
                      />
                    </div>
                    {formik.touched.organizationName && formik.errors.organizationName && (
                      <p className="text-sm text-red-600">{formik.errors.organizationName}</p>
                    )}
                  </div>

                  {/* Designation */}
                  <div className="form-field">
                    <label className="input-label">Designation</label>
                    <div
                      className={`input-field ${
                        formik.touched.designation && formik.errors.designation
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <Briefcase size={20} className="text-dark" />
                      <input
                        type="text"
                        name="designation"
                        className="input text-dark"
                        placeholder="Sponsorships Manager"
                        {...formik.getFieldProps("designation")}
                      />
                    </div>
                    {formik.touched.designation && formik.errors.designation && (
                      <p className="text-sm text-red-600">{formik.errors.designation}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="form-field">
                    <label className="input-label">Password</label>
                    <div
                      className={`input-field ${
                        formik.touched.password && formik.errors.password
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <Lock size={20} className="text-dark" />
                      <input
                        type="password"
                        name="password"
                        className="input text-dark"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...formik.getFieldProps("password")}
                      />
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-sm text-red-600">{formik.errors.password}</p>
                    )}
                  </div>

                  <div className="form-field mt-md">
                    <div
                      className="input-field flex justify-center h-12"
                      style={{ padding: 0, border: "none" }}
                    >
                      {formik.isSubmitting ? (
                        <button className="btn-primary w-full cursor-not-allowed h-full">
                          <CircularProgress size={16} sx={{ color: "white" }} />
                        </button>
                      ) : (
                        <input
                          type="submit"
                          value="Create Account"
                          className="btn-primary w-full cursor-pointer h-full"
                          disabled={formik.isSubmitting}
                        />
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
