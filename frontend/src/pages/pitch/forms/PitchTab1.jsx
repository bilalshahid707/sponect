import { useState } from "react";
import { useFormik } from "formik";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormRow } from "../components/FormRow";
import { RichTextEditor } from "../components/RichTextEditor";
import { PreviewButton } from "../components/PreviewButton";
import { genders, ageGroups, occupations } from "../../../utils/constants";
import { pitchTab1Schema } from "../../../utils/validationSchemas";

const API_URL = import.meta.env.VITE_APP_API_URL;
const MAX_CHARS = 1200;

const saveLabel = (status) => (status === "published" ? "Save" : "Save & Continue");

export const PitchTab1 = ({ pitch }) => {
  const queryClient = useQueryClient();
  const { pitchId } = useParams();
  const [, setSearchParams] = useSearchParams();
  const [serverError, setServerError] = useState(null);
  const [charCount, setCharCount] = useState(0);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.patch(
        `${API_URL}/pitches/${pitch?.id}/edit?tabNumber=1&tabName=details`,
        data,
        { withCredentials: true },
      );
      return res.data;
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: pitch?.description || "",
    onUpdate: ({ editor: e }) => setCharCount(e.getText().length),
  });

  const formik = useFormik({
    initialValues: {
      expectedAudience: pitch?.expectedAudience || "",
      gender: pitch?.gender || "",
      ageGroup: pitch?.ageGroup || "",
      occupation: pitch?.occupation || [],
    },
    validationSchema: pitchTab1Schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      if (!editor) return;
      setServerError(null);
      mutation.mutate(
        { ...values, description: editor.getJSON() },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pitch", pitchId] });
            if (pitch?.status !== "published") {
              setSearchParams({ tabNumber: 2, tabName: "promotion" });
            }
          },
          onError: (err) => {
            setServerError(err.response?.data?.message || err.message);
          },
          onSettled: () => setSubmitting(false),
        },
      );
    },
  });

  const toggleOccupation = (value) => {
    const current = formik.values.occupation;
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    formik.setFieldValue("occupation", updated);
  };

  return (
    <section className="py-4 md:py-0">
      <div className="max-w-3xl mx-auto bg-white rounded-md border border-border drop-shadow-xs overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 bg-dark flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">Details</h2>
            <p className="text-xs text-white/60 mt-0.5">Describe your pitch and define your target audience</p>
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

          {/* Description */}
          <FormRow
            label="Description"
            description="Tell sponsors what your event is about, its goals, and what they will gain."
          >
            <RichTextEditor editor={editor} charCount={charCount} maxChars={MAX_CHARS} />
          </FormRow>

          {/* Expected Audience */}
          <FormRow
            label="Expected Audience"
            description="Estimated number of attendees or participants."
            error={formik.touched.expectedAudience && formik.errors.expectedAudience}
          >
            <Input
              type="number"
              name="expectedAudience"
              placeholder="e.g. 500"
              min={1}
              {...formik.getFieldProps("expectedAudience")}
              aria-invalid={!!(formik.touched.expectedAudience && formik.errors.expectedAudience)}
            />
          </FormRow>

          {/* Gender */}
          <FormRow
            label="Target Gender"
            description="Which gender is your event primarily aimed at?"
            error={formik.touched.gender && formik.errors.gender}
          >
            <div className="flex gap-2 flex-wrap">
              {genders.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => formik.setFieldValue("gender", g)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors capitalize
                    ${formik.values.gender === g
                      ? "bg-dark text-white border-dark"
                      : "bg-white text-text-secondary border-border hover:border-dark/40"
                    }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </FormRow>

          {/* Age Group */}
          <FormRow
            label="Age Group"
            description="Primary age range of your target audience."
            error={formik.touched.ageGroup && formik.errors.ageGroup}
          >
            <select
              name="ageGroup"
              value={formik.values.ageGroup}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-8 w-full rounded-md border border-input bg-transparent px-2.5 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <option value="">Select age group</option>
              {ageGroups.map((ag) => (
                <option key={ag} value={ag}>{ag}</option>
              ))}
            </select>
          </FormRow>

          {/* Occupation */}
          <FormRow
            label="Occupation"
            description="Select all occupations that best describe your audience."
            error={formik.touched.occupation && formik.errors.occupation}
          >
            <div className="flex flex-wrap gap-2">
              {occupations.map((occ) => {
                const selected = formik.values.occupation.includes(occ);
                return (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => toggleOccupation(occ)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors capitalize
                      ${selected
                        ? "bg-dark text-white border-dark"
                        : "bg-white text-text-secondary border-border hover:border-dark/40"
                      }`}
                  >
                    {occ}
                  </button>
                );
              })}
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

PitchTab1.propTypes = {
  pitch: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    description: PropTypes.object,
    expectedAudience: PropTypes.number,
    gender: PropTypes.string,
    ageGroup: PropTypes.string,
    occupation: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default PitchTab1;
