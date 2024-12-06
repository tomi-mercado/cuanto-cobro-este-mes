"use client";

import { arsParser, cn } from "@/lib/utils";
import { ArrowRight, X } from "lucide-react";
import { useResult } from "./ResultContext";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export const CompareSalaries = () => {
  const { netResult, salaryToCompare, updateSalaryToCompare } = useResult();

  if (!salaryToCompare) {
    return null;
  }

  const isBetter = netResult > salaryToCompare;
  const isLess = netResult < salaryToCompare;
  const isTheSame = netResult === salaryToCompare;

  const percentage = ((netResult - salaryToCompare) / salaryToCompare) * 100;

  return (
    <div className="relative">
      <Button
        size="icon"
        onClick={() => updateSalaryToCompare(null)}
        className="absolute -top-2 -right-2 rounded-full size-6"
      >
        <X className="size-4" />
      </Button>
      <div
        className={cn("p-4 rounded-lg w-fit flex flex-col gap-6", {
          "bg-green-500/20 text-green-600": isBetter,
          "bg-red-500/20 text-red-600": isLess,
          "bg-blue-500/20 text-blue-600": isTheSame,
        })}
      >
        <div className="flex gap-6 items-center justify-center">
          <div>
            <Label>Comparando con:</Label>
            <p className="font-semibold text-lg">
              {arsParser(salaryToCompare)}
            </p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <ArrowRight className="size-4" />
            <p className="tabular-nums text-sm font-medium">
              {percentage === 0 ? "⚖️" : percentage > 0 ? "🚀" : "📉"}{" "}
              {percentage.toFixed(2)}%
            </p>
          </div>
          <div>
            <Label>Resultado:</Label>
            <p className="font-semibold text-lg">{arsParser(netResult)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
