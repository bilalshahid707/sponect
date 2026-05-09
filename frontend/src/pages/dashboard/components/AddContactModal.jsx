import PropTypes from "prop-types";
import { useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { useFormik } from "formik";
import { contactSchema } from "../../../utils/validationSchemas";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormFeedback } from "../../../components";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AddContactModal = ({ openModal, setOpenModal }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values) => {
      const response = await axios.post(`${API_URL}/contacts`, values, {
        withCredentials: true,
      });
      return response.data;
    },
  });
  const [open, setOpen] = useState(openModal);
  const [formFeedback, setFormFeedback] = useState();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          setFormFeedback({
            severity: "success",
            message: "Added",
          });
        },
        onError: (error) => {
          setFormFeedback({
            severity: "error",
            message: error.response?.data?.message || error.message,
          });
        },
        onSettled: () => {
          setSubmitting(false);
        },
      });
    },
  });
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => {
        setOpen(false);
        setOpenModal(false);
      }}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-md bg-white p-lg rounded-lg"
      >
        <Box>
          <Typography
            level="title-lg"
            className="pb-2 border-b-2 border-white-light capitalize"
          >
            Add Contact
          </Typography>
        </Box>
        {formFeedback && (
          <FormFeedback
            severity={formFeedback.severity}
            message={formFeedback.message}
          />
        )}
        {/* Min Budget Field */}
        <FormControl error={formik.touched.name && Boolean(formik.errors.name)}>
          <FormLabel>Name</FormLabel>
          <Input
            startDecorator={
              <PersonIcon sx={{ color: "dark.main", fontSize: 20 }} />
            }
            name="name"
            type="text"
            {...formik.getFieldProps("name")}
          />

          {formik.touched.name && formik.errors.name && (
            <FormHelperText>{formik.errors.name}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          error={
            formik.touched.email && Boolean(formik.errors.email)
          }
        >
          <FormLabel>Email</FormLabel>
          <Input
            startDecorator={
              <EmailIcon sx={{ color: "dark.main", fontSize: 20 }} />
            }
            type="text"
            name="email"
            placeholder="example@gmail.com"
            {...formik.getFieldProps("email")}
          />

          {formik.touched.email && formik.errors.email && (
            <FormHelperText>{formik.errors.email}</FormHelperText>
          )}
        </FormControl>

        <FormControl error={formik.touched.phone && Boolean(formik.errors.phone)}>
          <FormLabel>Phone</FormLabel>
          <Input
            startDecorator={
              <PhoneIcon sx={{ color: "dark.main", fontSize: 20 }} />
            }
            type="number"
            name="phone"
            placeholder="+92324567809"
            {...formik.getFieldProps("phone")}
          />

          {formik.touched.phone && formik.errors.phone && (
            <FormHelperText>{formik.errors.phone}</FormHelperText>
          )}
        </FormControl>
        {/* Submit Button */}
        <Box className="=mt-sm">
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
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddContactModal;
