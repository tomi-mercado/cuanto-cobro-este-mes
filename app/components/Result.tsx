"use client";

import { arsParser, numberSchema } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const NOT_WTF_MAX_SALARY = 9999;

const Result = ({ realMepPrice }: { realMepPrice: number }) => {
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
    <>
      <p className="text-3xl sm:text-5xl font-bold text-center">
        {netResultStr}
      </p>
      {!isWTFSalary && (
        <p className="text-sm text-center text-muted-foreground">
          {grossResult !== netResult || netResult === 0
            ? `${grossResultStr} (bruto)`
            : "No olvides que tenés que descontar prepaga, monotributo, etc etc"}
        </p>
      )}
    </>
  );
};

export default Result;
