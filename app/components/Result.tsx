"use client";

import { arsParser } from "@/lib/utils";
import { useResult } from "./ResultContext";
import { SaveResultForComparation } from "./SaveResultForComparation";

const Result = () => {
  const { netResult, grossResult } = useResult();

  const netResultStr = arsParser(netResult);
  const grossResultStr = arsParser(grossResult);

  return (
    <div className="text-center flex flex-col items-center gap-1">
      <p className="text-sm">Al día de hoy cobrarías:</p>
      <p className="text-3xl sm:text-5xl font-bold text-center inline-flex gap-4 items-center">
        {netResultStr} <SaveResultForComparation />
      </p>

      <p className="text-sm text-center text-muted-foreground">
        ${grossResultStr} (bruto)
      </p>
    </div>
  );
};

export default Result;
