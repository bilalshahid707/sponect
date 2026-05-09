import { useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { Select, Option } from "@mui/joy";
import { useFormik } from "formik";
import { sponsorshipSchema } from "../../../../../utils/validationSchemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FormFeedback } from "../../../../../components";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AddSponsorship = ({ openModal, setOpenModal }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values) => {
      const response = await axios.post(
        `${API_URL}/sponsors/me/sponsorships`,
        values,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
  const [open, setOpen] = useState(openModal);
  const [formFeedback, setFormFeedback] = useState();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      amountSponsored: "",
      status: "",
      thumbnail: null,
    },
    validationSchema: sponsorshipSchema,
    onSubmit: (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("amountSponsored", values.amountSponsored);
      formData.append("status", values.status);
      formData.append("thumbnail", values.thumbnail);
      mutation.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          setFormFeedback({
            severity: "success",
            message: "Sponsorship added",
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
            Add Sponsorship
          </Typography>
        </Box>

        {formFeedback && (
          <FormFeedback
            severity={formFeedback.severity}
            message={formFeedback.message}
          />
        )}

        <FormControl
          error={formik.touched.title && Boolean(formik.errors.title)}
        >
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            placeholder="students club"
            {...formik.getFieldProps("title")}
          />

          {formik.touched.title && formik.errors.title && (
            <FormHelperText>{formik.errors.title}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
        >
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="title"
            placeholder="write a short description"
            {...formik.getFieldProps("description")}
          />

          {formik.touched.description && formik.errors.description && (
            <FormHelperText>{formik.errors.description}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          error={
            formik.touched.amountSponsored &&
            Boolean(formik.errors.amountSponsored)
          }
        >
          <FormLabel>Amount Sponsored</FormLabel>
          <Input
            type="number"
            name="amountSponsored"
            placeholder="140000"
            {...formik.getFieldProps("amountSponsored")}
          />

          {formik.touched.amountSponsored && formik.errors.amountSponsored && (
            <FormHelperText>{formik.errors.amountSponsored}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          error={formik.touched.status && Boolean(formik.errors.status)}
        >
          <FormLabel>Status</FormLabel>
          <Select
            name="status"
            value={formik.values.status}
            placeholder="Active"
            onChange={(e, newValue) => {
              formik.setFieldValue("status", newValue);
            }}
          >
            <Option value="" disabled>
              Select status
            </Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>

          {formik.touched.status && formik.errors.status && (
            <FormHelperText>{formik.errors.status}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail)}
        >
          <FormLabel>Thumbnail</FormLabel>
          <Input
            type="file"
            name="thumbnail"
            onChange={(e) => {
              formik.setFieldValue("thumbnail", e.target.files[0]);
            }}
          />

          {formik.touched.thumbnail && formik.errors.thumbnail && (
            <FormHelperText>{formik.errors.thumbnail}</FormHelperText>
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
            }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddSponsorship;
