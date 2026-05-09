import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/joy";
import { SponsorCard } from "./components/SponsorCard";
import { Filterbar } from "./components/Filterbar";
import { DesktopFilterbar } from "./components/DesktopFilterbar";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
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

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AllSponsors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const handlePageChange = (nextPage) => {
    setPage(nextPage);
  };

  const buildPageHref = (nextPage) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", nextPage);
    return `/sponsors?${queryParams.toString()}`;
  };

  const onPaginationClick = (event, nextPage) => {
    event.preventDefault();
    if (nextPage < 1 || nextPage === page) return;
    handlePageChange(nextPage);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", page);
    const newUrl = `?${queryParams.toString()}`;
    navigate(newUrl);
  }, [location.search, page]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["sponsors", location.search],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/sponsors`, {
        params: searchParams,
        withCredentials: true,
      });
      return response.data.data;
    },
    staleTime:15 * 60 * 1000,
  });

  const hasPrevious = page > 1;
  const hasNext = Boolean(data?.length === 12);
  const visiblePages = Array.from(
    new Set([Math.max(1, page - 1), page, ...(hasNext ? [page + 1] : [])])
  );

  if (isLoading) {
    return (
      <section className="py-4 min-h-screen bg-white relative">
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
                <Skeleton className="h-4 w-[28rem]" />
                <div className="md:hidden mt-2">
                  <Skeleton className="h-9 w-28" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-80 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 min-h-screen bg-white relative">
      <div className="container flex flex-col gap-6">
        {/* Error State */}

        {/* Sponsors Grid */}

        <div className="flex gap-4 w-full">
          <div className="hidden md:block">
            <DesktopFilterbar />
          </div>

          <Separator className="hidden md:block" orientation="vertical" />

          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-3xl font-bold">Discover Sponsors</h1>
              <p className="text-sm">
                Explore brands and companies looking for collaboration
                opportunities
              </p>
              <div className="md:hidden mb-4">
                <Filterbar />
              </div>
            </div>
            <div className="flex-1 w-full">
              {error && (
                <div
                  className="w-full h-96 rounded-md flex items-center justify-center bg-red-50 border-red-600"
                >
                  <ErrorOutlineIcon
                    sx={{ fontSize: "3rem", color: "primary.main", mb: 1 }}
                  />
                  <Typography level="body-md" sx={{ color: "dark.main" }}>
                    Failed to load sponsors. Please try again later.
                  </Typography>
                </div>
              )}
              {data && data.length > 0 ? (
                <>
                  <div className="flex gap-2 min-h-screen">
                    {data.map((sponsor) => (
                      <SponsorCard key={sponsor?.id} sponsor={sponsor} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {data.length > 0 && (
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href={buildPageHref(page - 1)}
                            className={!hasPrevious ? "pointer-events-none opacity-50" : ""}
                            onClick={(event) => onPaginationClick(event, page - 1)}
                          />
                        </PaginationItem>

                        {page > 2 && (
                          <>
                            <PaginationItem>
                              <PaginationLink
                                href={buildPageHref(1)}
                                onClick={(event) => onPaginationClick(event, 1)}
                              >
                                1
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          </>
                        )}

                        {visiblePages.map((pageNumber) => (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink
                              href={buildPageHref(pageNumber)}
                              isActive={pageNumber === page}
                              onClick={(event) =>
                                onPaginationClick(event, pageNumber)
                              }
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        {hasNext && (
                          <PaginationItem>
                            <PaginationNext
                              href={buildPageHref(page + 1)}
                              onClick={(event) => onPaginationClick(event, page + 1)}
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              ) : (
                !isLoading &&
                !error && (
                  <Box sx={{ textAlign: "center", p: 4 }}>
                    <Typography level="body-md" sx={{ color: "white.light" }}>
                      No sponsors found
                    </Typography>
                  </Box>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllSponsors;
