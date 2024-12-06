"use client";

import { arsParser, numberSchema } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import {
  COMPARATION_LOCAL_STORAGE_KEY,
  SaveResultForComparation,
} from "./SaveResultForComparation";

const NOT_WTF_MAX_SALARY = 9999;

const ResultContext = createContext<{
  netResult: number;
  grossResult: number;
  isWTFSalary: boolean;
  salary: number;
  mepPrice: number;
  dolarDeel: number;
  salaryDeel: number;
  grossResultStr: string;
  netResultStr: string;
  salaryToCompare: number | null;
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

  const salaryParseResult = numberSchema.safeParse(salaryParam);
  const salary = salaryParseResult.success ? salaryParseResult.data : 0;
  const isWTFSalary = salary > NOT_WTF_MAX_SALARY;

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

  const grossResult = mepPrice * salary + dolarDeel * salaryDeel;
  const grossResultStr = arsParser(grossResult);

  const netResult = mepPrice * salary * 0.83 + dolarDeel * salaryDeel;
  const netResultStr = isWTFSalary ? "🤌🤌🤌" : arsParser(netResult);

  return (
    <ResultContext.Provider
      value={{
        netResult,
        grossResult,
        isWTFSalary,
        salary,
        mepPrice,
        dolarDeel,
        salaryDeel,
        grossResultStr,
        netResultStr,
        salaryToCompare,
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

const Result = () => {
  const { netResult, grossResult, isWTFSalary, grossResultStr, netResultStr } =
    useResult();

  return (
    <div className="text-center flex flex-col items-center gap-1">
      <p className="text-sm">Al día de hoy cobrarías:</p>
      <p className="text-3xl sm:text-5xl font-bold text-center inline-flex gap-4 items-center">
        {netResultStr} <SaveResultForComparation />
      </p>
      {!isWTFSalary && (
        <p className="text-sm text-center text-muted-foreground">
          {grossResult !== netResult || netResult === 0
            ? `${grossResultStr} (bruto)`
            : "No olvides que tenés que descontar prepaga, monotributo, etc etc"}
        </p>
      )}
    </div>
  );
};

export default Result;
