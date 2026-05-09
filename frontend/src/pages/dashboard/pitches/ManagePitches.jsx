import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";

const API_URL = import.meta.env.VITE_APP_API_URL;

const STATUS_TABS = ["draft", "published"];

const statusBadgeClass = {
  draft: "bg-white-light text-text-secondary border-border",
  published: "bg-[#E6F4F1] text-dark border-[#045769]",
};

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const ManagePitches = () => {
  const [activeTab, setActiveTab] = useState("draft");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: pitches = [], isLoading } = useQuery({
    queryKey: ["my-pitches", activeTab],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/pitches/my-pitches`, {
        params: { status: activeTab },
        withCredentials: true,
      });
      return res.data?.data ?? [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (pitchId) =>
      axios.delete(`${API_URL}/pitches/${pitchId}`, { withCredentials: true }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-pitches"] }),
  });

  const publishMutation = useMutation({
    mutationFn: (pitchId) =>
      axios.patch(`${API_URL}/pitches/${pitchId}/publish`, {}, { withCredentials: true }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-pitches"] }),
  });

  return (
    <div className="h-screen w-full overflow-y-scroll">
      <div className="flex flex-col gap-lg p-lg w-full mt-10 md:mt-0">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-dark">Pitches</h1>
          <Button
            onClick={() => navigate("/create-pitch")}
            className="bg-primary hover:bg-primary-hover text-white font-semibold text-xs uppercase tracking-wide h-8 px-3 rounded-md"
          >
            <AddIcon className="size-4" />
            Create a New Pitch
          </Button>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-0 border-b border-border">
          {STATUS_TABS.map((tab) => {
            const count = activeTab === tab ? pitches.length : null;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors flex items-center gap-1.5
                  ${activeTab === tab
                    ? "text-dark border-b-2 border-dark -mb-px"
                    : "text-text-secondary hover:text-dark"
                  }`}
              >
                {tab}
                {activeTab === tab && count > 0 && (
                  <span className="inline-flex items-center justify-center size-5 rounded-full bg-primary text-white text-[10px] font-bold">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="border border-border rounded-md overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 px-4 py-2.5 bg-white-light border-b border-border text-xs font-semibold uppercase tracking-wide text-text-secondary">
            <div className="w-5" />
            <div>Pitch</div>
            <div className="hidden sm:block">Created</div>
            <div className="hidden sm:block">Last Updated</div>
            <div className="w-24 text-right">Actions</div>
          </div>

          {/* Rows */}
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 px-4 py-3 border-b border-border last:border-0 items-center">
                <Skeleton className="size-10 rounded" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-24 hidden sm:block" />
                <Skeleton className="h-4 w-24 hidden sm:block" />
                <Skeleton className="h-7 w-20 ml-auto" />
              </div>
            ))
          ) : pitches.length === 0 ? (
            <div className="py-16 text-center text-text-secondary text-sm">
              No {activeTab} pitches yet.
            </div>
          ) : (
            pitches.map((pitch) => {
              const cover = pitch.assets?.find((a) => a.type === "cover");
              return (
                <div
                  key={pitch.id}
                  className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 px-4 py-3 border-b border-border last:border-0 items-center hover:bg-white-hover transition-colors"
                >
                  {/* Cover thumbnail */}
                  <div className="size-10 rounded overflow-hidden bg-white-light flex-shrink-0">
                    {cover ? (
                      <img src={cover.secureUrl} alt="" className="size-full object-cover" />
                    ) : (
                      <div className="size-full bg-primary-dark-soft flex items-center justify-center text-dark text-xs font-bold">
                        {pitch.title?.[0]?.toUpperCase() ?? "P"}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-dark truncate">{pitch.title}</p>
                    <Badge className={`mt-0.5 text-[10px] border ${statusBadgeClass[pitch.status]}`}>
                      {pitch.status}
                    </Badge>
                  </div>

                  {/* Created */}
                  <div className="hidden sm:block text-sm text-text-secondary">
                    {formatDate(pitch.createdAt)}
                  </div>

                  {/* Updated */}
                  <div className="hidden sm:block text-sm text-text-secondary">
                    {formatDate(pitch.updatedAt)}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 justify-end">
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      title="Edit pitch"
                      onClick={() => navigate(`/create-pitch/${pitch.id}`)}
                      className="text-text-secondary hover:text-dark"
                    >
                      <EditOutlinedIcon className="size-4" />
                    </Button>

                    {pitch.status === "draft" && (
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        title="Publish pitch"
                        disabled={publishMutation.isPending}
                        onClick={() => publishMutation.mutate(pitch.id)}
                        className="text-dark-lighter hover:text-dark"
                      >
                        <PublishOutlinedIcon className="size-4" />
                      </Button>
                    )}

                    <Button
                      size="icon-sm"
                      variant="ghost"
                      title="Delete pitch"
                      disabled={deleteMutation.isPending}
                      onClick={() => deleteMutation.mutate(pitch.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <DeleteOutlineIcon className="size-4" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};

export default ManagePitches;
