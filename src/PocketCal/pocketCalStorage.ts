const PREFIX = "pocketcal:";

type KeyToType = {
  monthlyLogEntries: Record<string, string>; // Key = YYYYMMDD
};

const ALL_KEYS_RECORD: Record<keyof KeyToType, boolean> = {
  monthlyLogEntries: true,
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

const getDayKey = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`; // e.g. 20250817
};

const getMonthlyLogEntry = (date: Date) => {
  const dict = get("monthlyLogEntries");
  return dict?.[getDayKey(date)] ?? null;
};

const setMonthlyLogEntry = (date: Date, entry: string) => {
  const dict = get("monthlyLogEntries") ?? {};
  dict[getDayKey(date)] = entry;
  set("monthlyLogEntries", dict);
};

export default {
  get,
  set,
  clear,
  clearAll,
  getDayKey,
  getMonthlyLogEntry,
  setMonthlyLogEntry,
};
