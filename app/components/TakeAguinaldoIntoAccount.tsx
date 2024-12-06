"use client";

import { useSearchParams } from "next/navigation";
import { useResult } from "./ResultContext";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

const PARAM = "aguinaldo";

export const TakeAguinaldoIntoAccount = () => {
  const { takeAguinaldoIntoAccount, isContractor } = useResult();
  const searchParams = useSearchParams();

  if (isContractor) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Switch
        id={PARAM}
        checked={takeAguinaldoIntoAccount}
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
      <Label htmlFor={PARAM}>Tener en cuenta aguinaldo</Label>
    </div>
  );
};
