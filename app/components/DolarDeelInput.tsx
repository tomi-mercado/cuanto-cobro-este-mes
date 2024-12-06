"use client";

import { Input } from "@/app/components/ui/input";
import { numberHandler } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";

const DolarDeelInput = ({ param }: { param: string }) => {
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
      placeholder="1050"
      leftDecorator="ARS"
    />
  );
};

export default DolarDeelInput;
