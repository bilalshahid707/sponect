import { Badge } from "@/components/ui/badge";

export const HeroChip = ({ icon: Icon, label }) => (
  <Badge
    variant="outline"
    className="gap-1.5 px-3 py-1.5 h-auto rounded-full bg-primary capitalize font-semibold text-white outline-none border-none"
  >
    <Icon size={11} className="text-white shrink-0" />
    {label}
  </Badge>
);
