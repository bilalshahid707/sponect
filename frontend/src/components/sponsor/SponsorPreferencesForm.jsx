import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import { BasicAlert } from "..";
import { DollarSign, Clock, ListChecks } from "lucide-react";
import { categories } from "../../utils/constants";

// --- Utility: Sample Sponsorship Schema ---
const sponsorshipSchema = Yup.object().shape({
  minBudget: Yup.number()
    .min(0, "Must be positive")
    .required("Minimum budget is required"),
  maxBudget: Yup.number()
    .min(Yup.ref("minBudget"), "Max budget cannot be less than min budget")
    .required("Maximum budget is required"),
  durationPreference: Yup.string().required("Duration is required"),
  sponsorshipTypes: Yup.array().min(1, "Select at least one sponsorship type"),
  categories: Yup.array().min(1, "Select at least one category"),
});

// --- Form Component ---

export const SponsorPreferencesForm = ({ activeTab }) => {
  const [alertMsg, setAlertMsg] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState();

  const formik = useFormik({
    initialValues: {
      minBudget: 1000,
      maxBudget: 50000,
      sponsorshipTypes: [],
      durationPreference: "",
      categories: [],
    },
    validationSchema: sponsorshipSchema,
    onSubmit: (values, { setSubmitting }) => {
      setAlertMsg(null);

      // Simulate API call delay
      setTimeout(() => {
        console.log("Sponsorship Details submitted with:", values);

        // Simulate success
        setAlertMsg("Sponsorship details saved successfully!");
        setAlertSeverity("success");
        setSubmitting(false);
      }, 1500);
    },
  });

  if (activeTab == 1) {
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
          <div className="max-w-7xl mx-auto">
            <div className="p-4  bg-white  relative ">
              {/* Loading Overlay */}
              {formik.isSubmitting && (
                <>
                  <div className="absolute h-full w-full top-0 left-0 rounded-3xl flex items-center justify-center z-10">
                    <CircularProgress size={40} sx={{ color: "#3b82f6" }} />
                  </div>
                  <div className="absolute bg-black opacity-5 h-full w-full top-0 left-0 rounded-3xl z-0"></div>
                </>
              )}

              <div>
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid grid-cols-2 gap-lg"
                >
                  {/* Min Budget Field */}
                  <div className="form-field">
                    <label className="input-label">Min Budget</label>
                    <div
                      className={`input-field ${
                        formik.touched.minBudget && formik.errors.minBudget
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <DollarSign size={20} className="text-dark" />
                      <input
                        type="number"
                        name="minBudget"
                        className="input text-dark"
                        placeholder="Min Amount"
                        {...formik.getFieldProps("minBudget")}
                      />
                    </div>
                    {formik.touched.minBudget && formik.errors.minBudget && (
                      <p className="text-sm text-red-600">
                        {formik.errors.minBudget}
                      </p>
                    )}
                  </div>
                  {/* Max Budget Field */}
                  <div className="form-field">
                    <label className="input-label">Max Budget</label>
                    <div
                      className={`input-field ${
                        formik.touched.maxBudget && formik.errors.maxBudget
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <DollarSign size={20} className="text-dark" />
                      <input
                        type="number"
                        name="maxBudget"
                        className="input text-dark"
                        placeholder="Max Amount"
                        {...formik.getFieldProps("maxBudget")}
                      />
                    </div>
                    {formik.touched.maxBudget && formik.errors.maxBudget && (
                      <p className="text-sm text-red-600">
                        {formik.errors.maxBudget}
                      </p>
                    )}
                  </div>
                  {/* Duration Preference (Dropdown) */}
                  <div className="form-field">
                    {" "}
                    {/* Adjusted width for a single field line */}
                    <label className="input-label">Duration Preference</label>
                    <div
                      className={`input-field ${
                        formik.touched.durationPreference &&
                        formik.errors.durationPreference
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <Clock size={20} className="text-dark" />
                      <select
                        name="durationPreference"
                        className="input text-dark appearance-none bg-transparent"
                        {...formik.getFieldProps("durationPreference")}
                      >
                        <option value="" disabled>
                          Select duration
                        </option>
                        <option value="short">Short-term (1-6 months)</option>
                        <option value="one_time">One-time Event</option>
                        <option value="long">Long-term (1+ years)</option>
                      </select>
                    </div>
                    {formik.touched.durationPreference &&
                      formik.errors.durationPreference && (
                        <p className="text-sm text-red-600">
                          {formik.errors.durationPreference}
                        </p>
                      )}
                  </div>
                  <div className="form-field">
                    <label className="input-label">Sponsorship Type</label>
                    <div
                      className={`p-md flex gap-md rounded-xl ${
                        formik.touched.categories && formik.errors.categories
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <div className="flex gap-sm">
                        <input type="checkbox" value="cash" name="cash" />
                        <span>cash</span>
                      </div>
                      <div className="flex gap-sm">
                        <input type="checkbox" value="inkind" name="inkind" />
                        <span>inkind (goods/services)</span>
                      </div>
                    </div>
                    {formik.touched.sponsorshipTypes &&
                      formik.errors.sponsorshipTypes && (
                        <p className="text-sm text-red-600 mt-2">
                          {formik.errors.sponsorshipTypes}
                        </p>
                      )}
                  </div>

                  {/* Categories (Multi-select chips) */}
                  <div className="form-field col-span-2">
                    <label className="input-label">Categories</label>
                    <div
                      className={`p-md flex gap-md rounded-xl ${
                        formik.touched.categories && formik.errors.categories
                          ? "border-2 border-red-600"
                          : ""
                      }`}
                    >
                      <ListChecks size={20} className="text-dark" />

                      {categories.map((category) => (
                        <div className="flex gap-sm">
                          <input
                            type="checkbox"
                            value={category}
                            key={categories.indexOf(category)}
                            name={category}
                          />
                          <span>{category}</span>
                        </div>
                      ))}
                    </div>

                    {formik.touched.categories && formik.errors.categories && (
                      <p className="text-sm text-red-600 mt-2">
                        {formik.errors.categories}
                      </p>
                    )}
                  </div>
                  {/* Submit Button */}
                  <div className="form-field col-span-2">
                    <div
                      className="input-field flex justify-center h-12"
                      style={{ padding: 0, border: "none" }}
                    >
                      <input
                        type="submit"
                        value="Save Preferences"
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

export default SponsorPreferencesForm;
