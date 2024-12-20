import { Scale } from "lucide-react";
import { useResult } from "./ResultContext";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const SaveResultForComparation = () => {
  const { netResult, updateSalaryToCompare } = useResult();

  const handleSave = () => {
    updateSalaryToCompare(netResult);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" onClick={handleSave}>
            <Scale />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Guardar para comparar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
