import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PitchCard, PitchDesktopFilterbar, PitchFilterbar } from "./components";

const API_URL = import.meta.env.VITE_APP_API_URL;

const LoadingSkeleton = () => (
  <section className="py-4 min-h-screen bg-white">
    <div className="container flex flex-col gap-6">
      <div className="flex gap-4">
        <div className="hidden md:block w-64">
          <Skeleton className="h-10 w-28 mb-5" />
          <Skeleton className="h-[70vh] w-full rounded-md" />
        </div>
        <Separator className="hidden md:block" orientation="vertical" />
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-4 w-96" />
            <div className="md:hidden mt-2">
              <Skeleton className="h-9 w-28" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const AllPitches = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const buildPageHref = (nextPage) => {
    const params = new URLSearchParams(location.search);
    params.set("page", nextPage);
    return `/pitches?${params.toString()}`;
  };

  const onPaginationClick = (e, nextPage) => {
    e.preventDefault();
    if (nextPage < 1 || nextPage === page) return;
    setPage(nextPage);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    navigate(`?${params.toString()}`);
  }, [location.search, page]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["pitches-listing", location.search],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/pitches`, {
        params: searchParams,
        withCredentials: true,
      });
      return res.data.data;
    },
    staleTime: 15 * 60 * 1000,
  });

  const hasPrevious = page > 1;
  const hasNext = Boolean(data?.length === 12);
  const visiblePages = Array.from(
    new Set([Math.max(1, page - 1), page, ...(hasNext ? [page + 1] : [])])
  );

  if (isLoading) return <LoadingSkeleton />;

  return (
    <section className="py-4 min-h-screen bg-white">
      <div className="container flex flex-col gap-6">
        <div className="flex gap-4 w-full">

          {/* Desktop sidebar */}
          <div className="hidden md:block">
            <PitchDesktopFilterbar />
          </div>

          <Separator className="hidden md:block" orientation="vertical" />

          <div className="flex flex-col gap-8 w-full">
            {/* Header */}
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-3xl font-bold">Discover Pitches</h1>
              <p className="text-sm text-text-secondary">
                Explore sponsorship opportunities from organizations and events
              </p>
              <div className="md:hidden mt-2">
                <PitchFilterbar />
              </div>
            </div>

            <div className="flex-1 w-full">
              {/* Error */}
              {error && (
                <div className="w-full h-48 rounded-md flex flex-col items-center justify-center bg-red-50 border border-red-200 gap-2">
                  <p className="text-red-600 font-medium text-sm">Failed to load pitches. Please try again.</p>
                </div>
              )}

              {/* Grid */}
              {data && data.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-screen items-start">
                    {data.map((pitch) => (
                      <PitchCard key={pitch.id} pitch={pitch} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination className="mt-6">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href={buildPageHref(page - 1)}
                          className={!hasPrevious ? "pointer-events-none opacity-50" : ""}
                          onClick={(e) => onPaginationClick(e, page - 1)}
                        />
                      </PaginationItem>

                      {page > 2 && (
                        <>
                          <PaginationItem>
                            <PaginationLink
                              href={buildPageHref(1)}
                              onClick={(e) => onPaginationClick(e, 1)}
                            >
                              1
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        </>
                      )}

                      {visiblePages.map((p) => (
                        <PaginationItem key={p}>
                          <PaginationLink
                            href={buildPageHref(p)}
                            isActive={p === page}
                            onClick={(e) => onPaginationClick(e, p)}
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      {hasNext && (
                        <PaginationItem>
                          <PaginationNext
                            href={buildPageHref(page + 1)}
                            onClick={(e) => onPaginationClick(e, page + 1)}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </>
              ) : (
                !isLoading && !error && (
                  <div className="text-center py-20">
                    <p className="text-text-muted text-sm">No pitches found matching your filters.</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllPitches;
