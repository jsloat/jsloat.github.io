import { Day, Week, Weekday } from "./types";

/** Time is input in 24 hours time, may or may not have leading padding. */
export const timeToMinutesFromMidnight = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error(`Invalid time format: ${time}`);
  }
  return hours * 60 + minutes;
};

export const minutesToTimeLabel = (m: number): string => {
  const hh = Math.floor(m / 60);
  const mm = m % 60;
  return `${pad(hh)}:${pad(mm)}`;
};

const pad = (n: number) => String(n).padStart(2, "0");

const getEmptyDay = (weekday: Weekday): Day => ({
  data: { CMS: [], JSS: [] },
  weekday,
});

export const emptyWeek: Week = [
  getEmptyDay("Monday"),
  getEmptyDay("Tuesday"),
  getEmptyDay("Wednesday"),
  getEmptyDay("Thursday"),
  getEmptyDay("Friday"),
];
