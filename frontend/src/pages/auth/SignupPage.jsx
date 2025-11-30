import { BasicAlert } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { Mail, UserCheck, Lock } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
import { signupSchema } from "../../utils";

export const SignupPage = () => {
  const mutation = useAuth("signup");

  const [alertMsg, setAlertMsg] = useState();
  const [alertSeverity, setAlertSeverity] = useState();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      accountType: "",
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
        <div className="container">
          <div className="flex flex-col md:flex-row gap-xl">
            <div className="flex flex-1 items-center">
              <h1 className="heading-secondary text-dark text-left">
                Join the First Smart Sponsorship Platform in Pakistan
              </h1>
            </div>

            <div className="p-4 md:p-12 bg-white shadow-2xl rounded-3xl flex-1 relative">
              {/* Loading state when form is submitting */}
              {formik.isSubmitting ? (
                <>
                  <div className="absolute h-full w-full top-0 left-0 rounded-3xl flex items-center justify-center ">
                    <CircularProgress size={40} sx={{ color: "#3b82f6" }} />
                  </div>
                  <div className="absolute bg-black opacity-5 h-full w-full top-0 left-0 rounded-3xl"></div>
                </>
              ) : (
                ""
              )}
              <div className="flex flex-col gap-lg w-full">
                <h3 className="heading-tertiary text-dark text-center">
                  Create Your Account
                </h3>

                <div className="self-center flex flex-col items-center justify-center cursor-pointer gap-sm">
                  <p className="body-text text-dark">Already joined Sponect?</p>
                  <Link
                    to="/signin"
                    className="btn-primary w-max cursor-pointer"
                  >
                    Go to Login Page
                  </Link>
                </div>

                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-md"
                >
                  {/* Name */}
                  <div className="form-field">
                    <label className="input-label">Full Name</label>
                    <div
                      className={`input-field ${
                        formik.touched.fullName && formik.errors.fullName
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <Mail size={20} className="text-dark" />
                      <input
                        type="text"
                        name="fullName"
                        className="input text-dark"
                        placeholder="John Doe"
                        {...formik.getFieldProps("fullName")}
                      />
                    </div>
                    {formik.touched.fullName && formik.errors.fullName && (
                      <p className="text-sm text-red-600">
                        {formik.errors.fullName}
                      </p>
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
                      <p className="text-sm text-red-600">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>

                  {/* Account Type */}
                  <div className="form-field">
                    <label className="input-label">Who are you?</label>
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
                        className="input"
                        {...formik.getFieldProps("accountType")}
                      >
                        <option value="" disabled>
                          Select account type
                        </option>
                        <option value="sponsee">Sponsee</option>
                        <option value="sponsor">Sponsor</option>
                      </select>
                    </div>
                    {formik.touched.accountType &&
                      formik.errors.accountType && (
                        <p className="text-sm text-red-600">
                          {formik.errors.accountType}
                        </p>
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
                      <p className="text-sm text-red-600">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>

                  <div className="form-field mt-md">
                    <div
                      className="input-field flex justify-center h-12"
                      style={{ padding: 0, border: "none" }}
                    >
                      <input
                        type="submit"
                        value="Create Account"
                        className="btn-primary w-full cursor-pointer h-full"
                        disabled={formik.isSubmitting}
                      />
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
