import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const InfoDolarDeel = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="size-3 cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent>
          <p>¿A cuánto vendés tu dólares de Deel?</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
