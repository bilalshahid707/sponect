import { useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateSettings } from "../../../../hooks/useUpdateSettings";
import { FormFeedback } from "../../../../components";
import { FileUploader } from "../../components/FileUploader";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import WorkIcon from "@mui/icons-material/Work";
import { profileSchema } from "../../../../utils/validationSchemas";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Select,
  Option,
  CircularProgress,
} from "@mui/joy";

export const SettingsForm = () => {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.User?.Data);

  const mutation = useUpdateSettings({ path: "users/me" });

  const [formFeedback, setFormFeedback] = useState();

  const formik = useFormik({
    initialValues: {
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      role: user?.role || "",
      designation: user?.designation || "",
    },

    enableReinitialize: true,

    validationSchema: profileSchema,

    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      mutation.mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
          setFormFeedback({
            message: "Settings saved successfully",
            severity: "success",
          });
        },
        onError: (error) => {
          setFormFeedback({
            message: error.response?.data?.message || error.message,
            severity: "error",
          });
        },
        onSettled: () => {
          setSubmitting(false);
        },
      });
    },
  });

  return (
    <section className="section" style={{ py: '1rem' }}>
      <Box className="max-w-4xl mx-auto border-2 border-white-light p-lg rounded-md">
        <Box className="p-0.5 bg-white relative flex flex-col gap-lg">
          <div>
            <h3 className="heading-tertiary pb-2 border-b-2 border-white-light">
              Upload Profile Picture
            </h3>
          </div>

          <div className="upload-photo">
            <FileUploader
              path={"users/me/avatar"}
              queryKey={"user"}
              src={user?.avatar?.url || "https://res.cloudinary.com/sponect/image/upload/v1769532285/avatar_t7chlx.webp"}
              mediaName={"avatar"}
              type="general"
            />
          </div>

          <div>
            <h3 className="heading-tertiary pb-2 border-b-2 border-white-light">
              Account Settings
            </h3>
          </div>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-md text-white"
          >
            {formFeedback && (
              <FormFeedback
                message={formFeedback.message}
                severity={formFeedback.severity}
              />
            )}
            {/* Full Name */}
            <FormControl
              error={formik.touched.username && !!formik.errors.username}
            >
              <FormLabel>Username</FormLabel>
              <Input
                slotProps={{
                  input: {
                    className: "text-dark",
                  },
                }}
                startDecorator={<PersonIcon sx={{ fontSize: 20 }} />}
                type="text"
                name="username"
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username && (
                <FormHelperText>{formik.errors.username}</FormHelperText>
              )}
            </FormControl>

            {/* Email */}
            <FormControl error={formik.touched.email && !!formik.errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                slotProps={{
                  input: {
                    className: "text-dark",
                  },
                }}
                startDecorator={<EmailIcon sx={{ fontSize: 20 }} />}
                type="email"
                name="email"
                placeholder="you@domain.com"
                autoComplete="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <FormHelperText>{formik.errors.email}</FormHelperText>
              )}
            </FormControl>

            {/* Phone */}
            <FormControl error={formik.touched.phone && !!formik.errors.phone}>
              <FormLabel>Phone</FormLabel>
              <Input
                slotProps={{
                  input: {
                    className: "text-dark",
                  },
                }}
                startDecorator={<PhoneIcon sx={{ fontSize: 20 }} />}
                type="tel"
                name="phone"
                placeholder="1234567890"
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone && (
                <FormHelperText>{formik.errors.phone}</FormHelperText>
              )}
            </FormControl>

            {/* Account Type */}
            <FormControl error={formik.touched.role && !!formik.errors.role}>
              <FormLabel>Role</FormLabel>
              <Select
                slotProps={{
                  listbox: {
                    className: "text-dark",
                  },
                }}
                startDecorator={<BadgeIcon sx={{ fontSize: 20 }} />}
                disabled
                defaultValue={formik.values.role}
              >
                <Option value="" disabled>
                  Select Account Type
                </Option>
                <Option value="sponsee">Sponsee</Option>
                <Option value="sponsor">Sponsor</Option>
              </Select>
              {formik.touched.role && formik.errors.role && (
                <FormHelperText>{formik.errors.role}</FormHelperText>
              )}
            </FormControl>

            {/* Designation */}
            <FormControl
              error={formik.touched.designation && !!formik.errors.designation}
            >
              <FormLabel>Designation</FormLabel>
              <Input
                slotProps={{
                  input: {
                    className: "text-dark",
                  },
                }}
                startDecorator={<WorkIcon sx={{ fontSize: 20 }} />}
                type="text"
                name="designation"
                placeholder="e.g. Senior Engineer"
                {...formik.getFieldProps("designation")}
              />
              {formik.touched.designation && formik.errors.designation && (
                <FormHelperText>{formik.errors.designation}</FormHelperText>
              )}
            </FormControl>

            {/* Submit Button */}
            <Box className="form-field mt-md">
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
              >
                {formik.isSubmitting ? <CircularProgress /> : "Save"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default SettingsForm;
