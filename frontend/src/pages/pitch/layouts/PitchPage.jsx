import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "motion/react";
import {
  MapPin,
  Calendar,
  Users,
  ArrowLeft,
  FileText,
  Building2,
  Tag,
  Briefcase,
  Globe,
  Hash,
  Mail,
  Phone,
  Link2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PitchPageSkeleton } from "../components/PitchPageSkeleton";
import { SectionHeading } from "../components/SectionHeading";
import { PitchCard } from "../components/PitchCard";
import { HeroChip } from "../components/HeroChip";
import { PackageCard } from "../components/PackageCard";

const API_URL = import.meta.env.VITE_APP_API_URL;

const fmt = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

function pkgGridClass(count) {
  if (count === 1) return "grid-cols-1 max-w-sm";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2 max-w-2xl";
  return "grid-cols-1 sm:grid-cols-3";
}

// ── Main ──────────────────────────────────────────────────────────────────────
export const PitchPage = () => {
  const { pitchId } = useParams();

  const { data: pitch, isLoading } = useQuery({
    queryKey: ["pitch-public", pitchId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/pitches/${pitchId}`);
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const sponseeId = pitch?.sponseeId;
  const { data: sponsee } = useQuery({
    queryKey: ["sponsee-public", sponseeId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/sponsees/${sponseeId}`);
      return res.data.data;
    },
    enabled: !!sponseeId,
    staleTime: 10 * 60 * 1000,
  });
console.log(sponsee)
  if (isLoading) return <PitchPageSkeleton />;
  if (!pitch) return null;

  const coverAsset = pitch.assets?.find((a) => a.type === "cover");
  const generalAssets = pitch.assets?.filter((a) => a.type === "general") || [];
  const documentAsset = pitch.assets?.find((a) => a.type === "document");
  const hasPackages = pitch.packages?.length > 0;
  const hasGallery = generalAssets.length > 0;
  const org = sponsee || pitch.sponsee;

  return (
    <div className="min-h-screen bg-bg">
      {/* ── Hero ── */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn}
        className="relative w-full h-[400px] md:h-[480px] bg-dark overflow-hidden"
      >
        {coverAsset?.secureUrl ? (
          <img
            src={coverAsset.secureUrl}
            alt="cover"
            className="w-full h-full object-cover opacity-40"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--color-dark-light),_var(--color-dark))]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(var(--color-white)_1px,transparent_1px),linear-gradient(90deg,var(--color-white)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <Link
          to="/pitches"
          className="absolute top-6 left-6 md:left-10 flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-medium transition-colors"
        >
          <ArrowLeft size={13} /> All Pitches
        </Link>

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-10"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp}>
              <Badge className="bg-primary border border-primary/40 text-white rounded-full capitalize font-bold tracking-wide mb-4 px-3 py-1 h-auto">
                {pitch.category}
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-3xl md:text-5xl font-black text-white leading-tight capitalize max-w-3xl"
            >
              {pitch.title}
            </motion.h1>
            {pitch.venue && (
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-2 mt-4 text-white/60 text-sm"
              >
                <MapPin size={13} className="text-primary" />
                <span className="capitalize">{pitch.venue}</span>
                {pitch.startAt && (
                  <>
                    <span className="text-white/20">·</span>
                    <Calendar size={13} className="text-primary" />
                    <span>
                      {fmt(pitch.startAt)} — {fmt(pitch.endAt)}
                    </span>
                  </>
                )}
              </motion.div>
            )}
            {/* Hero chips row */}

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-4">
              {pitch.preferences?.map((p) => (
                <HeroChip
                  key={p}
                  icon={Briefcase}
                  label={p === "inkind" ? "In-Kind" : "Cash"}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Body ── */}
      <section className="bg-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          {/* ── Left column ── */}
          <div className="flex flex-col gap-6">
            {/* About */}
            {pitch.description && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
              >
                <PitchCard>
                  <SectionHeading>About this Pitch</SectionHeading>
                  <div
                    className="
                      text-base text-text-secondary leading-7
                      [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
                      [&_li]:mb-1.5 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40
                      [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-text-secondary
                      [&_strong]:text-text-primary [&_strong]:font-semibold
                      [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-text-primary [&_h2]:mb-3 [&_h2]:mt-2
                    "
                    dangerouslySetInnerHTML={{
                      __html: renderDescription(pitch.description),
                    }}
                  />
                </PitchCard>
              </motion.div>
            )}

            {/* Target Audience */}
            {(pitch.occupation?.length > 0 ||
              pitch.gender ||
              pitch.ageGroup ||
              pitch.expectedAudience) && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
              >
                <PitchCard>
                  <SectionHeading>Target Audience</SectionHeading>
                  <div className="flex flex-col gap-4">
                    {pitch.occupation?.length > 0 && (
                      <div>
                        <p className="text-xs text-text-muted uppercase tracking-widest font-semibold mb-2">
                          Occupation
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {pitch.occupation.map((occ) => (
                            <Badge
                              key={occ}
                              variant="outline"
                              className="px-3 py-1.5 h-auto rounded-full capitalize text-text-secondary font-medium hover:border-dark/30 transition-colors"
                            >
                              {occ}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
                      {pitch.expectedAudience && (
                        <div className="rounded-lg border border-gray-700 bg-gray-800 p-3">
                          <h3 className="text-white text-lg font-semibold leading-tight">
                            {Number(pitch.expectedAudience).toLocaleString()}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Expected Attendees
                          </p>
                        </div>
                      )}
                      {pitch.gender && (
                        <div className="rounded-lg border border-gray-700 bg-gray-800 p-3">
                          <h3 className="text-white text-lg font-semibold leading-tight capitalize">
                            {pitch.gender}
                          </h3>
                          <p className="text-gray-400 text-sm">Target Gender</p>
                        </div>
                      )}
                      {pitch.ageGroup && (
                        <div className="rounded-lg border border-gray-700 bg-gray-800 p-3">
                          <h3 className="text-white text-lg font-semibold leading-tight">
                            {pitch.ageGroup}
                          </h3>
                          <p className="text-gray-400 text-sm">Age Group</p>
                        </div>
                      )}
                    </div>
                  </div>
                </PitchCard>
              </motion.div>
            )}

            {/* Organized by */}
            {org && !org.name ? (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
              >
                <PitchCard>
                  <SectionHeading>Organized by</SectionHeading>
                  <p className="text-sm text-text-muted mt-2">No info about organization provided.</p>
                </PitchCard>
              </motion.div>
            ) : org?.name && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
              >
                <PitchCard>
                  <SectionHeading>Organized by</SectionHeading>
                  <div className="flex items-center gap-3 mt-2 mb-4">
                    {org.logo?.url || org.logo ? (
                      <img
                        src={org.logo?.url || org.logo}
                        alt={org.name}
                        className="w-12 h-12 rounded-lg object-cover border border-border shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-dark flex items-center justify-center shrink-0">
                        <Building2 size={20} className="text-white" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-text-primary truncate capitalize">
                        {org.name}
                      </p>
                      {org.tagline && (
                        <p className="text-xs text-text-secondary truncate mt-0.5">
                          {org.tagline}
                        </p>
                      )}
                    </div>
                  </div>
                  {org.description && (
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-4 border-t border-border pt-3 mb-3">
                      {org.description}
                    </p>
                  )}
                  <div className="flex flex-col gap-2">
                    {org.location && (
                      <span className="flex items-center gap-2 text-xs text-text-secondary">
                        <MapPin size={11} className="text-primary shrink-0" />
                        {org.location}
                      </span>
                    )}
                    {org.founded && (
                      <span className="flex items-center gap-2 text-xs text-text-secondary">
                        <Globe size={11} className="text-primary shrink-0" />
                        Founded {org.founded}
                      </span>
                    )}
                    {org.teamSize && (
                      <span className="flex items-center gap-2 text-xs text-text-secondary">
                        <Users size={11} className="text-primary shrink-0" />
                        {org.teamSize} team members
                      </span>
                    )}
                    {org.activityTypes?.length > 0 && (
                      <span className="flex items-center gap-2 text-xs text-text-secondary">
                        <Hash size={11} className="text-primary shrink-0" />
                        {org.activityTypes.join(", ")}
                      </span>
                    )}
                    {org.totalCollaborations > 0 && (
                      <span className="flex items-center gap-2 text-xs text-text-secondary">
                        <Briefcase
                          size={11}
                          className="text-primary shrink-0"
                        />
                        {org.totalCollaborations} collaborations
                      </span>
                    )}
                  </div>

                  {/* Socials */}
                  {org.socials?.length > 0 && (
                    <div className="border-t border-border pt-4 mt-2">
                      <p className="text-xs text-text-muted uppercase tracking-widest font-semibold mb-3">
                        Socials
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {org.socials.map((social) => (
                          <a
                            key={social.name}
                            href={social.URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={social.name}
                            className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-primary transition-colors capitalize"
                          >
                            <Link2
                              size={12}
                              className="text-primary shrink-0"
                            />
                            {social.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contacts */}
                  {org.contacts?.length > 0 && (
                    <div className="border-t border-border pt-4 mt-2">
                      <p className="text-xs text-text-muted uppercase tracking-widest font-semibold mb-3">Contacts</p>
                      <div className="flex flex-col gap-3">
                        {org.contacts.map((contact) => (
                          <div key={contact.id} className="rounded-md border border-border overflow-hidden">
                            {/* Contact header */}
                            <div className="flex items-center gap-3 px-4 py-3 bg-dark">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/20 shrink-0 text-white font-bold text-sm">
                                {contact.name?.charAt(0).toUpperCase()}
                              </div>
                              <p className="text-sm font-semibold text-white truncate">{contact.name}</p>
                            </div>
                            {/* Contact details */}
                            <div className="px-4 py-3 flex flex-col gap-2 bg-white">
                              {contact.email && (
                                <a
                                  href={`mailto:${contact.email}`}
                                  className="flex items-center gap-2 text-xs text-text-secondary hover:text-primary transition-colors group"
                                >
                                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 shrink-0">
                                    <Mail size={11} className="text-primary" />
                                  </span>
                                  <span className="truncate group-hover:underline">{contact.email}</span>
                                </a>
                              )}
                              {contact.phone && (
                                <a
                                  href={`tel:${contact.phone}`}
                                  className="flex items-center gap-2 text-xs text-text-secondary hover:text-primary transition-colors group"
                                >
                                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 shrink-0">
                                    <Phone size={11} className="text-primary" />
                                  </span>
                                  <span className="group-hover:underline">{contact.phone}</span>
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </PitchCard>
              </motion.div>
            )}

            {/* Proposal Document */}
            {documentAsset?.secureUrl && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
              >
                <PitchCard>
                  <SectionHeading>Proposal Document</SectionHeading>
                  <a
                    href={documentAsset.secureUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-4 px-5 py-4 rounded-md border border-border bg-bg hover:border-primary/30 hover:shadow-sm transition-all group mt-2"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        Download Proposal
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        PDF document
                      </p>
                    </div>
                  </a>
                </PitchCard>
              </motion.div>
            )}
          </div>

          {/* ── Right sidebar ── */}
          <div className="flex flex-col gap-4">
            {/* CTA */}
            <motion.button
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              type="button"
              className="w-full py-3.5 rounded-md bg-primary hover:bg-primary-hover text-white text-sm font-bold tracking-wide transition-colors shadow-md shadow-primary/20"
            >
              Express Interest
            </motion.button>

            {/* Opportunities & Channels */}
            {(pitch.opportunities?.length > 0 ||
              pitch.promotionChannels?.length > 0) && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
              >
                <PitchCard>
                  {pitch.opportunities?.length > 0 && (
                    <div className="mb-6">
                      <SectionHeading>Opportunities</SectionHeading>
                      <ul className="flex flex-col gap-3 mt-2">
                        {pitch.opportunities.map((o) => (
                          <li
                            key={o}
                            className="flex items-center gap-3 text-sm text-text-secondary"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <span className="capitalize">{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pitch.promotionChannels?.length > 0 && (
                    <div>
                      <SectionHeading>Promotion Channels</SectionHeading>
                      <ul className="flex flex-col gap-3 mt-2">
                        {pitch.promotionChannels.map((c) => (
                          <li
                            key={c}
                            className="flex items-center gap-3 text-sm text-text-secondary"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-dark-lighter shrink-0" />
                            <span className="capitalize">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </PitchCard>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      {hasGallery && (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeIn}
          className="mb-12"
        >
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 mb-5 pt-10">
            <h4 className="text-xl font-semibold relative w-max mb-6">
              Gallery
              <div className="absolute w-1/2 bg-primary -bottom-1 left-0 h-0.5" />
            </h4>
          </div>
          <div className="flex gap-1">
            {generalAssets.map((a) => (
              <div
                key={a.id}
                className="flex-1 h-56 overflow-hidden bg-dark group cursor-zoom-in"
              >
                <img
                  src={a.secureUrl}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 brightness-90 group-hover:brightness-70"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Packages ── */}
      {hasPackages && (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 pb-20"
        >
          <div className="mb-8">
            <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest mb-2">
              Invest in the vision
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-text-primary">
              Sponsorship Packages
            </h2>
          </div>
          <div className={`grid gap-5 ${pkgGridClass(pitch.packages.length)}`}>
            {pitch.packages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

function renderDescription(content) {
  if (!content) return "";
  if (typeof content === "string") return content;
  const renderNode = (node) => {
    if (!node) return "";
    if (node.type === "text") {
      let text = node.text || "";
      if (node.marks) {
        node.marks.forEach((m) => {
          if (m.type === "bold") text = `<strong>${text}</strong>`;
          if (m.type === "italic") text = `<em>${text}</em>`;
          if (m.type === "underline") text = `<u>${text}</u>`;
          if (m.type === "strike") text = `<s>${text}</s>`;
        });
      }
      return text;
    }
    const inner = (node.content || []).map(renderNode).join("");
    const align = node.attrs?.textAlign
      ? ` style="text-align:${node.attrs.textAlign}"`
      : "";
    switch (node.type) {
      case "paragraph":
        return `<p${align}>${inner}</p>`;
      case "heading":
        return `<h${node.attrs?.level || 2}${align}>${inner}</h${node.attrs?.level || 2}>`;
      case "bulletList":
        return `<ul>${inner}</ul>`;
      case "orderedList":
        return `<ol>${inner}</ol>`;
      case "listItem":
        return `<li>${inner}</li>`;
      case "blockquote":
        return `<blockquote>${inner}</blockquote>`;
      case "hardBreak":
        return `<br/>`;
      case "doc":
        return inner;
      default:
        return inner;
    }
  };
  return renderNode(content);
}

export default PitchPage;
