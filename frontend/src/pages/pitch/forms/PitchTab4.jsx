import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FileUploader } from "../components/FileUploader";
import { FormRow } from "../components/FormRow";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const PitchTab4 = ({ pitch }) => {
  const { pitchId } = useParams();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const assets = pitch?.assets || [];
  const coverAsset = assets.find((a) => a.type === "cover");
  const generalAssets = assets.filter((a) => a.type === "general");
  const documentAsset = assets.find((a) => a.type === "document");

  const publishMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.patch(
        `${API_URL}/pitches/${pitch?.id}/publish`,
        {},
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: () => navigate("/dashboard/pitches"),
    onError: (err) => setServerError(err.response?.data?.message || err.message),
  });

  return (
    <section className="py-4 md:py-0">
      <div className="max-w-3xl mx-auto bg-white rounded-md border border-border drop-shadow-xs overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 bg-dark flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">Media</h2>
            <p className="text-xs text-white/60 mt-0.5">Upload a cover photo, gallery images, and a proposal document</p>
          </div>
          <Button
            type="button"
            disabled={publishMutation.isPending}
            onClick={() => publishMutation.mutate()}
            className="flex items-center gap-1.5 bg-white text-dark h-8 px-4 text-xs cursor-pointer font-medium shrink-0"
          >
            <Rocket size={13} />
            {publishMutation.isPending ? "Publishing..." : "Publish Pitch"}
          </Button>
        </div>
        <div className="h-0.5 bg-primary" />

        {serverError && (
          <div className="mx-6 mt-4 px-4 py-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
            {serverError}
          </div>
        )}

        {/* Cover Photo */}
        <FormRow
          label="Cover Photo"
          description="Main image shown on the pitch card. Recommended 16:9 ratio."
        >
          <FileUploader type="cover" pitchId={pitchId} asset={coverAsset} />
        </FormRow>

        {/* Gallery */}
        <FormRow
          label="Gallery"
          description="Up to 3 additional images showcasing your event or team."
        >
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <FileUploader
                key={i}
                type="general"
                pitchId={pitchId}
                asset={generalAssets[i]}
              />
            ))}
          </div>
        </FormRow>

        {/* Proposal Document */}
        <FormRow
          label="Proposal Document"
          description="Upload a PDF with your detailed sponsorship proposal."
        >
          <FileUploader type="document" pitchId={pitchId} asset={documentAsset} />
        </FormRow>

      </div>
    </section>
  );
};

PitchTab4.propTypes = {
  pitch: PropTypes.shape({
    id: PropTypes.number,
    assets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        type: PropTypes.string,
        secureUrl: PropTypes.string,
      }),
    ),
  }),
};

export default PitchTab4;
