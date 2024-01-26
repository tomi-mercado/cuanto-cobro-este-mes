"use client";

import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import React from "react";

const SalaryInput: React.FC = () => {
  const searchParams = useSearchParams();
  const value = searchParams.get("salary") ?? "";

  const removeSalaryParam = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("salary");

    window.history.pushState({}, "", `?${newParams.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      removeSalaryParam();
    }

    const dotsInValue = value.match(/\./g)?.length ?? 0;

    if (dotsInValue > 1) {
      return;
    }

    const numberValue = Number(value);

    if (isNaN(numberValue)) {
      return;
    }

    const newParams = new URLSearchParams(searchParams);
    newParams.set("salary", value);

    window.history.pushState({}, "", `?${newParams.toString()}`);
  };

  return (
    <div className="relative">
      <span className="bg-gray-400 p-2 absolute left-0 top-0 rounded-l font-bold">
        USD
      </span>
      <Input
        id="salary"
        onChange={handleChange}
        value={value}
        className="pl-14 h-[40px]"
      />
    </div>
  );
};

export default SalaryInput;
