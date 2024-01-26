import { getDolarMep } from "@/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { arsParser } from "@/lib/utils";
import Example from "./components/Example";
import Result from "./components/Result";
import SalaryInput from "./components/SalaryInput";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

export default async function Home() {
  const { mepPrice, lastUpdate } = await getDolarMep();

  return (
    <main className="h-full w-full container p-6 flex justify-center">
      <Card className="w-full max-w-2xl h-fit pb-4">
        <div className="pt-3 pr-3 justify-end flex">
          <Example mepPrice={mepPrice} />
        </div>
        <CardHeader className="pb-4 pt-2">
          <CardTitle className="sm:text-lg">Sueldo en pesos este mes</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Valor Dólar MEP: {arsParser(mepPrice)} (Última actualización:{" "}
            {formatDate(lastUpdate)})
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <div>
            <Label htmlFor="salary">Sueldo bruto en USD</Label>
            <SalaryInput />
          </div>
          <div className="text-center">
            <p className="text-sm">Al día de hoy cobrarías:</p>
            <Result mepPrice={mepPrice} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
