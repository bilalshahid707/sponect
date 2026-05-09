import { memo, useId } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";
import { Loader2, Trash2, Upload } from "lucide-react";

import { FilePreview } from "./FilePreview";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const FileUploader = memo(({ type, pitchId, asset }) => {
  const queryClient = useQueryClient();
  const inputId = useId();

  const uploadMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post(
        `${API_URL}/pitches/${pitchId}/assets?tabNumber=4&tabName=media`,
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } },
      );
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pitch", pitchId] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(
        `${API_URL}/pitches/${pitchId}/assets/${asset.id}?tabNumber=4&tabName=media`,
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pitch", pitchId] }),
  });

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("asset", file);
    formData.append("type", type);
    uploadMutation.mutate(formData);
    e.target.value = "";
  };

  const isPending = uploadMutation.isPending || deleteMutation.isPending;
  const error = uploadMutation.error?.response?.data?.message
    || uploadMutation.error?.message
    || deleteMutation.error?.response?.data?.message
    || deleteMutation.error?.message;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative group w-full h-36 rounded-md border border-border overflow-hidden bg-white-light/40">
        <FilePreview src={asset?.secureUrl} type={type} />

        {/* Overlay actions */}
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <Loader2 size={20} className="animate-spin text-text-secondary" />
          </div>
        )}
        {!isPending && asset?.secureUrl && (
          <button
            type="button"
            onClick={() => deleteMutation.mutate()}
            className="absolute top-2 right-2 p-1.5 rounded-md bg-white border border-border text-text-secondary hover:text-red-500 hover:border-red-200 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={13} />
          </button>
        )}
        {!isPending && !asset?.secureUrl && (
          <label
            htmlFor={inputId}
            className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-white-light/60 transition-colors"
          >
            <Upload size={16} className="text-text-secondary" />
            <span className="text-xs text-text-secondary">Click to upload</span>
            <input
              id={inputId}
              type="file"
              accept={type === "document" ? "application/pdf" : "image/png,image/jpeg,image/webp"}
              className="sr-only"
              disabled={isPending}
              onChange={handleChange}
            />
          </label>
        )}
      </div>

      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
});

FileUploader.displayName = "FileUploader";

FileUploader.propTypes = {
  type: PropTypes.oneOf(["cover", "general", "document"]).isRequired,
  pitchId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  asset: PropTypes.shape({
    id: PropTypes.number,
    secureUrl: PropTypes.string,
  }),
};

export default FileUploader;
