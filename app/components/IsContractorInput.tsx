"use client";

import { useSearchParams } from "next/navigation";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

const PARAM = "contractor";

export const IsContractorInput = () => {
  const searchParams = useSearchParams();
  const isContractor = searchParams.get(PARAM) === "true";

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor={PARAM}>Trabajo en relación de dependencia</Label>
      <Switch
        id={PARAM}
        checked={isContractor}
        onCheckedChange={(checked) => {
          const params = new URLSearchParams(searchParams.toString());
          if (checked) {
            params.set(PARAM, "true");
          } else {
            params.delete(PARAM);
          }

          window.history.replaceState(null, "", `?${params.toString()}`);
        }}
      />
      <Label htmlFor={PARAM}>Trabajo como contractor</Label>
    </div>
  );
};
