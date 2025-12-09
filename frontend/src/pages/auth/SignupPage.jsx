import { BasicAlert } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { Mail, UserCheck, Lock } from "lucide-react";
import { signupSchema } from "../../utils";

import { Box,Stack,Button,FormControl,FormHelperText,FormLabel,Input,AspectRatio,Typography } from "@mui/joy";

export const SignupPage = () => {
  const mutation = useAuth("signup");

  const [alertMsg, setAlertMsg] = useState();
  const [alertSeverity, setAlertSeverity] = useState();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate(values, {
        onSuccess: () => {
          setAlertMsg("Account created successfully");
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
      {alertMsg && (
        <BasicAlert
          message={alertMsg}
          severity={alertSeverity}
          setAlertMsg={setAlertMsg}
        />
      )}

      <Box component="section" className="bg-dark">
        <Box className="container">
          <Box className="p-4 md:p-8 bg-white mx-auto rounded-lg w-[90%] lg:w-[40%]">
            <Stack gap={6} className="items-center">
              <AspectRatio
                ratio={2}
                variant="plain"
                sx={{ width: "200px", height: "50px" }}
              >
                <img
                  src="https://res.cloudinary.com/sponect/image/upload/v1765126777/logo_final_2_ktuivs.png"
                  alt="sponect logo"
                />
              </AspectRatio>
              <Stack gap={2}>
                <Typography level="h3" className="text-dark text-center">
                  Sign Up
                </Typography>

                <Box className="self-center flex flex-col items-center justify-center cursor-pointer gap-sm">
                  <Typography level="body-sm" className=" text-dark">
                    Already joined?
                  </Typography>
                  <Button
                    variant="solid"
                    sx={{
                      width: "100%",
                      backgroundColor: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                        transition: "0.15s ",
                      },
                    }}
                  >
                    <Link to="/signin">Sign In</Link>
                  </Button>
                </Box>
              </Stack>

              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-md w-full"
              >
                <FormControl
                  error={formik.touched.username && Boolean(formik.errors.username)}
                >
                  <FormLabel>Username</FormLabel>
                  <Input
                    startDecorator={<Mail size={20} className="text-dark" />}
                    type="text"
                    placeholder="wajeeha"
                    autoComplete="username"
                    {...formik.getFieldProps("username")}
                  />

                  {formik.touched.username && formik.errors.username && (
                    <FormHelperText>{formik.errors.username}</FormHelperText>
                  )}
                </FormControl>

                {/* Email */}
                <FormControl
                  error={formik.touched.email && Boolean(formik.errors.email)}
                >
                  <FormLabel>Email</FormLabel>
                  <Input
                    startDecorator={<Mail size={20} className="text-dark" />}
                    type="email"
                    placeholder="you@domain.com"
                    autoComplete="email"
                    {...formik.getFieldProps("email")}
                  />

                  {formik.touched.email && formik.errors.email && (
                    <FormHelperText>{formik.errors.email}</FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                >
                  <FormLabel>Password</FormLabel>
                  <Input
                    startDecorator={<Lock size={20} className="text-dark" />}
                    type="password"
                    name="password"
                    placeholder="*****"
                    autoComplete="password"
                    {...formik.getFieldProps("password")}
                  />

                  {formik.touched.password && formik.errors.password && (
                    <FormHelperText>{formik.errors.password}</FormHelperText>
                  )}
                </FormControl>
                <p className="text-sm text-dark">Forgot Password?</p>

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
                      transition: "0.15s ",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignupPage;
