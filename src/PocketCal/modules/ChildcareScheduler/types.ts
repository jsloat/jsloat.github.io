/** E.g.: Midnight = 0, noon = 60 * 12 = 720 */
type MinutesFromMidnight = number;

export type Timespan = {
  caretaker: string;
  startMinutes: MinutesFromMidnight;
  endMinutes: MinutesFromMidnight;
};

type Dayspan = Timespan[];

export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";

export type Day = {
  weekday: Weekday;
  data: { JSS: Dayspan; CMS: Dayspan };
  notes?: string;
};

export type Week = [Day, Day, Day, Day, Day];

// type ChildcareConfig = {
//   startTimeMinutes: MinutesFromMidnight;
//   endTimeMinutes: MinutesFromMidnight;
// };
