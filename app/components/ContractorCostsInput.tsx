"use client";

import { numberHandler } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useResult } from "./ResultContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const PARAM = "contractor-costs";

export const ContractorCostsInput = () => {
  const { isContractor } = useResult();
  const searchParams = useSearchParams();
  const value = searchParams.get(PARAM) ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    numberHandler(e, searchParams, PARAM);
  };

  if (!isContractor) {
    return null;
  }

  return (
    <div>
      <Label className="inline-flex gap-1 items-center" htmlFor={PARAM}>
        Costos por ser contractor
      </Label>
      <Input
        id={PARAM}
        onChange={handleChange}
        value={value}
        className="pl-14 h-[40px]"
        placeholder="Comisiones de apps, prepaga, monotributo, internet, etc"
        leftDecorator="ARS"
      />
    </div>
  );
};
