"use client";

import { Input } from "@/components/ui/input";
import { numberHandler } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";

const PARAM = "salary";

const SalaryInput: React.FC = () => {
  const searchParams = useSearchParams();
  const value = searchParams.get(PARAM) ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    numberHandler(e, searchParams, PARAM);
  };

  return (
    <div className="relative">
      <span className="bg-gray-400 p-2 absolute left-0 top-0 rounded-l font-bold">
        USD
      </span>
      <Input
        id={PARAM}
        onChange={handleChange}
        value={value}
        className="pl-14 h-[40px]"
        placeholder="650"
        leftDecorator="USD"
      />
    </div>
  );
};

export default SalaryInput;
