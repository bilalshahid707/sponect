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
import { Select, Option } from "@mui/joy";
import { useFormik } from "formik";
import { socialSchema } from "../../../utils/validationSchemas";
import { socials } from "../../../utils/constants";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormFeedback } from "../../../components";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AddSocialModal = ({ openModal, setOpenModal }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values) => {
      const response = await axios.post(`${API_URL}/socials`, values, {
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
      followerCount: 0,
      URL: "",
    },
    validationSchema: socialSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      mutation.mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          setFormFeedback({
            severity: "success",
            message: "Connected",
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
            Connect Your Social
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
          <Select
            name="name"
            value={formik.values.name}
            onChange={(e, newValue) => {
              formik.setFieldValue("name", newValue);
            }}
          >
            {socials.map((social) => (
              <Option
                key={social.id}
                value={social.name}
              >
                <i className={`${social.icon}`}></i>
                {social.name}
              </Option>
            ))}
          </Select>

          {formik.touched.name && formik.errors.name && (
            <FormHelperText>{formik.errors.name}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          error={
            formik.touched.followerCount && Boolean(formik.errors.followerCount)
          }
        >
          <FormLabel>Follower Count</FormLabel>
          <Input
            startDecorator={
              <AttachMoneyIcon sx={{ color: "dark.main", fontSize: 20 }} />
            }
            type="number"
            name="followerCount"
            placeholder="140000"
            {...formik.getFieldProps("followerCount")}
          />

          {formik.touched.followerCount && formik.errors.followerCount && (
            <FormHelperText>{formik.errors.followerCount}</FormHelperText>
          )}
        </FormControl>

        <FormControl error={formik.touched.URL && Boolean(formik.errors.URL)}>
          <FormLabel>Link</FormLabel>
          <Input
            startDecorator={
              <AttachMoneyIcon sx={{ color: "dark.main", fontSize: 20 }} />
            }
            type="text"
            name="URL"
            placeholder="https://www.linkedin.com/in/example09"
            {...formik.getFieldProps("URL")}
          />

          {formik.touched.URL && formik.errors.URL && (
            <FormHelperText>{formik.errors.URL}</FormHelperText>
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
            Connect
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddSocialModal;
