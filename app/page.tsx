import { getDolarMep } from "@/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { capitalize, numberSchema } from "@/lib/utils";
import { redirect } from "next/navigation";
import { z } from "zod";
import DolarDeelInput from "./components/DolarDeelInput";
import DolarMepInput from "./components/DolarMepInput";
import ImportantDays from "./components/ImportantDays";
import { InfoDolarDeel } from "./components/InfoDolarDeel";
import { InfoSueldoBrutoUSD } from "./components/InfoSueldoBrutoUSD";
import Result from "./components/Result";
import SalaryInput from "./components/SalaryInput";

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
      <Card className="w-full max-w-2xl h-fit pb-4">
        <CardHeader className="pb-4 pt-2">
          <CardTitle className="sm:text-lg">
            Sueldo en pesos de {currentMonthStr}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="dolar-mep">Valor del Dólar MEP</Label>
              <DolarMepInput defaultValue={mepPrice} lastUpdate={lastUpdate} />
            </div>

            <div>
              <Label
                htmlFor="dolar-deel"
                className="inline-flex gap-1 items-center"
              >
                Dólar Deel <InfoDolarDeel />
              </Label>
              <DolarDeelInput param="dolar-deel" />
            </div>

            <div>
              <Label
                htmlFor="salary"
                className="inline-flex gap-1 items-center"
              >
                Sueldo bruto en USD
                <InfoSueldoBrutoUSD />
              </Label>
              <SalaryInput param="salary" />
            </div>

            <div>
              <Label htmlFor="salary">Sueldo de Deel</Label>
              <SalaryInput param="salary-deel" />
            </div>
          </div>

          <div className="text-center flex flex-col items-center gap-1">
            <p className="text-sm">Al día de hoy cobrarías:</p>
            <Result realMepPrice={mepPrice} />
          </div>
        </CardContent>
      </Card>

      <ImportantDays />
    </>
  );
}
