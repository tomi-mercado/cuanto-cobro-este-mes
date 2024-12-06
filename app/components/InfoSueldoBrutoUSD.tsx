import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const InfoSueldoBrutoUSD = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="size-3 cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Los dólares que se cobran pesificados en el banco. La parte{" "}
            {`"en blanco"`}.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
