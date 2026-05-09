import { FormHelperText } from "@mui/joy";

export const FormFeedback = ({ severity, message }) => {

  return (
    <>
      {open && (
        <FormHelperText
          sx={{
            bgcolor: `${severity === "error" ? "primary.whiteRed" : "primary.whiteGreen"}`,
            p: 2,
            color: `${severity === "error" ? "primary.darkRed" : "primary.darkGreen"}`,
          }}
        >
          {message}
        </FormHelperText>
      )}
    </>
  );
};

export default FormFeedback;
