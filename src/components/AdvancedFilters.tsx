
import React, { useState } from "react";
import { FilterOptions } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AdvancedFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClose: () => void;
}

const AdvancedFilters = ({ filters, onFilterChange, onClose }: AdvancedFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>({ ...filters });

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const handleResetFilters = () => {
    const resetFilters: FilterOptions = {
      jobChanged: false,
      hasUpdate: false,
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <Card className="p-4 mb-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Advanced Filters</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="jobChanged" className="text-sm font-medium">
            Show job changes
          </label>
          <Switch
            id="jobChanged"
            checked={localFilters.jobChanged || false}
            onCheckedChange={(checked) => handleFilterChange("jobChanged", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="hasUpdate" className="text-sm font-medium">
            Show with updates
          </label>
          <Switch
            id="hasUpdate"
            checked={localFilters.hasUpdate || false}
            onCheckedChange={(checked) => handleFilterChange("hasUpdate", checked)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={handleResetFilters}>
            Reset
          </Button>
          <Button size="sm" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AdvancedFilters;
