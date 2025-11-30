import { BasicAlert } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
import { loginSchema } from "../../utils";

export const SigninPage = () => {
  const mutation = useAuth("signin");

  const [alertMsg, setAlertMsg] = useState();
  const [alertSeverity, setAlertSeverity] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate(values, {
        onSuccess: () => {
          setAlertMsg("Logged in successfully");
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
            <div className="flex flex-1 items-center justify-center p-md">
              <h1 className="heading-secondary text-dark text-center">
                Welcome Back!
              </h1>
            </div>

            <div className="p-4 md:p-12 bg-white rounded-3xl flex-1 relative shadow-2xl">
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
              <div className="flex flex-col gap-md w-full">
                <h3 className="heading-tertiary text-dark text-center">
                  Log In
                </h3>

                <div className="self-center flex flex-col items-center justify-center cursor-pointer gap-sm">
                  <p className="body-text text-dark">Not a member yet?</p>
                  <Link
                    to="/signup"
                    className="btn-primary w-max cursor-pointer"
                  >
                    Create Your Account
                  </Link>
                </div>

                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-md"
                >
                  {/* Email */}
                  <div className="form-field">
                    <label className="input-label">Email</label>

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
                        placeholder="you@domain.com"
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

                  <p className="text-sm text-dark">Forgot Password?</p>

                  <div className="form-field mt-md">
                    <div
                      className="input-field flex justify-center h-12"
                      style={{ padding: 0, border: "none" }}
                    >
                      <input
                        type="submit"
                        value="Log In"
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

export default SigninPage;
