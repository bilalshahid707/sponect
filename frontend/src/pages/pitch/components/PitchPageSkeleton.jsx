import { Skeleton } from "@/components/ui/skeleton";

export const PitchPageSkeleton = () => (
  <div className="min-h-screen bg-bg">
    <Skeleton className="h-[420px] w-full rounded-none" />
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] gap-6">
      <div className="flex flex-col gap-6">
        <Skeleton className="h-40 rounded-md" />
        <Skeleton className="h-32 rounded-md" />
        <Skeleton className="h-32 rounded-md" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-12 rounded-md" />
        <Skeleton className="h-56 rounded-md" />
        <Skeleton className="h-28 rounded-md" />
      </div>
    </div>
  </div>
);
