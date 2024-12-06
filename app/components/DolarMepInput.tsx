"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { arsParser, numberHandler } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React, { useRef } from "react";

const PARAM = "dolar-mep";

const UpdateIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

const DolarMepInput: React.FC<{
  defaultValue: number;
  lastUpdate: string;
}> = ({ defaultValue, lastUpdate }) => {
  const searchParams = useSearchParams();
  const wasModified = useRef(false);
  const value =
    searchParams.get(PARAM) ??
    (!wasModified.current ? defaultValue.toString() : "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    numberHandler(e, searchParams, PARAM);
    if (!wasModified.current) {
      wasModified.current = true;
    }
  };

  const handleReset = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(PARAM, defaultValue.toString());
    window.history.replaceState({}, "", `?${newParams.toString()}`);
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="relative w-full">
        <Input
          id={PARAM}
          onChange={handleChange}
          value={value}
          className="pl-14 h-[40px]"
          placeholder="650"
          leftDecorator="ARS"
        />
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleReset} size="sm" className="px-2">
              <UpdateIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs sm:text-sm">
              Restaurar precio actual ({arsParser(defaultValue)}) (Última
              actualización: {formatDate(lastUpdate)})
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default DolarMepInput;
