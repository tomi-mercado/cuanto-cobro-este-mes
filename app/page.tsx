import { getDolarMep } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import DolarMepInput from "./components/DolarMepInput";
import Example from "./components/Example";
import Result from "./components/Result";
import SalaryInput from "./components/SalaryInput";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { mepPrice, lastUpdate } = await getDolarMep();

  if (!searchParams["dolar-mep"]) {
    const searchParams = new URLSearchParams();
    searchParams.set("dolar-mep", mepPrice.toString());
    redirect(`/?${searchParams.toString()}`);
  }

  return (
    <main className="h-full w-full container p-6 flex items-center flex-col gap-6">
      <Card className="w-full max-w-2xl h-fit pb-4">
        <div className="pt-3 pr-3 justify-end flex">
          <Example mepPrice={mepPrice} />
        </div>
        <CardHeader className="pb-4 pt-2">
          <CardTitle className="sm:text-lg">Sueldo en pesos este mes</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <div>
            <Label htmlFor="dolar-mep">Valor del Dólar MEP</Label>
            <DolarMepInput defaultValue={mepPrice} lastUpdate={lastUpdate} />
          </div>
          <div>
            <Label htmlFor="salary">Sueldo bruto en USD</Label>
            <SalaryInput />
          </div>
          <div className="text-center">
            <p className="text-sm">Al día de hoy cobrarías:</p>
            <Result />
          </div>
        </CardContent>
      </Card>

      {/* <div className="flex flex-col gap-4">
        <p>🕦 Faltan 3 días para cobrar</p>
      </div> */}
    </main>
  );
}
