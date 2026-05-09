import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AddPackageForm } from "./AddPackageModal";
import { PreviewButton } from "../components/PreviewButton";

const API_URL = import.meta.env.VITE_APP_API_URL;
const MAX_PACKAGES = 3;

const saveLabel = (status) => (status === "published" ? "Save" : "Save & Continue");

export const PitchTab3 = ({ pitch }) => {
  const queryClient = useQueryClient();
  const { pitchId } = useParams();
  const [, setSearchParams] = useSearchParams();
  const [showForm, setShowForm] = useState(false);
  const [serverError, setServerError] = useState(null);

  const packages = pitch?.packages || [];
  const canAdd = packages.length < MAX_PACKAGES;

  const deleteMutation = useMutation({
    mutationFn: async (packageId) => {
      const res = await axios.delete(
        `${API_URL}/pitches/${pitch?.id}/packages/${packageId}?tabNumber=3&tabName=packages`,
        { withCredentials: true },
      );
      return res.data;
    },
  });

  const handleDelete = (packageId) => {
    setServerError(null);
    deleteMutation.mutate(packageId, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pitch", pitchId] }),
      onError: (err) => setServerError(err.response?.data?.message || err.message),
    });
  };

  return (
    <section className="py-4 md:py-0">
      <div className="max-w-3xl mx-auto bg-white rounded-md border border-border drop-shadow-xs overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 bg-dark flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">Packages</h2>
            <p className="text-xs text-white/60 mt-0.5">
              Define sponsorship tiers — up to {MAX_PACKAGES} packages
            </p>
          </div>
          {pitch?.status === "published" ? (
            <PreviewButton pitchId={pitch.id} />
          ) : (
            canAdd && !showForm && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
              >
                <Plus size={13} />
                Add Package
              </button>
            )
          )}
        </div>
        <div className="h-0.5 bg-primary" />

        {serverError && (
          <div className="mx-6 mt-4 px-4 py-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
            {serverError}
          </div>
        )}

        <div className="p-6 flex flex-col gap-4">

          {/* Inline add form */}
          {showForm && (
            <AddPackageForm
              pitch={pitch}
              onSuccess={() => setShowForm(false)}
              onCancel={() => setShowForm(false)}
            />
          )}

          {/* Empty state */}
          {packages.length === 0 && !showForm && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-10 h-10 rounded-full bg-white-light flex items-center justify-center mb-3">
                <Plus size={18} className="text-text-secondary" />
              </div>
              <p className="text-sm font-medium text-text-primary">No packages yet</p>
              <p className="text-xs text-text-secondary mt-1">Click &quot;Add Package&quot; to create your first sponsorship tier.</p>
            </div>
          )}

          {/* Package cards */}
          {packages.length > 0 && (
            <div className="flex flex-col gap-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-md border border-border overflow-hidden"
                >
                  <div className="px-5 py-4 flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-text-primary capitalize">{pkg.title}</span>
                      <span className="text-xs text-text-secondary">{pkg.description}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-semibold text-text-primary whitespace-nowrap">
                        PKR {Number(pkg.price).toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDelete(pkg.id)}
                        disabled={deleteMutation.isPending}
                        className="text-text-secondary hover:text-red-500 transition-colors disabled:opacity-40"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                  {pkg.deliverables?.length > 0 && (
                    <div className="px-5 pb-4 flex flex-wrap gap-x-4 gap-y-1">
                      {pkg.deliverables.map((d) => (
                        <span key={d} className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <CheckCircle2 size={12} className="text-primary shrink-0" />
                          {d}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Slot indicators */}
          {packages.length > 0 && (
            <p className="text-xs text-text-secondary text-right">
              {packages.length} / {MAX_PACKAGES} packages added
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end bg-white-light/40 border-t border-border">
          <Button
            type="button"
            onClick={() => {
              if (pitch?.status !== "published") {
                setSearchParams({ tabNumber: 4, tabName: "media" });
              }
            }}
            className="bg-dark text-white hover:bg-dark-hover px-6 h-9 text-sm"
          >
            {saveLabel(pitch?.status)}
          </Button>
        </div>

      </div>
    </section>
  );
};

PitchTab3.propTypes = {
  pitch: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    packages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        description: PropTypes.string,
        deliverables: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
  }),
};

export default PitchTab3;
