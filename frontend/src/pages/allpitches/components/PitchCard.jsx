import { Link } from "react-router-dom";
import { MapPin, Calendar, Users, Tag, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const fmt = (date) =>
  new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const PitchCard = ({ pitch }) => {
  const coverAsset = pitch.assets?.find((a) => a.type === "cover");

  return (
    <div className="relative bg-white rounded-md border-2 border-white-lighter overflow-hidden flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
      {/* Cover / dark header */}
      <div className="relative h-28 bg-dark overflow-hidden shrink-0">
        {coverAsset?.secureUrl ? (
          <img
            src={coverAsset.secureUrl}
            alt={pitch.title}
            className="w-full h-full object-cover opacity-50"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--color-dark-light),_var(--color-dark))]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />

        {/* Category badge */}
        <Badge className="absolute top-2 right-2 bg-primary border-primary/40 text-white rounded-full capitalize text-[10px] font-bold tracking-wide px-2.5 py-0.5 h-auto">
          {pitch.category}
        </Badge>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Title */}
        <h3 className="font-bold text-dark text-base leading-tight line-clamp-2 capitalize">
          {pitch.title}
        </h3>

        {/* Venue & dates */}
        <div className="flex flex-col gap-1.5">
          {pitch.venue && (
            <span className="flex items-center gap-1.5 text-xs text-text-secondary">
              <MapPin size={11} className="text-primary shrink-0" />
              <span className="capitalize truncate">{pitch.venue}</span>
            </span>
          )}
          {pitch.startAt && (
            <span className="flex items-center gap-1.5 text-xs text-text-secondary">
              <Calendar size={11} className="text-primary shrink-0" />
              {fmt(pitch.startAt)} — {fmt(pitch.endAt)}
            </span>
          )}
        </div>

        {/* Audience stats row */}
        <div className="flex flex-wrap gap-1.5">
          {pitch.expectedAudience && (
            <span className="inline-flex items-center gap-1 text-[11px] bg-primary-dark-soft text-dark px-2 py-0.5 rounded font-medium">
              <Users size={10} className="shrink-0" />
              {Number(pitch.expectedAudience).toLocaleString()} attendees
            </span>
          )}
          {pitch.gender && (
            <span className="inline-flex items-center gap-1 text-[11px] bg-primary-dark-soft text-dark px-2 py-0.5 rounded font-medium capitalize">
              <Tag size={10} className="shrink-0" />
              {pitch.gender}
            </span>
          )}
          {pitch.ageGroup && (
            <span className="inline-flex items-center gap-1 text-[11px] bg-primary-dark-soft text-dark px-2 py-0.5 rounded font-medium">
              {pitch.ageGroup}
            </span>
          )}
        </div>

        {/* Preferences */}
        {pitch.preferences?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {pitch.preferences.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1 text-[11px] border border-dark/20 text-dark px-2 py-0.5 rounded font-medium capitalize"
              >
                <Briefcase size={10} className="shrink-0" />
                {p === "inkind" ? "In-Kind" : "Cash"}
              </span>
            ))}
          </div>
        )}

        {/* Org name */}
        {pitch.sponsee?.name && (
          <p className="text-xs text-text-muted truncate capitalize mt-auto pt-2 border-t border-border">
            by {pitch.sponsee.name}
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <Link
          to={`/pitches/${pitch.id}`}
          className="block w-full text-center py-2 bg-dark hover:bg-dark-hover text-white text-sm font-semibold rounded-md transition-colors"
        >
          View Pitch
        </Link>
      </div>
    </div>
  );
};

export default PitchCard;
