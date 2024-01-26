import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const arsParser = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
}).format;
