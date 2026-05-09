import React from "react";

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-(--space-md)">
        <div className="w-12 h-12 rounded-full border-4 border-white-lighter border-t-primary animate-spin" />
        <p className="text-text-secondary text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
