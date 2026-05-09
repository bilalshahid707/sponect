import { FilterOptions } from "./FilterOptions";

export const DesktopFilterbar = () => {
  return (
    <div className="sticky top-4 w-64">
      <div className="bg-white rounded-md border-2 border-white-lighter p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-dark mb-6">Filters</h2>
        <FilterOptions />
      </div>
    </div>
  );
};

export default DesktopFilterbar;
