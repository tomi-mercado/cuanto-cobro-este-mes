import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";

const HelpCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

const Example: React.FC<{
  mepPrice: number;
}> = ({ mepPrice }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <HelpCircleIcon />
      </PopoverTrigger>
      <PopoverContent className="p-2 flex flex-col gap-2">
        <p>Ejemplo práctico</p>
        <ul className="list-disc pl-4 text-sm">
          <li>
            Sueldo bruto total: <strong>1000 USD</strong>
          </li>
          <li>
            Dólar MEP: <strong>{mepPrice} ARS</strong>
          </li>
          <li>
            Sueldo en Deel: <strong>600 USD</strong>
          </li>
          <li>
            Sueldo en bruto a cobrar en ARS: 1000 USD - 600 USD ={" "}
            <strong>400 USD</strong>
          </li>
          <li>
            Sueldo bruto en ARS: 400 USD * {mepPrice} ARS ={" "}
            <strong>{400 * mepPrice} ARS</strong>
          </li>
          <li>
            Sueldo neto en ARS: 400 * {mepPrice} ARS * 0.83 ={" "}
            <strong>{400 * mepPrice * 0.83} ARS</strong>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default Example;
