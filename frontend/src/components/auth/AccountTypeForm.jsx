import React from "react";
import { Button,FormControl,FormHelperText,FormLabel,Input,Box } from "@mui/joy";
import * as Yup from "yup"
import UserCircle from "@mui/icons-material/UserCircle"
import { useFormik } from "formik";
export const AccountTypeForm = () => {
 const formik = useFormik({
    initialValues: {
      accountType:''
    },
    validationSchema: Yup.string().required("Account type is required"),
    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate(values, {
        onSuccess: () => {
          setAlertMsg("Logged in successfully");
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
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-md w-full"
      >
        {/* Account Type */}
        <FormControl
          error={
            formik.touched.accountType && Boolean(formik.errors.accountType)
          }
        >
          <FormLabel>Account Type</FormLabel>

          <Input
            startDecorator={<UserCircle size={20} className="text-dark" />}
            placeholder="Enter account type"
            autoComplete="off"
            {...formik.getFieldProps("accountType")}
          />

          {formik.touched.accountType && formik.errors.accountType && (
            <FormHelperText>{formik.errors.accountType}</FormHelperText>
          )}
        </FormControl>

        <Button
          type="submit"
          variant="solid"
          disabled={formik.isSubmitting}
          loading={formik.isSubmitting}
          sx={{
            width: "100%",
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
              transition: "0.15s",
            },
          }}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default AccountTypeForm;
