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

export const PUBLIC_HOLIDAYS_ARG = [
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

  /**
   * 2025
   */
  // Año nuevo
  new Date(2025, 0, 1),
  // Carnaval
  new Date(2025, 2, 3),
  new Date(2025, 2, 4),
  // Día de la Memoria
  new Date(2025, 2, 24),
  // Malvinas
  new Date(2025, 3, 2),
  // Semana Santa
  new Date(2025, 3, 17),
  new Date(2025, 3, 18),
  // Ex dia de la raza
  new Date(2025, 3, 24),
  // Día del Trabajador
  new Date(2025, 4, 1),
  // Feriado puente
  new Date(2025, 4, 2),
  // Guemes
  new Date(2025, 5, 16),
  // Belgrano
  new Date(2025, 5, 20),
  // Dia de la Independencia
  new Date(2025, 6, 9),
  // San Martin
  new Date(2025, 7, 15),
  // Feriado puente
  new Date(2025, 10, 21),
  // Soberania
  new Date(2025, 10, 24),
  // Inmaculada
  new Date(2025, 11, 8),
  // Navidad
  new Date(2025, 11, 25),
];
