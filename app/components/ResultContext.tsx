"use client";

import { numberSchema } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { createContext, useCallback, useContext } from "react";
import { z } from "zod";

const ResultContext = createContext<{
  netResult: number;
  grossResult: number;
  salary: number;
  mepPrice: number;
  dolarDeel: number;
  salaryDeel: number;
  isContractor: boolean;
  salaryToCompare: number | null;
  takeAguinaldoIntoAccount: boolean;
  updateSalaryToCompare: (salary: number | null) => void;
} | null>(null);

export const ResultProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();

  const salaryToCompareParam = searchParams.get("salary-to-compare");
  const salaryToCompareParseResult =
    numberSchema.safeParse(salaryToCompareParam);
  const salaryToCompare = salaryToCompareParseResult.success
    ? salaryToCompareParseResult.data
    : null;

  const updateSalaryToCompare = useCallback(
    (salary: number | null) => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (salary) {
        newSearchParams.set("salary-to-compare", salary.toString());
      } else {
        newSearchParams.delete("salary-to-compare");
      }

      window.history.replaceState({}, "", `?${newSearchParams.toString()}`);
    },
    [searchParams]
  );

  const salaryParam = searchParams.get("salary");
  const mepPriceParam = searchParams.get("dolar-mep");
  const dolarDeelParam = searchParams.get("dolar-deel");
  const salaryDeelParam = searchParams.get("salary-deel");
  const contractorCostsParam = searchParams.get("contractor-costs");
  const takeAguinaldoIntoAccountParam = searchParams.get("aguinaldo");

  const salaryParseResult = numberSchema.safeParse(salaryParam);
  const salary = salaryParseResult.success ? salaryParseResult.data : 0;

  const mepPriceParseResult = numberSchema.safeParse(mepPriceParam);
  const mepPrice = mepPriceParseResult.success ? mepPriceParseResult.data : 0;

  const dolarDeelParseResult = numberSchema.safeParse(dolarDeelParam);
  const dolarDeel = dolarDeelParseResult.success
    ? dolarDeelParseResult.data
    : 0;

  const salaryDeelParseResult = numberSchema.safeParse(salaryDeelParam);
  const salaryDeel = salaryDeelParseResult.success
    ? salaryDeelParseResult.data
    : 0;

  const contractorCostsParseResult =
    numberSchema.safeParse(contractorCostsParam);
  const contractorCosts = contractorCostsParseResult.success
    ? contractorCostsParseResult.data
    : 0;

  const takeAguinaldoIntoAccountParseResult = z
    .enum(["true", "false"])
    .safeParse(takeAguinaldoIntoAccountParam);

  const takeAguinaldoIntoAccount = takeAguinaldoIntoAccountParseResult.success
    ? takeAguinaldoIntoAccountParseResult.data === "true"
    : false;

  const grossResult = mepPrice * salary + dolarDeel * salaryDeel;

  const dependencyNetResult =
    mepPrice * salary * 0.83 +
    dolarDeel * salaryDeel +
    (!takeAguinaldoIntoAccount ? 0 : (mepPrice * salary * 0.83) / 12);

  const isContractor = !!dolarDeel && !!salaryDeel && !salary;

  const contractorNetResult = grossResult - contractorCosts;

  const netResult = isContractor ? contractorNetResult : dependencyNetResult;

  return (
    <ResultContext.Provider
      value={{
        netResult,
        grossResult,
        salary,
        mepPrice,
        dolarDeel,
        salaryDeel,
        salaryToCompare,
        isContractor,
        takeAguinaldoIntoAccount,
        updateSalaryToCompare,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResult = () => {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error("useResult must be used within a ResultProvider");
  }

  return context;
};
