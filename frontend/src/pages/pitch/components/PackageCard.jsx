import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const PackageCard = ({ pkg, index }) => (
  <motion.div
    variants={fadeUp}
    className="flex flex-col rounded-md bg-white overflow-hidden h-full drop-shadow-xl hover:shadow-md transition-shadow duration-300"
  >
    <div className="p-5 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-dark-light),_transparent)]" />
      <Badge className="bg-white/10 text-white/50 border-white/10 rounded-full mb-2 relative uppercase tracking-widest">
        Tier {index + 1}
      </Badge>
      <h3 className="text-lg font-bold text-white capitalize relative">{pkg.title}</h3>
      <p className="text-2xl font-black text-white mt-2 relative">
        PKR {Number(pkg.price).toLocaleString()}
      </p>
    </div>
    <div className="px-6 py-5 flex flex-col gap-3 flex-1">
      {pkg.description && (
        <p className="text-sm text-text-secondary leading-relaxed">{pkg.description}</p>
      )}
      {pkg.deliverables?.length > 0 && (
        <ul className="flex flex-col gap-2.5 mt-1 pt-3 border-t border-border">
          {pkg.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-2.5 text-sm text-text-secondary">
              <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
              <span className="capitalize">{d}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </motion.div>
);
