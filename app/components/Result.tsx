"use client";

import { useResult } from "./ResultContext";
import { SaveResultForComparation } from "./SaveResultForComparation";

const Result = () => {
  const {
    netResult,
    grossResult,
    isWTFSalary,
    grossResultStr,
    netResultStr,
    isContractor,
  } = useResult();

  return (
    <div className="text-center flex flex-col items-center gap-1">
      <p className="text-sm">Al día de hoy cobrarías:</p>
      <p className="text-3xl sm:text-5xl font-bold text-center inline-flex gap-4 items-center">
        {netResultStr} <SaveResultForComparation />
      </p>
      {!isWTFSalary && (
        <p className="text-sm text-center text-muted-foreground">
          {isContractor
            ? `${grossResultStr} (bruto)`
            : "No olvides que tenés que descontar prepaga, monotributo, etc etc"}
        </p>
      )}
    </div>
  );
};

export default Result;
