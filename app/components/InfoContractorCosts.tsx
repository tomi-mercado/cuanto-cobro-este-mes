import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const InfoContractorCosts = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="size-3 cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Comisiones de apps, prepaga, monotributo, internet, etc</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
