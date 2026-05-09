import PropTypes from "prop-types";

export const FormRow = ({ label, description, error, children }) => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] border-b border-border last:border-0">
    <div className="p-6">
      <p className="text-sm font-semibold text-text-primary">{label}</p>
      {description && (
        <p className="text-xs text-text-secondary mt-1 leading-relaxed">{description}</p>
      )}
    </div>
    <div className="px-6 py-5 flex flex-col gap-1.5">
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  </div>
);

FormRow.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FormRow;
