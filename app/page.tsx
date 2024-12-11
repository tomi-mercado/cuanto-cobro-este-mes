import { getDolarMep } from "@/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { capitalize, numberSchema } from "@/lib/utils";
import { redirect } from "next/navigation";
import { z } from "zod";
import { CompareSalaries } from "./components/CompareSalaries";
import { ContractorCostsInput } from "./components/ContractorCostsInput";
import DolarDeelInput from "./components/DolarDeelInput";
import DolarMepInput from "./components/DolarMepInput";
import ImportantDays from "./components/ImportantDays";
import { IsContractorInput } from "./components/IsContractorInput";
import Result from "./components/Result";
import { ResultProvider } from "./components/ResultContext";
import {
  DeelSalaryInput,
  DependencySalaryInput,
} from "./components/SalaryInput";
import { TakeAguinaldoIntoAccount } from "./components/TakeAguinaldoIntoAccount";

const searchParamsSchema = z.object({
  salary: numberSchema.optional().nullable(),
  "dolar-mep": numberSchema,
});

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { mepPrice, lastUpdate } = await getDolarMep();

  const parseResult = searchParamsSchema.safeParse(searchParams);

  if (!parseResult.success) {
    const newParams = new URLSearchParams();
    newParams.set("dolar-mep", mepPrice.toString());
    redirect(`/?${newParams.toString()}`);
  }

  const currentMonthStr = capitalize(
    new Date().toLocaleString("es-AR", {
      month: "long",
    })
  );

  return (
    <>
      <Card className="w-full max-w-3xl h-fit py-4">
        <CardHeader className="pb-8 pt-2">
          <CardTitle className="sm:text-lg">
            Sueldo en pesos de {currentMonthStr}
          </CardTitle>
        </CardHeader>

        <ResultProvider>
          <CardContent className="flex flex-col gap-6">
            <div className="w-full justify-center flex">
              <IsContractorInput />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DolarMepInput defaultValue={mepPrice} lastUpdate={lastUpdate} />
              <DolarDeelInput />
              <DependencySalaryInput />
              <DeelSalaryInput />
            </div>

            <ContractorCostsInput />
            <TakeAguinaldoIntoAccount />
            <Result />
            <div className="mx-auto">
              <CompareSalaries />
            </div>
          </CardContent>
        </ResultProvider>
      </Card>

      <ImportantDays />
    </>
  );
}
