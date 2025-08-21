import { Caretaker, Timespan, Week } from "./types";
import { timeToMinutesFromMidnight } from "./utils";

const caretaker = (
  name: string,
  rest?: Omit<Caretaker, "name">
): Caretaker => ({ name, ...rest });

const c = {
  js: caretaker("JS", { color: "rgba(194, 191, 255, 1)" }),
  kg: caretaker("KG", { color: "rgba(255, 137, 227, 0.96)" }),
  am: caretaker("AM", { color: "rgba(255, 237, 211, 0.98)" }),
  jenna: caretaker("Jenna"),
  regina: caretaker("Regina"),
  lm: caretaker("LM"),
  bikeCamp: caretaker("Bike camp"),
  manu: caretaker("Manu"),
  qacc: caretaker("QACC"),
};

const t = (
  caretakerKey: keyof typeof c,
  startTime: string,
  endTime: string
): Timespan => ({
  caretaker: c[caretakerKey],
  startMinutes: timeToMinutesFromMidnight(startTime),
  endMinutes: timeToMinutesFromMidnight(endTime),
});

export const mockFilledWeek: Week = [
  {
    dateKey: "20250818",
    childToDayspan: {
      JSS: [
        t("js", "8:10", "8:30"),
        t("lm", "8:30", "16:30"),
        t("kg", "16:30", "17:00"),
      ],
      CMS: [
        t("js", "8:10", "9:00"),
        t("bikeCamp", "9:00", "12:00"),
        t("js", "12:00", "12:15"),
        t("manu", "12:15", "17:00"),
      ],
    },
    notes: "Hello world",
  },

  {
    dateKey: "20250819",
    childToDayspan: {
      JSS: [
        t("js", "8:10", "8:30"),
        t("lm", "8:30", "16:30"),
        t("am", "16:30", "17:00"),
      ],
      CMS: [
        t("js", "8:10", "9:00"),
        t("bikeCamp", "9:00", "12:00"),
        t("jenna", "12:00", "12:15"),
        t("manu", "12:15", "17:00"),
      ],
    },
  },

  {
    dateKey: "20250820",
    childToDayspan: {
      JSS: [
        t("js", "8:10", "8:30"),
        t("lm", "8:30", "16:30"),
        t("am", "16:30", "17:00"),
      ],
      CMS: [
        t("js", "8:10", "9:00"),
        t("bikeCamp", "9:00", "12:00"),
        t("js", "12:00", "12:15"),
        t("manu", "12:15", "17:00"),
      ],
      ["C&S"]: [
        t("regina", "8:10", "8:30"),
        t("kg", "8:30", "9:00"),
        t("qacc", "9:00", "17:00"),
      ],
    },
  },

  {
    dateKey: "20250821",
    childToDayspan: {
      JSS: [
        t("js", "8:10", "8:30"),
        t("lm", "8:30", "16:30"),
        t("am", "16:30", "17:00"),
      ],
      CMS: [
        t("js", "8:10", "9:00"),
        t("bikeCamp", "9:00", "12:00"),
        t("js", "12:00", "12:15"),
        t("kg", "12:15", "17:00"),
      ],
      ["C&S"]: [
        t("regina", "8:10", "8:30"),
        t("kg", "8:30", "9:00"),
        t("qacc", "9:00", "12:00"),
        t("kg", "12:00", "17:00"),
      ],
    },
    notes: "- KG pickup C&S from camp\n- Pickup procedure?",
  },

  {
    dateKey: "20250822",
    childToDayspan: {
      JSS: [
        t("kg", "8:10", "8:30"),
        t("lm", "8:30", "16:30"),
        t("am", "16:30", "17:00"),
      ],
      CMS: [
        t("js", "8:10", "8:50"),
        t("jenna", "8:50", "9:00"),
        t("bikeCamp", "9:00", "12:00"),
        t("js", "12:00", "17:00"),
      ],
      ["C&S"]: [
        t("regina", "8:10", "8:30"),
        t("js", "8:30", "9:00"),
        t("qacc", "9:00", "12:00"),
        t("regina", "12:00", "12:15"),
        t("js", "12:15", "17:00"),
      ],
    },
    notes:
      "- KG in office, taking taxi\n-Regina hold kids until JS back from C pickup",
  },
];
