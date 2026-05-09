import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { pitchCategories, ageGroups, genders } from "@/utils/constants";

const CheckItem = ({ id, label, checked, onChange, onBlur }) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      id={id}
      name={id}
      checked={checked}
      onChange={onChange}
      onBlur={onBlur}
      className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
    />
    <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer capitalize">
      {label}
    </label>
  </div>
);

export const PitchFilterOptions = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      category: "",
      gender: "",
      ageGroup: "",
      preference: "",
      upcoming: false,
      ongoing: false,
    },
    onSubmit: (values) => {
      const filtered = Object.fromEntries(
        Object.entries(values).filter(([, v]) => v !== "" && v !== false)
      );
      const params = new URLSearchParams();
      Object.entries(filtered).forEach(([k, v]) => params.append(k, v));
      navigate(`/pitches?${params.toString()}`);
    },
  });

  const handleReset = () => {
    formik.resetForm();
    navigate("/pitches");
  };

  return (
    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-5">

      {/* Category */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-gray-900">Category</h3>
        <select
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 capitalize"
        >
          <option value="">All categories</option>
          {pitchCategories.map((c) => (
            <option key={c} value={c} className="capitalize">{c}</option>
          ))}
        </select>
      </div>

      {/* Sponsorship Preference */}
      <div className="space-y-2 border-t pt-4">
        <h3 className="font-semibold text-sm text-gray-900">Sponsorship Type</h3>
        <select
          name="preference"
          value={formik.values.preference}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Any type</option>
          <option value="cash">Cash</option>
          <option value="inkind">In-Kind</option>
        </select>
      </div>

      {/* Target Gender */}
      <div className="space-y-2 border-t pt-4">
        <h3 className="font-semibold text-sm text-gray-900">Target Gender</h3>
        <select
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 capitalize"
        >
          <option value="">Any gender</option>
          {genders.map((g) => (
            <option key={g} value={g} className="capitalize">{g}</option>
          ))}
        </select>
      </div>

      {/* Age Group */}
      <div className="space-y-2 border-t pt-4">
        <h3 className="font-semibold text-sm text-gray-900">Age Group</h3>
        <select
          name="ageGroup"
          value={formik.values.ageGroup}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Any age group</option>
          {ageGroups.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div className="space-y-2 border-t pt-4">
        <h3 className="font-semibold text-sm text-gray-900">Status</h3>
        <CheckItem
          id="upcoming"
          label="Upcoming"
          checked={formik.values.upcoming}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <CheckItem
          id="ongoing"
          label="Ongoing"
          checked={formik.values.ongoing}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      {/* Actions */}
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
          Apply
        </button>
      </div>
    </form>
  );
};

export default PitchFilterOptions;
