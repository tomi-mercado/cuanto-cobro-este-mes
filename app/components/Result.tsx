"use client";

import { arsParser } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import { z } from "zod";

const Result: React.FC = () => {
  const searchParams = useSearchParams();
  const salaryParam = searchParams.get("salary");
  const mepPriceParam = searchParams.get("dolar-mep");

  const salaryParseResult = z
    .number({
      coerce: true,
    })
    .min(0)
    .safeParse(salaryParam);
  const salary = salaryParseResult.success ? salaryParseResult.data : 0;
  const isWTFSalary = salary > 9999;

  const mepPriceParseResult = z
    .number({
      coerce: true,
    })
    .min(0)
    .safeParse(mepPriceParam);
  const mepPrice = mepPriceParseResult.success ? mepPriceParseResult.data : 0;

  const result = mepPrice * salary * 0.83;
  const resultStr = isWTFSalary ? "🤌🤌🤌" : arsParser(result);

  return (
    <p className="text-3xl sm:text-5xl font-bold text-center">{resultStr}</p>
  );
};

export default Result;
