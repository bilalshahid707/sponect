import { BasicAlert } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { Mail, UserCheck, Lock } from "lucide-react";
import { signupSchema } from "../../utils";
import { accountType } from "../../utils/constants";

import {
  Box,
  Stack,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  AspectRatio,
  Typography,
  Divider,
  Radio,
  RadioGroup,
  Sheet,
} from "@mui/joy";

import Done from "@mui/icons-material/Done";

export const SignupPage = () => {
  const [alertMsg, setAlertMsg] = useState();
  const [alertSeverity, setAlertSeverity] = useState();

  const [error, setError] = useState();
  const mutation = useAuth("signup");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      accountType: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate(values, {
        onError: (error) => {
          setError(error.response?.data?.message || error.message);
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
        <Box className="mx-auto max-w-7xl md:px-8 lg:px-12 md:py-12 lg:py-14">
          <Box className="p-4 md:p-12 w-full md:w-[520px] mx-auto bg-white rounded-md shadow-md shadow-white">
            <Stack gap={4}>
              <Stack gap={4}>
                <AspectRatio
                  ratio={2}
                  variant="plain"
                  sx={{ width: "200px", height: "50px", alignSelf: "center" }}
                >
                  <img
                    src="https://res.cloudinary.com/sponect/image/upload/v1765126777/logo_final_2_ktuivs.png"
                    alt="sponect logo"
                  />
                </AspectRatio>
                <Typography
                  level="h3"
                  sx={{ color: "dark.main", textAlign: "center" }}
                >
                  Create you account
                </Typography>
              </Stack>

              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-md w-full"
              >
                <FormControl
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
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
                  {error && <FormHelperText>{error}</FormHelperText>}
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
                  {error && <FormHelperText>{error}</FormHelperText>}
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
                  {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>

                <FormControl
                  error={
                    formik.touched.accountType &&
                    Boolean(formik.errors.accountType)
                  }
                >
                  <FormLabel>Account Type</FormLabel>

                  <RadioGroup size="sm" sx={{ gap: 2,display:'flex',flexDirection:'row' }}>
                    {accountType.map((type) => (
                      <Sheet key={accountType.indexOf(type)} sx={{ p: 2, borderRadius: "md", display:'flex',flexDirection:'column',gap:1,flex:1 }}>
                        <Radio
                          name="accountType"
                          label={`${type.name}`}
                          overlay
                          disableIcon
                          value={type.name.toLowerCase()}
                          onChange={formik.handleChange}
                          onBlur={() =>
                            formik.setFieldTouched("accountType", true)
                          }
                          slotProps={{
                            label: ({ checked }) => ({
                              sx: {
                                fontWeight: "lg",
                                fontSize: "md",
                                color: checked ? "primary.main" : "dark.main",
                              },
                            }),
                            action: ({ checked }) => ({
                              sx: (theme) => ({
                                ...(checked && {
                                  "--variant-borderWidth": "2px",
                                  "&&": {
                                    borderColor:
                                      theme.vars.palette.primary.main,
                                  },
                                }),
                                "&:hover": {
                                  "--variant-borderWidth": "2px",
                                  "&&": {
                                    borderColor:
                                      theme.vars.palette.primary.main,
                                  },
                                  background: "none",
                                  transition: "all 0.15s",
                                },
                              }),
                            }),
                          }}
                        />
                        <Typography level="body-xs" sx={{color:"dark.main"}}>{type.decsription}</Typography>
                      </Sheet>
                    ))}
                  </RadioGroup>

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
                      transition: "0.15s ",
                    },
                  }}
                >
                  Create Account
                </Button>
              </Box>

              <Divider />

              <Box className="flex flex-col items-center gap-sm">
                <Typography level="body-sm" className=" text-dark font-medium">
                  Already joined?
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    color: "primary.main",
                    borderColor: "primary.main",
                    "&:hover": {
                      color: "white.main",
                      backgroundColor: "primary.main",
                      borderColor: "primary.main",
                      transition: "0.15s",
                    },
                  }}
                  component={Link}
                  to="/signin"
                >
                  Sign In
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
