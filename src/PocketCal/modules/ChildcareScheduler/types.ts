/** E.g.: Midnight = 0, noon = 60 * 12 = 720 */
type MinutesFromMidnight = number;

export type Caretaker = { name: string; color?: string };

export type Timespan = {
  caretaker: Caretaker;
  startMinutes: MinutesFromMidnight;
  endMinutes: MinutesFromMidnight;
};

type Dayspan = Timespan[];

/** E.g. 20250812 for August 12th, 2025 */
export type DateKey = `${number}`;

export type Day = {
  dateKey: DateKey;
  childToDayspan: Record<string, Dayspan>;
  notes?: string;
};

export type Week = [Day, Day, Day, Day, Day];

// type ChildcareConfig = {
//   startTimeMinutes: MinutesFromMidnight;
//   endTimeMinutes: MinutesFromMidnight;
// };
