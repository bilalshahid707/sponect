import { useFormik } from "formik";
import { Upload, Building2, Users, Globe, Tag, FileText } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateSettings, BasicAlert } from "../../imports";
import { applicantSchema } from "../../utils/validationSchemas";

export const Applicant = ({ initialData }) => {
  const queryClient = useQueryClient();

  const [photo, setPhoto] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [alertSeverity, setAlertSeverity] = useState();

  const mutation = useUpdateSettings({ path: "applicants/me" });

  const formik = useFormik({
    initialValues: {
      organizationName: initialData?.organizationName || "",
      organizationDescription: initialData?.organizationDescription || "",
      teamSize: initialData?.teamSize || 1,
      website: initialData?.website || "",
      category: initialData?.category || "",
      profileImage: initialData?.profileImage?.secureUrl || "",
      socialLinks: {
        linkedin: initialData?.socialLinks?.linkedin || "",
        twitter: initialData?.socialLinks?.twitter || "",
        facebook: initialData?.socialLinks?.facebook || "",
      },
    },

    enableReinitialize: true,

    validationSchema: applicantSchema,

    onSubmit: (values, { setSubmitting }) => {
      console.log("Submitting values:", values);
      mutation.mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["applicants"] });
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

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        formik.setFieldError(
          "profileImage",
          "Image size must be less than 5MB"
        );
        return;
      }
      setPhoto(URL.createObjectURL(file));
      formik.setFieldValue("profileImage", file);
    }
  };

  return (
    <>
      {alertMsg && (
        <BasicAlert
          message={alertMsg}
          severity={alertSeverity}
          setAlertMsg={setAlertMsg}
        />
      )}
      <div className="w-full max-w-4xl">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-lg">
          {/* Profile Image Upload */}
          <div className="form-field">
            <label className="input-label">Organization Logo</label>
            <div className="flex items-center gap-md">
              <div className="w-32 h-32 rounded-lg bg-card border-2 border-border overflow-hidden flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                {formik.values.profileImage ? (
                  <img
                    src={photo || formik.values.profileImage}
                    alt="Organization logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Upload size={32} />
                    <span className="text-xs">Upload Logo</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center justify-center gap-sm">
                <label htmlFor="organizationLogo" className="btn-primary">
                  Change Photo
                </label>
                <p className="text-xs text-muted-foreground">
                  Recommended: Square image, at least 400x400px
                </p>
                {formik.errors.profileImage && (
                  <p className="text-xs text-destructive">
                    {formik.errors.profileImage}
                  </p>
                )}
              </div>
              <input
                id="organizationLogo"
                type="file"
                accept="image/jpg,image/jpeg,image/png"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Organization Name */}
          <div className="form-field">
            <label className="input-label">
              Organization Name <span className="text-destructive">*</span>
            </label>
            <div
              className={`input-field ${
                formik.touched.organizationName &&
                formik.errors.organizationName
                  ? "border-2 border-red-600"
                  : ""
              }`}
            >
              <Building2 size={20} className="text-muted-foreground" />
              <input
                type="text"
                className="input"
                placeholder="Enter organization name"
                {...formik.getFieldProps("organizationName")}
              />
            </div>
            {formik.touched.organizationName &&
              formik.errors.organizationName && (
                <p className="text-sm text-red-600">
                  {formik.errors.organizationName}
                </p>
              )}
          </div>

          {/* Organization Description */}
          <div className="form-field">
            <label className="input-label">Organization Description</label>
            <div className="input-field items-start">
              <FileText size={20} className="text-muted-foreground mt-1" />
              <textarea
                className="input min-h-[100px] resize-y"
                placeholder="Tell us about your organization..."
                {...formik.getFieldProps("organizationDescription")}
              />
            </div>
          </div>

          {/* Team Size and Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {/* Team Size */}
            <div className="form-field">
              <label className="input-label">Team Size</label>
              <div
                className={`input-field ${
                  formik.touched.teamSize && formik.errors.teamSize
                    ? "border-2 border-red-600"
                    : ""
                }`}
              >
                <Users size={20} className="text-muted-foreground" />
                <input
                  type="number"
                  className="input"
                  placeholder="e.g., 10"
                  min="1"
                  {...formik.getFieldProps("teamSize")}
                />
              </div>
              {formik.touched.teamSize && formik.errors.teamSize && (
                <p className="text-sm text-red-600">{formik.errors.teamSize}</p>
              )}
            </div>

            {/* Category */}
            <div className="form-field">
              <label className="input-label">Category</label>
              <div className="input-field">
                <Tag size={20} className="text-muted-foreground" />
                <select
                  className="input cursor-pointer"
                  {...formik.getFieldProps("category")}
                >
                  <option value="">Select category</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Website */}
          <div className="form-field">
            <label className="input-label">Website</label>
            <div
              className={`input-field ${
                formik.touched.website && formik.errors.website
                  ? "border-2 border-red-600"
                  : ""
              }`}
            >
              <Globe size={20} className="text-muted-foreground" />
              <input
                type="text"
                className="input"
                placeholder="https://yourcompany.com"
                {...formik.getFieldProps("website")}
              />
            </div>
            {formik.touched.website && formik.errors.website && (
              <p className="text-sm text-red-600">{formik.errors.website}</p>
            )}
          </div>

          {/* Social Links Section */}
          <div className="form-field">
            <label className="input-label">Social Links (Optional)</label>

            {/* LinkedIn */}
            <div className="input-field">
              <svg
                className="w-5 h-5 text-muted-foreground"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <input
                type="text"
                className="input"
                placeholder="LinkedIn profile URL"
                {...formik.getFieldProps("socialLinks.linkedin")}
              />
            </div>

            {/* Twitter */}
            <div className="input-field">
              <svg
                className="w-5 h-5 text-muted-foreground"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <input
                type="text"
                className="input"
                placeholder="Twitter/X profile URL"
                {...formik.getFieldProps("socialLinks.twitter")}
              />
            </div>

            {/* Facebook */}
            <div className="input-field">
              <svg
                className="w-5 h-5 text-muted-foreground"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
              <input
                type="text"
                className="input"
                placeholder="Facebook page URL"
                {...formik.getFieldProps("socialLinks.facebook")}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-field mt-md">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`btn-primary w-full flex items-center justify-center h-12 ${
                formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {formik.isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Applicant;
