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

export const PUBLIC_HOLIDAYS_ARG_2024 = [
  // Año nuevo
  new Date(2024, 0, 1),
  // Carnaval
  new Date(2024, 1, 12),
  new Date(2024, 1, 13),
  // Día de la Memoria
  new Date(2024, 2, 24),
  // Semana Santa
  new Date(2024, 2, 28),
  new Date(2024, 2, 29),
  // Día del Veterano y de los Caídos en la Guerra de Malvinas (Turistico)
  new Date(2024, 3, 1),
  // Día del Veterano y de los Caídos en la Guerra de Malvinas
  new Date(2024, 3, 2),
  // Día del Trabajador
  new Date(2024, 4, 1),
  // Día de la Revolución de Mayo
  new Date(2024, 4, 25),
  // Paso a la Inmortalidad del Gral. Don Martín Miguel de Güemes
  new Date(2024, 5, 17),
  // Paso a la Inmortalidad del Gral. Don Manuel Belgrano
  new Date(2024, 5, 20),
  // Paso a la Inmortalidad del Gral. Don Manuel Belgrano (Turistico)
  new Date(2024, 5, 21),
  // Día de la Independencia
  new Date(2024, 6, 9),
  // Paso a la Inmortalidad del Gral. Don José de San Martín
  new Date(2024, 7, 17),
  // Día del Respeto a la Diversidad Cultural (Turistico)
  new Date(2024, 9, 11),
  // Día del Respeto a la Diversidad Cultural
  new Date(2024, 9, 12),
  // Día de la Soberanía Nacional
  new Date(2024, 10, 18),
  // Día de la Inmaculada Concepción de María
  new Date(2024, 11, 8),
  // Navidad
  new Date(2024, 11, 25),
];
