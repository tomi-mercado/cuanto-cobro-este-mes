"use client";

import { arsParser, numberSchema } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";

const NOT_WTF_MAX_SALARY = 9999;

const Result: React.FC = () => {
  const searchParams = useSearchParams();
  const salaryParam = searchParams.get("salary");
  const mepPriceParam = searchParams.get("dolar-mep");

  const salaryParseResult = numberSchema.safeParse(salaryParam);
  const salary = salaryParseResult.success ? salaryParseResult.data : 0;
  const isWTFSalary = salary > NOT_WTF_MAX_SALARY;

  const mepPriceParseResult = numberSchema.safeParse(mepPriceParam);
  const mepPrice = mepPriceParseResult.success ? mepPriceParseResult.data : 0;

  const grossResult = mepPrice * salary;
  const grossResultStr = arsParser(grossResult);

  const netResult = mepPrice * salary * 0.83;
  const netResultStr = isWTFSalary ? "🤌🤌🤌" : arsParser(netResult);

  return (
    <>
      <p className="text-3xl sm:text-5xl font-bold text-center">
        {netResultStr}
      </p>
      {!isWTFSalary && (
        <p className="text-sm text-center text-muted-foreground">
          {grossResultStr} (bruto)
        </p>
      )}
    </>
  );
};

export default Result;
