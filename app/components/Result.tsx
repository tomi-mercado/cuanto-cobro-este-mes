"use client";

import { arsParser, cn, numberSchema } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "@radix-ui/react-icons";
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

  const mepDifference = {
    isEqual: realMepPrice === mepPrice,
    isHigher: realMepPrice < mepPrice,
    percentage: Math.abs(
      ((realMepPrice - mepPrice) / realMepPrice) * 100
    ).toFixed(2),
  };

  const differenceIcon = mepDifference.isEqual ? (
    <MinusIcon className="size-4" />
  ) : mepDifference.isHigher ? (
    <ArrowUpIcon className="size-4" />
  ) : (
    <ArrowDownIcon className="size-4" />
  );

  const differenceText = mepDifference.isEqual
    ? "Igual al valor real"
    : `${mepDifference.percentage}% ${
        mepDifference.isHigher ? "más" : "menos"
      } que el valor real del MEP`;

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
      <div
        className={cn(
          "flex items-center justify-center gap-2 rounded-full py-1 px-3 text-sm font-medium",
          {
            "bg-green-500/20 text-green-600": mepDifference.isHigher,
            "bg-red-500/20 text-red-600":
              !mepDifference.isHigher && !mepDifference.isEqual,
            "bg-blue-500/20 text-blue-600": mepDifference.isEqual,
          }
        )}
      >
        {differenceIcon}
        <span>{differenceText}</span>
      </div>
    </>
  );
};

export default Result;
