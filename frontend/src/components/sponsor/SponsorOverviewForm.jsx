import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { BasicAlert } from ".."; // Assuming BasicAlert is available
import { MapPin, Briefcase, Calendar } from "lucide-react"; // Icons for Business Details

// --- Utility: Sample Brand Schema (similar to how loginSchema works) ---
const brandSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  tagline: Yup.string().max(100, "Too Long!"),
  description: Yup.string()
    .min(30, "Must be at least 30 characters")
    .max(300, "Max 300 characters")
    .required("Description is required"),
  location: Yup.string().required("Location is required"),
  industry: Yup.string().required("Industry is required"),
  founded: Yup.number()
    .min(1800, "Year seems too old")
    .max(new Date().getFullYear(), "Cannot be a future year")
    .required("Founding year is required"),
});

// --- Form Component ---

export const SponsorOverviewForm = ({ activeTab }) => {
  const [alertMsg, setAlertMsg] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState();

  const formik = useFormik({
    initialValues: {
      name: "",
      tagline: "",
      description: "",
      location: "",
      industry: "",
      founded: new Date().getFullYear(), // Default to current year
    },
    validationSchema: brandSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setAlertMsg(null); // Clear previous alerts

      // Simulate API call delay
      setTimeout(() => {
        console.log("Form submitted with:", values);

        // Simulate success
        setAlertMsg("Brand details saved successfully!");
        setAlertSeverity("success");
        // resetForm(); // Uncomment to clear form on success

        setSubmitting(false);
      }, 1500);
    },
  });

  // Example industry and location options for dropdowns/autocomplete
  const industryOptions = [
    "Technology",
    "Healthcare",
    "Finance",
    "Retail",
    "Manufacturing",
  ];
  const locationOptions = ["New York", "London", "Tokyo", "Paris", "Lahore"];

  if (activeTab === 0) {
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
          <div className="max-w-7xl mx-auto ">
            <div className="p-0.5 bg-white relative flex flex-col gap-lg">
              {/* Loading state when form is submitting */}
              {formik.isSubmitting && (
                <>
                  <div className="absolute h-full w-full top-0 left-0 rounded-3xl flex items-center justify-center z-10">
                    <CircularProgress size={40} sx={{ color: "#3b82f6" }} />
                  </div>
                  <div className="absolute bg-black opacity-5 h-full w-full top-0 left-0 rounded-3xl z-0"></div>
                </>
              )}

              <div>
                <h3 className="heading-tertiary pb-2 border-b-2 border-dark-lighter">
                  Overview
                </h3>
              </div>

              <div>
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid grid-cols-2 gap-lg"
                >
                  {/* 1. Name (Text input) */}
                  <div className="form-field col-span-2">
                    <label className="input-label">Name</label>
                    <div
                      className={`input-field ${
                        formik.touched.name && formik.errors.name
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        name="name"
                        className="input text-dark"
                        placeholder="e.g., Quantum Innovations Inc."
                        {...formik.getFieldProps("name")}
                      />
                    </div>
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-sm text-red-600">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>

                  {/* 3. Description (Multiline textarea – 4 to 6 lines) */}
                  <div className="form-field col-span-2">
                    <label className="input-label">Description</label>
                    <div
                      className={`input-field p-0 ${
                        // p-0 to allow textarea internal padding
                        formik.touched.description && formik.errors.description
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <textarea
                        name="description"
                        className="input text-dark w-full resize-none p-3 h-32" // Added h-32 for 4-6 lines
                        placeholder="Describe your company's mission, values, and primary services in 4 to 6 sentences."
                        {...formik.getFieldProps("description")}
                      />
                    </div>
                    {formik.touched.description &&
                      formik.errors.description && (
                        <p className="text-sm text-red-600">
                          {formik.errors.description}
                        </p>
                      )}
                  </div>

                  <div className="form-field">
                    <label className="input-label">Tagline</label>
                    <div
                      className={`input-field ${
                        formik.touched.tagline && formik.errors.tagline
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        name="tagline"
                        className="input text-dark"
                        placeholder="e.g., Building the future, today."
                        {...formik.getFieldProps("tagline")}
                      />
                    </div>
                    {formik.touched.tagline && formik.errors.tagline && (
                      <p className="text-sm text-red-600">
                        {formik.errors.tagline}
                      </p>
                    )}
                  </div>

                  {/* 4. Location (Auto-suggest / dropdown text input) */}
                  <div className="form-field">
                    <label className="input-label">Location</label>
                    <div
                      className={`input-field ${
                        formik.touched.location && formik.errors.location
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <MapPin size={20} className="text-dark" />
                      <select
                        name="location"
                        className="input text-dark appearance-none bg-transparent" // Use select for dropdown and style it like input
                        {...formik.getFieldProps("location")}
                      >
                        <option value="" disabled>
                          Select a primary location
                        </option>
                        {locationOptions.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                    {formik.touched.location && formik.errors.location && (
                      <p className="text-sm text-red-600">
                        {formik.errors.location}
                      </p>
                    )}
                  </div>

                  {/* 5. Industry (Dropdown) */}
                  <div className="form-field">
                    <label className="input-label">Industry</label>
                    <div
                      className={`input-field ${
                        formik.touched.industry && formik.errors.industry
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <Briefcase size={20} className="text-dark" />
                      <select
                        name="industry"
                        className="input text-dark appearance-none bg-transparent"
                        {...formik.getFieldProps("industry")}
                      >
                        <option value="" disabled>
                          Select an industry
                        </option>
                        {industryOptions.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                    </div>
                    {formik.touched.industry && formik.errors.industry && (
                      <p className="text-sm text-red-600">
                        {formik.errors.industry}
                      </p>
                    )}
                  </div>

                  {/* 6. Founded (Year picker - implemented as number input with validation) */}
                  <div className="form-field">
                    <label className="input-label">Founded (Year)</label>
                    <div
                      className={`input-field ${
                        formik.touched.founded && formik.errors.founded
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <Calendar size={20} className="text-dark" />
                      <input
                        type="number"
                        name="founded"
                        className="input text-dark"
                        placeholder="YYYY"
                        min="1800"
                        max={new Date().getFullYear()}
                        {...formik.getFieldProps("founded")}
                      />
                    </div>
                    {formik.touched.founded && formik.errors.founded && (
                      <p className="text-sm text-red-600">
                        {formik.errors.founded}
                      </p>
                    )}
                  </div>

                  <div className="form-field col-span-2">
                    <div
                      className="input-field flex justify-center h-12"
                      style={{ padding: 0, border: "none" }}
                    >
                      <input
                        type="submit"
                        value="Save Details"
                        className="btn-primary w-full cursor-pointer h-full"
                        disabled={formik.isSubmitting}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return <></>;
  }
};

export default SponsorOverviewForm;
