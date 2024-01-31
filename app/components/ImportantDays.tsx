import { PUBLIC_HOLIDAYS_ARG_2024 } from "@/api";
import {
  addMonths,
  differenceInDays,
  lastDayOfMonth as getLastDayOfMonth,
  isSameDay,
  subBusinessDays,
  subDays,
} from "date-fns";
import React from "react";

const DIFFERENCE_PAYDAY_LAST_BUSINESS_DAY = 1;

const findLastBusinessDayOfMonth = (date: Date): Date => {
  const isBusinessDay = date.getDay() !== 0 && date.getDay() !== 6;
  const isPublicHoliday = PUBLIC_HOLIDAYS_ARG_2024.some((publicHoliday) =>
    isSameDay(publicHoliday, date)
  );

  if (isBusinessDay && !isPublicHoliday) {
    return date;
  }

  const newDate = subDays(date, 1);
  return findLastBusinessDayOfMonth(newDate);
};

const findPayDay = (lastBusinessDayOfMonth: Date): Date => {
  const date = subBusinessDays(
    lastBusinessDayOfMonth,
    DIFFERENCE_PAYDAY_LAST_BUSINESS_DAY
  );

  const isBusinessDay = date.getDay() !== 0 && date.getDay() !== 6;
  const isPublicHoliday = PUBLIC_HOLIDAYS_ARG_2024.some((publicHoliday) =>
    isSameDay(publicHoliday, date)
  );

  if (isBusinessDay && !isPublicHoliday) {
    return date;
  }

  return findPayDay(date);
};

const getPayDay = (date: Date) => {
  const lastDayOfMonth = getLastDayOfMonth(date);
  const lastBusinessDayOfMonth = findLastBusinessDayOfMonth(lastDayOfMonth);

  const payDay = findPayDay(lastBusinessDayOfMonth).setHours(0, 0, 0, 0);

  const daysUntilPayDay = differenceInDays(
    payDay,
    new Date().setHours(0, 0, 0, 0)
  );

  if (daysUntilPayDay < 0) {
    return findPayDay(addMonths(date, 1)).setHours(0, 0, 0, 0);
  }

  return payDay;
};

const ImportantDays: React.FC = () => {
  const payDay = getPayDay(new Date());
  const daysUntilPayDay = differenceInDays(
    payDay,
    new Date().setHours(0, 0, 0, 0)
  );

  return (
    <p className="text-lg">
      {daysUntilPayDay === 0
        ? `🍾 Hoy se cobra!`
        : daysUntilPayDay === 1
        ? `🥵 Mañana se cobra!`
        : `🕦 Faltan ${daysUntilPayDay} días para cobrar`}
    </p>
  );
};

export default ImportantDays;
