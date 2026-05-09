import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterOptions } from "./FilterOptions";
import { SlidersHorizontal } from "lucide-react";
export const Filterbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="w-full" variant="outline">
          {" "}
          <SlidersHorizontal />
          Filters
        </Button>
      </SheetTrigger>

      {/* Sheet Content - Mobile Only */}
      <SheetContent
        side="left"
        className="bg-primary-dark-soft w-full overflow-auto p-4 no-scrollbar"
      >
        <SheetHeader>
          <SheetTitle>Filter Sponsors</SheetTitle>
          <SheetDescription>
            Narrow down your search for the perfect sponsor
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <FilterOptions />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Filterbar;
