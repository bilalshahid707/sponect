import { memo, useId } from "react";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { Loader2, Upload } from "lucide-react";
import { useUpdateSettings } from "../../../hooks/useUpdateSettings";
import { FilePreview } from "./FilePreview";

export const FileUploader = memo(({ path, queryKey, mediaName, src, type, className }) => {
  const queryClient = useQueryClient();
  const inputId = useId();
  const mutation = useUpdateSettings({ path });

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append(mediaName, file);
    mutation.mutate(formData, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
    });
    e.target.value = "";
  };

  const isPending = mutation.isPending;
  const error = mutation.error?.response?.data?.message || mutation.error?.message;

  return (
    <div className="flex flex-col gap-1.5">
      <div className={`relative group h-36 rounded-md border border-border overflow-hidden bg-white-light/40 ${className ?? "w-36"}`}>
        <FilePreview src={src} type={type} />

        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <Loader2 size={20} className="animate-spin text-text-secondary" />
          </div>
        )}

        {!isPending && (
          <label
            htmlFor={inputId}
            className={`absolute inset-0 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors ${src ? "opacity-0 group-hover:opacity-100 bg-black/40" : "hover:bg-white-light/60"}`}
          >
            <Upload size={16} className={src ? "text-white" : "text-text-secondary"} />
            <span className={`text-xs ${src ? "text-white" : "text-text-secondary"}`}>
              {src ? "Change" : "Click to upload"}
            </span>
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

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

FileUploader.displayName = "FileUploader";

FileUploader.propTypes = {
  path: PropTypes.string.isRequired,
  queryKey: PropTypes.string.isRequired,
  mediaName: PropTypes.string.isRequired,
  src: PropTypes.string,
  type: PropTypes.oneOf(["cover", "general", "document"]).isRequired,
  className: PropTypes.string,
};

export default FileUploader;
