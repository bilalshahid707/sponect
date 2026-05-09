import { FormHelperText } from "@mui/joy";

export const FormFeedback = ({ severity, message }) => {
  return (
    <>
      {message && (
        <FormHelperText
          sx={{
            bgcolor: severity === "error" ? "#fef2f2" : "#f0fdf4",
            p: 2,
            color: severity === "error" ? "#b91c1c" : "#15803d",
          }}
        >
          {message}
        </FormHelperText>
      )}
    </>
  );
};

export default FormFeedback;
