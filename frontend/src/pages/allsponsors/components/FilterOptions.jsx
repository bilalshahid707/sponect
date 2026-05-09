import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

// Validation Schema
const filterValidationSchema = Yup.object().shape({
  minBudget: Yup.number()
    .nullable()
    .typeError("Min Budget must be a number")
    .min(0, "Min Budget cannot be negative")
    .when("maxBudget", (minBudget, schema) => {
      return minBudget
        ? schema.max(minBudget, "Min Budget cannot be greater than Max Budget")
        : schema;
    }),
  maxBudget: Yup.number()
    .nullable()
    .typeError("Max Budget must be a number")
    .min(0, "Max Budget cannot be negative"),
  cashSponsorship: Yup.boolean(),
  inkindSponsorship: Yup.boolean(),
  shortDuration: Yup.boolean(),
  longDuration: Yup.boolean(),
  oneTimeDuration: Yup.boolean(),
});

export const FilterOptions = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      minBudget: "",
      maxBudget: "",
      cashSponsorship: false,
      inkindSponsorship: false,
      shortDuration: false,
      longDuration: false,
      oneTimeDuration: false,
    },
    validationSchema: filterValidationSchema,
    onSubmit: (values) => {
      // Filter out empty values
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(
          ([, value]) => value !== "" && value !== false
        )
      );

      // Build query string
      const queryParams = new URLSearchParams();
      Object.entries(filteredValues).forEach(([key, value]) => {
        queryParams.append(key, value);
      });

      // Redirect with query parameters
      navigate(`/sponsors?${queryParams.toString()}`);
    },
  });

  const getFieldError = (fieldName) => {
    return formik.touched[fieldName] && formik.errors[fieldName];
  };

  const handleReset = () => {
    formik.resetForm();
    navigate("/sponsors");
  };

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      {/* Budget Range */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-gray-900">Budget Range</h3>

        <div>
          <label className="text-xs text-gray-600 block mb-1">Min Budget</label>
          <input
            type="number"
            name="minBudget"
            value={formik.values.minBudget}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="1000"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
              getFieldError("minBudget")
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-orange-500"
            }`}
          />
          {getFieldError("minBudget") && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.minBudget}</p>
          )}
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">Max Budget</label>
          <input
            type="number"
            name="maxBudget"
            value={formik.values.maxBudget}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="50000"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
              getFieldError("maxBudget")
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-orange-500"
            }`}
          />
          {getFieldError("maxBudget") && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.maxBudget}</p>
          )}
        </div>
      </div>

      {/* Sponsorship Type */}
      <div className="space-y-3 border-t pt-4">
        <h3 className="font-semibold text-sm text-gray-900">Sponsorship Type</h3>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="cashSponsorship"
            name="cashSponsorship"
            checked={formik.values.cashSponsorship}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
          />
          <label htmlFor="cashSponsorship" className="text-sm text-gray-700 cursor-pointer">
            Cash Sponsorship
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="inkindSponsorship"
            name="inkindSponsorship"
            checked={formik.values.inkindSponsorship}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
          />
          <label htmlFor="inkindSponsorship" className="text-sm text-gray-700 cursor-pointer">
            In-Kind Sponsorship
          </label>
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-3 border-t pt-4">
        <h3 className="font-semibold text-sm text-gray-900">Duration</h3>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="shortDuration"
            name="shortDuration"
            checked={formik.values.shortDuration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
          />
          <label htmlFor="shortDuration" className="text-sm text-gray-700 cursor-pointer">
            Short Duration
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="longDuration"
            name="longDuration"
            checked={formik.values.longDuration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
          />
          <label htmlFor="longDuration" className="text-sm text-gray-700 cursor-pointer">
            Long Duration
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="oneTimeDuration"
            name="oneTimeDuration"
            checked={formik.values.oneTimeDuration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
          />
          <label htmlFor="oneTimeDuration" className="text-sm text-gray-700 cursor-pointer">
            One-Time Duration
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t">
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition"
        >
          Reset
        </button>
        <button
          type="submit"
          className="flex-1 px-3 py-2 bg-dark text-white text-sm font-medium rounded-md hover:bg-dark-hover cursor-pointer transition"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
};

export default FilterOptions;
