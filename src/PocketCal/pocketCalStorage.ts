const PREFIX = "pocketcal:";

type KeyToType = {
  miniWeekdayCalendar1Title: string;
  miniWeekdayCalendar2Title: string;
  monthlyLogEntries: Record<string, string>; // Key = YYYYMMDD
  miniWeekDayCalendar_1: Record<string, string>; // Key = YYYYMMDD
  miniWeekDayCalendar_2: Record<string, string>; // Key = YYYYMMDD
};

const ALL_KEYS_RECORD: Record<keyof KeyToType, boolean> = {
  miniWeekdayCalendar1Title: true,
  miniWeekdayCalendar2Title: true,
  monthlyLogEntries: true,
  miniWeekDayCalendar_1: true,
  miniWeekDayCalendar_2: true,
};

const ALL_KEYS = Object.keys(ALL_KEYS_RECORD) as (keyof KeyToType)[];

const get = <K extends keyof KeyToType>(key: K): KeyToType[K] | null => {
  const raw = localStorage.getItem(`${PREFIX}${key}`);
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as KeyToType[K];
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Error parsing storage value for key "${key}":`, e);
    return null;
  }
};

const set = <K extends keyof KeyToType>(key: K, value: KeyToType[K]) => {
  try {
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Error setting storage value for key "${key}":`, e);
  }
};

const clear = (key: keyof KeyToType) => {
  localStorage.removeItem(`${PREFIX}${key}`);
};

const clearAll = () => {
  for (const key of ALL_KEYS) {
    clear(key);
  }
};

const getMonthlyLogEntry = (dateKey: string) => {
  const dict = get("monthlyLogEntries");
  return dict?.[dateKey] ?? null;
};

const setMonthlyLogEntry = (dateKey: string, entry: string) => {
  const dict = get("monthlyLogEntries") ?? {};
  dict[dateKey] = entry;
  set("monthlyLogEntries", dict);
};

const getMiniEntry = (instanceId: 1 | 2, dateKey: string) => {
  const dict = get(
    instanceId === 1 ? "miniWeekDayCalendar_1" : "miniWeekDayCalendar_2"
  );
  return dict?.[dateKey] ?? null;
};

const setMiniEntry = (instanceId: 1 | 2, dateKey: string, entry: string) => {
  const dict =
    get(instanceId === 1 ? "miniWeekDayCalendar_1" : "miniWeekDayCalendar_2") ??
    {};
  dict[dateKey] = entry;
  set(
    instanceId === 1 ? "miniWeekDayCalendar_1" : "miniWeekDayCalendar_2",
    dict
  );
};

export default {
  get,
  set,
  clear,
  clearAll,
  getMonthlyLogEntry,
  setMonthlyLogEntry,
  getMiniEntry,
  setMiniEntry,
};
