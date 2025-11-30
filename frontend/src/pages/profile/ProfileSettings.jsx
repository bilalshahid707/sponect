import { useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";
import { BasicAlert } from "../../components";
import CircularProgress from "@mui/material/CircularProgress";
import { profileSchema } from "../../utils/";

export const ProfileSettings = () => {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.User?.Data);

  const mutation = useUpdateSettings({ path: "users/me" });

  const [alertMsg, setAlertMsg] = useState();
  const [alertSeverity, setAlertSeverity] = useState();

  const formik = useFormik({
    initialValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      accountType: user?.accountType || "",
      designation: user?.designation || "",
    },

    enableReinitialize: true,

    validationSchema: profileSchema,

    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
          setAlertMsg("Settings saved successfully");
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
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-md text-white"
      >
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
            <i className="bi bi-person-fill body-text text-dark"></i>
            <input
              type="text"
              className="input text-dark"
              name="fullName"
              {...formik.getFieldProps("fullName")}
              aria-invalid={
                formik.touched.fullName && formik.errors.fullName
                  ? "true"
                  : "false"
              }
            />
          </div>
          {formik.touched.fullName && formik.errors.fullName && (
            <p role="alert" className="text-sm text-red-600">
              {formik.errors.fullName}
            </p>
          )}
        </div>

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
            <i className="bi bi-envelope-fill body-text text-dark"></i>
            <input
              type="email"
              className="input text-dark"
              placeholder="you@domain.com"
              autoComplete="email"
              {...formik.getFieldProps("email")}
              aria-invalid={
                formik.touched.email && formik.errors.email ? "true" : "false"
              }
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p role="alert" className="text-sm text-red-600">
              {formik.errors.email}
            </p>
          )}
        </div>

        {/* Phone (Numeric Validation) */}
        <div className="form-field">
          <label className="input-label">Phone Number</label>
          <div
            className={`input-field ${
              formik.touched.phone && formik.errors.phone
                ? "border-2 border-red-600"
                : ""
            }`}
          >
            <i className="bi bi-telephone-fill body-text text-dark"></i>
            <input
              type="tel"
              className="input text-dark"
              placeholder="1234567890"
              {...formik.getFieldProps("phone")}
              aria-invalid={
                formik.touched.phone && formik.errors.phone ? "true" : "false"
              }
            />
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <p role="alert" className="text-sm text-red-600">
              {formik.errors.phone}
            </p>
          )}
        </div>

        {/* Account Type (Enum) */}
        <div className="form-field">
          <label className="input-label">Account Type</label>
          <div
            className={`input-field ${
              formik.touched.accountType && formik.errors.accountType
                ? "border-2 border-red-600"
                : ""
            }`}
          >
            <i className="bi bi-person-badge-fill body-text text-dark"></i>
            <select
              className="input text-dark bg-transparent cursor-not-allowed"
              disabled
            >
              <option value="" disabled>
                Select Account Type
              </option>
              <option value="applicant">Applicant</option>
              <option value="sponsor">Sponsor</option>
            </select>
          </div>
          {formik.touched.accountType && formik.errors.accountType && (
            <p role="alert" className="text-sm text-red-600">
              {formik.errors.accountType}
            </p>
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
            <i className="bi bi-briefcase-fill body-text text-dark"></i>
            <input
              type="text"
              className="input text-dark"
              placeholder="e.g. Senior Engineer"
              {...formik.getFieldProps("designation")}
              aria-invalid={
                formik.touched.designation && formik.errors.designation
                  ? "true"
                  : "false"
              }
            />
          </div>
          {formik.touched.designation && formik.errors.designation && (
            <p role="alert" className="text-sm text-red-600">
              {formik.errors.designation}
            </p>
          )}
        </div>

        {/* Submit Button */}
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
                value="Save"
                className="btn-primary w-full cursor-pointer h-full"
                disabled={formik.isSubmitting}
              />
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfileSettings;
