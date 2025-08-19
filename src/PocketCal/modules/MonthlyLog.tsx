import React, { useEffect, useState, useMemo } from "react";
import { colors } from "src/consts";
import styled from "styled-components";
import pocketCalStorage from "../pocketCalStorage";

type Props = { startDate: string };

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background: white;
`;

const Rows = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding-right: 6px;
`;

const Row = styled.div<{ isWeekend: boolean }>`
  display: flex;
  flex: 1 1 0;
  align-items: center;
  gap: 8px;
  padding: 6px 4px;
  border-bottom: 1px solid ${colors.slate[400]};
  min-height: 28px;
  box-sizing: border-box;
  ${({ isWeekend }) => ({
    ...(isWeekend && { backgroundColor: colors.slate[200] }),
  })}
`;

const CheckBox = styled.div<{ checked?: boolean }>`
  width: 18px;
  height: 18px;
  border: 1px solid ${colors.slate[400]};
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: 1;
  color: ${colors.slate[700]};

  /* show a real checkmark character when checked */
  &::after {
    content: "✓";
    display: ${({ checked }) => (checked ? "block" : "none")};
    font-size: 12px;
    line-height: 1;
    color: inherit;
  }
`;

const DayNum = styled.div`
  font-weight: 600;
  font-size: 14px;
  width: 16px;
  text-align: right;
`;

const WeekLetter = styled.div`
  color: #666;
  font-weight: 600;
  font-size: 14px;
  width: 12px;
  text-align: center;
`;

const Notes = styled.div`
  min-height: 20px;
  font-size: 14px;
  cursor: text;
  min-width: 200px;
  flex: 1 1 auto;
`;

const MonthBadge = styled.div`
  margin-left: 8px;
  background: ${colors.slate[100]};
  color: ${colors.slate[700]};
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  line-height: 1em;
`;

export default function MonthlyLog({ startDate }: Props) {
  const start = new Date(startDate + "T00:00:00");
  // last visible day: 28 days forward from start (inclusive)
  const startDatePlus28D = new Date(start);
  startDatePlus28D.setDate(start.getDate() + 28);

  // build array of Date objects from start .. startDatePlus28D (inclusive)
  const dates: Date[] = [];
  for (
    let dt = new Date(start);
    dt <= startDatePlus28D;
    dt.setDate(dt.getDate() + 1)
  ) {
    dates.push(new Date(dt));
  }

  const weekdayLetter = (date: Date) => {
    switch (date.getDay()) {
      case 0:
        return "S";
      case 1:
        return "M";
      case 2:
        return "T";
      case 3:
        return "W";
      case 4:
        return "T";
      case 5:
        return "F";
      case 6:
        return "S";
      default:
        return "";
    }
  };

  // localStorage key helper: namespaced and indexed by YYYYMMDD
  const keyFor = (y: number, m: number, day: number) => {
    const mm = String(m + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `pocketcal:monthlyLog:${y}${mm}${dd}`; // e.g. pocketcal:monthlyLog:20250817
  };

  // load initial entries for the date range
  const initialEntries = useMemo(() => {
    const map: Record<string, string> = {};
    for (const dt of dates) {
      const k = keyFor(dt.getFullYear(), dt.getMonth(), dt.getDate());
      const v = pocketCalStorage.getMonthlyLogEntry(k) ?? "";
      map[k] = v;
    }
    return map;
  }, [startDate]);

  const [entries, setEntries] =
    useState<Record<string, string>>(initialEntries);

  useEffect(() => {
    // when startDate changes, reset entries from storage
    setEntries(initialEntries);
  }, [initialEntries]);

  return (
    <Wrapper aria-label="monthly-log">
      <Rows>
        {dates.map((dt, idx) => {
          const k = keyFor(dt.getFullYear(), dt.getMonth(), dt.getDate());
          const isDayBeforeStartDate = dt < start;
          return (
            <Row key={k} isWeekend={dt.getDay() === 0 || dt.getDay() === 6}>
              <CheckBox checked={isDayBeforeStartDate} />
              <DayNum>{dt.getDate()}</DayNum>
              <WeekLetter>{weekdayLetter(dt)}</WeekLetter>
              <Notes
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                  const t = (e.target as HTMLDivElement).innerText;
                  pocketCalStorage.setMonthlyLogEntry(k, t);
                  setEntries((s) => ({ ...s, [k]: t }));
                }}
              >
                {entries[k]}
              </Notes>
              {(dt.getDate() === 1 || idx === 0) && (
                <MonthBadge>
                  {dt
                    .toLocaleString(undefined, { month: "short" })
                    .toUpperCase()}
                </MonthBadge>
              )}
            </Row>
          );
        })}
      </Rows>
    </Wrapper>
  );
}
