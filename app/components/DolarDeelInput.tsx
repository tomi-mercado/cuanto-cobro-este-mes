"use client";

import { Input } from "@/app/components/ui/input";
import { numberHandler } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import { InfoDolarDeel } from "./InfoDolarDeel";
import { Label } from "./ui/label";

const PARAM = "dolar-deel";

const DolarDeelInput = () => {
  const searchParams = useSearchParams();
  const value = searchParams.get(PARAM) ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    numberHandler(e, searchParams, PARAM);
  };

  return (
    <div>
      <Label htmlFor="dolar-deel" className="inline-flex gap-1 items-center">
        Dólar Deel <InfoDolarDeel />
      </Label>
      <Input
        id={PARAM}
        onChange={handleChange}
        value={value}
        className="pl-14 h-[40px]"
        placeholder="1050"
        leftDecorator="ARS"
      />
    </div>
  );
};

export default DolarDeelInput;
