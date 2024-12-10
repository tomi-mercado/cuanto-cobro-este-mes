"use client";

import { Input } from "@/app/components/ui/input";
import { numberHandler } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useResult } from "./ResultContext";
import { Label } from "./ui/label";

const SalaryInput = ({
  param,
  placeholder,
}: {
  param: string;
  placeholder?: string;
}) => {
  const searchParams = useSearchParams();
  const value = searchParams.get(param) ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    numberHandler(e, searchParams, param);
  };

  return (
    <Input
      id={param}
      onChange={handleChange}
      value={value}
      className="pl-14 h-[40px]"
      leftDecorator="USD"
      placeholder={placeholder}
    />
  );
};

export const DependencySalaryInput = () => {
  const { isContractor } = useResult();

  if (isContractor) {
    return null;
  }

  return (
    <div>
      <Label htmlFor="salary" className="inline-flex gap-1 items-center">
        Sueldo bruto en USD
      </Label>
      <SalaryInput param="salary" placeholder={`USD pesificados "en blanco"`} />
    </div>
  );
};

export const DeelSalaryInput = () => (
  <div>
    <Label htmlFor="salary">Sueldo de Deel</Label>
    <SalaryInput param="salary-deel" />
  </div>
);
