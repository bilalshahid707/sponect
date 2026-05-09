import { useState } from "react";
import { useFormik } from "formik";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";

import { Button } from "@/components/ui/button";
import { FormRow } from "../components/FormRow";
import { TagInput } from "../components/TagInput";
import { PreviewButton } from "../components/PreviewButton";
import { preferences } from "../../../utils/constants";
import { pitchTab2Schema } from "../../../utils/validationSchemas";

const API_URL = import.meta.env.VITE_APP_API_URL;

const saveLabel = (status) => (status === "published" ? "Save" : "Save & Continue");

export const PitchTab2 = ({ pitch }) => {
  const queryClient = useQueryClient();
  const { pitchId } = useParams();
  const [, setSearchParams] = useSearchParams();
  const [serverError, setServerError] = useState(null);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.patch(
        `${API_URL}/pitches/${pitch?.id}/edit?tabNumber=2&tabName=promotion`,
        data,
        { withCredentials: true },
      );
      return res.data;
    },
  });

  const formik = useFormik({
    initialValues: {
      opportunities: pitch?.opportunities || [],
      promotionChannels: pitch?.promotionChannels || [],
      preferences: pitch?.preferences || [],
    },
    validationSchema: pitchTab2Schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      setServerError(null);
      mutation.mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["pitch", pitchId] });
          if (pitch?.status !== "published") {
            setSearchParams({ tabNumber: 3, tabName: "packages" });
          }
        },
        onError: (err) => {
          setServerError(err.response?.data?.message || err.message);
        },
        onSettled: () => setSubmitting(false),
      });
    },
  });

  const togglePreference = (value) => {
    const current = formik.values.preferences;
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    formik.setFieldValue("preferences", updated);
  };

  return (
    <section className="py-4 md:py-0">
      <div className="max-w-3xl mx-auto bg-white rounded-md border border-border drop-shadow-xs overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 bg-dark flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">Promotion</h2>
            <p className="text-xs text-white/60 mt-0.5">Define what you offer sponsors and how you will promote them</p>
          </div>
          {pitch?.status === "published" && <PreviewButton pitchId={pitch.id} />}
        </div>
        <div className="h-0.5 bg-primary" />

        {serverError && (
          <div className="mx-6 mt-4 px-4 py-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>

          {/* Opportunities */}
          <FormRow
            label="Opportunities"
            description="What sponsorship opportunities are available? e.g. logo placement, booth space, speaking slot."
            error={formik.touched.opportunities && formik.errors.opportunities}
          >
            <TagInput
              values={formik.values.opportunities}
              onChange={(val) => formik.setFieldValue("opportunities", val)}
              placeholder="e.g. logo placement"
            />
          </FormRow>

          {/* Promotion Channels */}
          <FormRow
            label="Promotion Channels"
            description="Where will you promote sponsors? e.g. Instagram, banners, email newsletter."
            error={formik.touched.promotionChannels && formik.errors.promotionChannels}
          >
            <TagInput
              values={formik.values.promotionChannels}
              onChange={(val) => formik.setFieldValue("promotionChannels", val)}
              placeholder="e.g. Instagram"
            />
          </FormRow>

          {/* Preferences */}
          <FormRow
            label="Sponsorship Type"
            description="What kind of sponsorship are you open to?"
            error={formik.touched.preferences && formik.errors.preferences}
          >
            <div className="flex gap-2 flex-wrap">
              {preferences.map((pref) => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => togglePreference(pref)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors capitalize
                    ${formik.values.preferences.includes(pref)
                      ? "bg-dark text-white border-dark"
                      : "bg-white text-text-secondary border-border hover:border-dark/40"
                    }`}
                >
                  {pref === "inkind" ? "In-Kind" : "Cash"}
                </button>
              ))}
            </div>
          </FormRow>

          {/* Footer */}
          <div className="px-6 py-4 flex justify-end bg-white-light/40 border-t border-border">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-dark text-white hover:bg-dark-hover px-6 h-9 text-sm"
            >
              {formik.isSubmitting ? "Saving..." : saveLabel(pitch?.status)}
            </Button>
          </div>

        </form>
      </div>
    </section>
  );
};

PitchTab2.propTypes = {
  pitch: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    opportunities: PropTypes.arrayOf(PropTypes.string),
    promotionChannels: PropTypes.arrayOf(PropTypes.string),
    preferences: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default PitchTab2;
