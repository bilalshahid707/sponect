import PropTypes from "prop-types";
import { Autocomplete, AutocompleteOption, ListItemDecorator } from "@mui/joy";
import Add from "@mui/icons-material/Add";
import { createFilterOptions } from "@mui/material/useAutocomplete";

const filterOptions = createFilterOptions();

export const CustomAutocomplete = ({
  options,
  fieldName,
  formik,
  value,
  multiple,
  limit,
  startDecorator,
  allowUserInput,
}) => {
  return (
    <Autocomplete
      startDecorator={startDecorator}
      multiple={multiple}
      limitTags={limit}
      autoSelect
      openOnFocus
      placeholder={options ? options[0] : ""}
      options={options}
      value={formik.values.fieldName || value}
      filterOptions={(options, params) => {
        const filtered = filterOptions(options, params);
        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== "" && !isExisting && allowUserInput) {
          filtered.push({ inputValue, title: `Add "${inputValue}"` });
        }
        return filtered;
      }}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }

        return option.title;
      }}
      renderOption={(props, option) => (
        <AutocompleteOption {...props}>
          {option.title?.startsWith('Add "') && (
            <ListItemDecorator>
              <Add />
            </ListItemDecorator>
          )}
          {typeof option === "string" ? option : option.title}
        </AutocompleteOption>
      )}
      onChange={(e, newValue) => {
        if (multiple) {
          const values = newValue.map((val) =>
            typeof val === "string" ? val : (val.inputValue ?? val.title),
          );
          formik.setFieldValue(fieldName, values);
        } else {
          if (typeof newValue === "string") {
            formik.setFieldValue(fieldName, newValue);
          } else if (newValue?.inputValue) {
            formik.setFieldValue(fieldName, newValue.inputValue);
          } else {
            formik.setFieldValue(fieldName, newValue ?? "");
          }
        }
      }}
      onBlur={() => formik.setFieldTouched(fieldName, true)}
    />
  );
};

CustomAutocomplete.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  fieldName: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
  multiple: PropTypes.bool,
  limit: PropTypes.number,
  startDecorator: PropTypes.node.isRequired,
  allowUserInput: PropTypes.bool.isRequired,
};

export default CustomAutocomplete;
