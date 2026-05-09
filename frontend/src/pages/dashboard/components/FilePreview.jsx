import PropTypes from "prop-types";
import { FileText, ImageIcon } from "lucide-react";

export const FilePreview = ({ src, type }) => {
  if (!src) {
    return 
    
  }

  if (type === "document") {
    const fileName = src.split("/").pop().split("?")[0];
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 px-2">
        <FileText size={22} strokeWidth={1.5} className="text-primary" />
        <span className="text-xs text-text-secondary text-center truncate w-full">{fileName}</span>
      </div>
    );
  }

  return (
    <img src={src} alt="preview" className="w-full h-full object-cover" />
  );
};

FilePreview.propTypes = {
  src: PropTypes.string,
  type: PropTypes.oneOf(["cover", "general", "document"]).isRequired,
};

export default FilePreview;
