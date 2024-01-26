"use client";

import { arsParser } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import { z } from "zod";

const Result: React.FC<{
  mepPrice: number;
}> = ({ mepPrice }) => {
  const searchParams = useSearchParams();
  const salaryParam = searchParams.get("salary");

  const salaryParseResult = z
    .number({
      coerce: true,
    })
    .min(0)
    .safeParse(salaryParam);
  const salary = salaryParseResult.success ? salaryParseResult.data : 0;
  const isWTFSalary = salary > 9999;

  const result = mepPrice * salary * 0.83;
  const resultStr = isWTFSalary ? "🤌🤌🤌" : arsParser(result);

  return (
    <p className="text-3xl sm:text-5xl font-bold text-center">{resultStr}</p>
  );
};

export default Result;
