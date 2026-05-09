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
import { SlidersHorizontal } from "lucide-react";
import { PitchFilterOptions } from "./PitchFilterOptions";

export const PitchFilterbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-primary-dark-soft w-full overflow-auto p-4 no-scrollbar"
      >
        <SheetHeader>
          <SheetTitle>Filter Pitches</SheetTitle>
          <SheetDescription>
            Narrow down pitches by category, audience, and more
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <PitchFilterOptions />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PitchFilterbar;
