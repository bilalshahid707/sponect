import PropTypes from "prop-types";
import { useState } from "react";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TagInput } from "../components/TagInput";
import { packageSchema } from "../../../utils/validationSchemas";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AddPackageForm = ({ pitch, onSuccess, onCancel }) => {
  const queryClient = useQueryClient();
  const { pitchId } = useParams();
  const [serverError, setServerError] = useState(null);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        `${API_URL}/pitches/${pitch?.id}/packages?tabNumber=3&tabName=packages`,
        data,
        { withCredentials: true },
      );
      return res.data;
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      deliverables: [],
    },
    validationSchema: packageSchema,
    onSubmit: (values, { setSubmitting }) => {
      setServerError(null);
      mutation.mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["pitch", pitchId] });
          onSuccess?.();
        },
        onError: (err) => {
          setServerError(err.response?.data?.message || err.message);
        },
        onSettled: () => setSubmitting(false),
      });
    },
  });

  return (
    <div className="rounded-md border border-border overflow-hidden">
      {/* Form header */}
      <div className="px-5 py-3.5 bg-dark flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">New Package</h3>
          <p className="text-xs text-white/60 mt-0.5">Fill in the package details below</p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-white/60 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <div className="h-0.5 bg-primary" />

      {serverError && (
        <div className="mx-5 mt-4 px-4 py-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
          {serverError}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="p-5 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-primary">Title</label>
            <Input
              name="title"
              placeholder="e.g. Gold Package"
              {...formik.getFieldProps("title")}
            />
            {formik.touched.title && formik.errors.title && (
              <span className="text-xs text-red-500">{formik.errors.title}</span>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-primary">Price (PKR)</label>
            <Input
              type="number"
              name="price"
              placeholder="e.g. 50000"
              min={0}
              {...formik.getFieldProps("price")}
            />
            {formik.touched.price && formik.errors.price && (
              <span className="text-xs text-red-500">{formik.errors.price}</span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-text-primary">Description</label>
          <textarea
            name="description"
            rows={3}
            placeholder="Briefly describe what this package includes..."
            {...formik.getFieldProps("description")}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-text-primary placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 resize-none"
          />
          {formik.touched.description && formik.errors.description && (
            <span className="text-xs text-red-500">{formik.errors.description}</span>
          )}
        </div>

        {/* Deliverables */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-text-primary">Deliverables</label>
          <p className="text-xs text-text-secondary">Type a deliverable and press Enter or comma to add.</p>
          <TagInput
            values={formik.values.deliverables}
            onChange={(val) => formik.setFieldValue("deliverables", val)}
            placeholder="e.g. Logo on banner"
          />
          {formik.touched.deliverables && formik.errors.deliverables && (
            <span className="text-xs text-red-500">{formik.errors.deliverables}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="h-9 px-5 text-sm border-border text-text-secondary hover:text-text-primary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-dark text-white hover:bg-dark-hover h-9 px-5 text-sm"
          >
            {formik.isSubmitting ? "Adding..." : "Add Package"}
          </Button>
        </div>
      </form>
    </div>
  );
};

AddPackageForm.propTypes = {
  pitch: PropTypes.shape({ id: PropTypes.number }),
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

export default AddPackageForm;
