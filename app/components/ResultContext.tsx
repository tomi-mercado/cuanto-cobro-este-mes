"use client";

import { numberSchema } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { z } from "zod";
import { COMPARATION_LOCAL_STORAGE_KEY } from "./SaveResultForComparation";

const ResultContext = createContext<{
  netResult: number;
  grossResult: number;
  salary: number;
  mepPrice: number;
  dolarDeel: number;
  salaryDeel: number;
  isContractor: boolean;
  salaryToCompare: number | null;
  contractorNetResult: number;
  takeAguinaldoIntoAccount: boolean;
  updateSalaryToCompare: (salary: number | null) => void;
} | null>(null);

export const ResultProvider = ({ children }: { children: React.ReactNode }) => {
  const [salaryToCompare, setSalaryToCompare] = useState<number | null>(null);

  useEffect(() => {
    const salary = localStorage.getItem(COMPARATION_LOCAL_STORAGE_KEY);
    if (salary) {
      setSalaryToCompare(Number(salary));
    }
  }, []);

  const updateSalaryToCompare = (salary: number | null) => {
    setSalaryToCompare(salary);

    if (!salary) {
      localStorage.removeItem(COMPARATION_LOCAL_STORAGE_KEY);
      return;
    }

    localStorage.setItem(COMPARATION_LOCAL_STORAGE_KEY, salary.toString());
  };

  const searchParams = useSearchParams();
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

  const netResult =
    mepPrice * salary * 0.83 +
    dolarDeel * salaryDeel +
    (!takeAguinaldoIntoAccount ? 0 : (mepPrice * salary) / 12);

  const isContractor = !!dolarDeel && !!salaryDeel && !salary;

  const contractorNetResult = grossResult - contractorCosts;

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
        contractorNetResult,
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
