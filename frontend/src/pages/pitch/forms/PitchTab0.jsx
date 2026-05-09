import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormRow } from "../components/FormRow";
import { pitchCategories } from "../../../utils/constants";
import { pitchTab0Schema } from "../../../utils/validationSchemas";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const PitchTab0 = ({ pitch }) => {
  const queryClient = useQueryClient();
  const { pitchId } = useParams();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (pitch?.id) {
        const res = await axios.patch(
          `${API_URL}/pitches/${pitch.id}/edit?tabNumber=0&tabName=create`,
          data,
          { withCredentials: true },
        );
        return res.data;
      }
      const res = await axios.post(
        `${API_URL}/pitches/create?tabNumber=0&tabName=create`,
        data,
        { withCredentials: true },
      );
      return res.data;
    },
  });

  const formik = useFormik({
    initialValues: {
      title: pitch?.title || "",
      category: pitch?.category || "",
      venue: pitch?.venue || "",
      startAt: pitch?.startAt?.slice(0, 10) || "",
      endAt: pitch?.endAt?.slice(0, 10) || "",
    },
    validationSchema: pitchTab0Schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      setServerError(null);
      mutation.mutate(values, {
        onSuccess: (data) => {
          if (pitch?.id) {
            queryClient.invalidateQueries({ queryKey: ["pitch", pitchId] });
          }
          navigate(
            `/pitches/${data.data.id}/edit?tabNumber=1&tabName=details`,
          );
        },
        onError: (err) => {
          setServerError(err.response?.data?.message || err.message);
        },
        onSettled: () => setSubmitting(false),
      });
    },
  });

  return (
    <section className="py-4 md:py-0">
      <div className="max-w-3xl mx-auto bg-white rounded-md border border-border drop-shadow-xs overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 bg-dark">
          <h2 className="text-base font-semibold text-white">Overview</h2>
          <p className="text-xs text-white/60 mt-0.5">Basic information about your pitch</p>
        </div>
        <div className="h-0.5 bg-primary" />

        {serverError && (
          <div className="mx-6 mt-4 px-4 py-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>

          <FormRow
            label="Title"
            description="Give your pitch a clear, descriptive title that sponsors can easily understand."
            error={formik.touched.title && formik.errors.title}
          >
            <Input
              name="title"
              placeholder="e.g. Career Fair 2026 — FCIT"
              className="rounded-md"
              {...formik.getFieldProps("title")}
              aria-invalid={!!(formik.touched.title && formik.errors.title)}
            />
          </FormRow>

          <FormRow
            label="Category"
            description="Choose the category that best describes your pitch."
            error={formik.touched.category && formik.errors.category}
          >
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-8 w-full rounded-md border border-input bg-transparent px-2.5 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring capitalize"
            >
              <option value="">Select a category</option>
              {pitchCategories.map((cat) => (
                <option key={cat} value={cat} className="capitalize">
                  {cat}
                </option>
              ))}
            </select>
          </FormRow>

          <FormRow
            label="Venue"
            description="Where will this event or activity take place?"
            error={formik.touched.venue && formik.errors.venue}
          >
            <Input
              name="venue"
              placeholder="e.g. Chemical Hall, FCIT"
              className="rounded-md"
              {...formik.getFieldProps("venue")}
              aria-invalid={!!(formik.touched.venue && formik.errors.venue)}
            />
          </FormRow>

          <FormRow
            label="Event Dates"
            description="Set the start and end date for your pitch."
            error={
              (formik.touched.startAt && formik.errors.startAt) ||
              (formik.touched.endAt && formik.errors.endAt)
            }
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-text-secondary">Start date</span>
                <Input
                  type="date"
                  name="startAt"
                  className="rounded-md"
                  {...formik.getFieldProps("startAt")}
                  aria-invalid={!!(formik.touched.startAt && formik.errors.startAt)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-text-secondary">End date</span>
                <Input
                  type="date"
                  name="endAt"
                  {...formik.getFieldProps("endAt")}
                  aria-invalid={!!(formik.touched.endAt && formik.errors.endAt)}
                />
              </div>
            </div>
          </FormRow>

          {/* Footer */}
          <div className="px-6 py-4 flex justify-end bg-white-light/40 border-t border-border">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-dark text-white hover:bg-dark-hover px-6 h-9 text-sm"
            >
              {formik.isSubmitting ? "Saving..." : "Save & Continue"}
            </Button>
          </div>

        </form>
      </div>
    </section>
  );
};

PitchTab0.propTypes = {
  pitch: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    category: PropTypes.string,
    venue: PropTypes.string,
    startAt: PropTypes.string,
    endAt: PropTypes.string,
  }),
};

export default PitchTab0;
