import { z } from "zod";

const ONE_HOUR_IN_SECONDS = 60 * 60;

const API_URL = "https://dolarapi.com/v1/dolares/bolsa";

export const getDolarMep = async () => {
  const response = await fetch(API_URL, {
    next: {
      revalidate: ONE_HOUR_IN_SECONDS,
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return z
    .object({
      venta: z.number(),
      fechaActualizacion: z.string(),
    })
    .transform((data) => ({
      mepPrice: data.venta,
      lastUpdate: data.fechaActualizacion,
    }))
    .parse(await response.json());
};
