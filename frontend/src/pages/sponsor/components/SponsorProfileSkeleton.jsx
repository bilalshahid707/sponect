// frontend/src/pages/sponsor/components/SponsorProfileSkeleton.jsx
import { Skeleton } from "@/components/ui/skeleton";

export default function SponsorProfileSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>

      {/* Sponsorship Preferences */}
      <section className="space-y-4">
        <Skeleton className="h-5 w-52" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </section>

      {/* Socials */}
      <section className="space-y-4">
        <Skeleton className="h-5 w-32" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </section>

      {/* Contacts */}
      <section className="space-y-4">
        <Skeleton className="h-5 w-36" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </section>
    </div>
  );
}
