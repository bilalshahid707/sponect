import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

export const PreviewButton = ({ pitchId }) => (
  <Link
    to={`/pitches/${pitchId}`}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-1.5 bg-white text-dark h-8 px-4 text-xs font-medium rounded-md shrink-0 hover:bg-white/90 transition-colors"
  >
    <Eye size={13} />
    Preview
  </Link>
);
