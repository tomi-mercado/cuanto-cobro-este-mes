import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const arsParser = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
}).format;

const removeParam = (paramName: string, searchParams: URLSearchParams) => {
  const newParams = new URLSearchParams(searchParams);
  newParams.delete(paramName);

  window.history.replaceState({}, "", `?${newParams.toString()}`);
};

export const numberHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  searchParams: URLSearchParams,
  paramName: string
) => {
  const value = e.target.value.trim();

  if (value === "") {
    removeParam(paramName, searchParams);
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
  newParams.set(paramName, value);
  window.history.replaceState({}, "", `?${newParams.toString()}`);
};

export const numberSchema = z
  .number({
    coerce: true,
  })
  .min(0);
