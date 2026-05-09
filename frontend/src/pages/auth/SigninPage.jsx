import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { loginSchema } from "../../utils";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Stack,
  AspectRatio,
} from "@mui/joy";

export const SigninPage = () => {
  const mutation = useAuth("signin");

  const [errorMessage, seterrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate(values, {
        onError: (error) => {
          seterrorMessage(error.response?.data?.message || error.message);
        },
        onSettled: () => {
          setSubmitting(false);
        },
      });
    },
  });

  return (
    <>
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
                  Sign In
                </Typography>

                <Box className="self-center flex flex-col items-center justify-center cursor-pointer gap-sm">
                  <Typography level="body-sm" className=" text-dark">
                    Not a member yet?
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
                    <Link to="/signup">Create Your Account</Link>
                  </Button>
                </Box>
              </Stack>

              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-md w-full"
              >
                {errorMessage && (
                  <div className="w-full p-2 bg-red-100">
                    <p className="text-red-500 text-sm">
                      {errorMessage}
                    </p>
                  </div>
                )}
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
                  Sign in
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SigninPage;
