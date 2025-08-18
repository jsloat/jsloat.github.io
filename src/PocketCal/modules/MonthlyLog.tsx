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

const Title = styled.div`
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 8px;
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
`;

export default function MonthlyLog({ startDate }: Props) {
  const d = new Date(startDate + "T00:00:00");
  const year = d.getFullYear();
  const month = d.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0).getDate();

  const monthTitle = `${firstOfMonth
    .toLocaleString("en-US", {
      month: "long",
    })
    .toUpperCase()} ${year}`;

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

  const days = Array.from({ length: lastDay }, (_, i) => i + 1);

  // localStorage key helper: namespaced and indexed by YYYYMMDD
  const keyFor = (y: number, m: number, day: number) => {
    const mm = String(m + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `pocketcal:monthlyLog:${y}${mm}${dd}`; // e.g. pocketcal:monthlyLog:20250817
  };

  // load initial entries for the month
  const initialEntries = useMemo(() => {
    const map: Record<number, string> = {};
    for (let day = 1; day <= lastDay; day++) {
      const k = keyFor(year, month, day);
      const v = pocketCalStorage.getMonthlyLogEntry(k) ?? "";
      map[day] = v;
    }
    return map;
  }, [startDate]);

  const [entries, setEntries] =
    useState<Record<number, string>>(initialEntries);

  useEffect(() => {
    // when month changes (startDate), reset entries from storage
    setEntries(initialEntries);
  }, [initialEntries]);

  return (
    <Wrapper aria-label="monthly-log">
      <Title>{monthTitle}</Title>
      <Rows>
        {days.map((day) => {
          const dt = new Date(year, month, day);
          const isDayBeforeStartDate = dt < new Date(startDate + "T00:00:00");
          return (
            <Row key={day} isWeekend={dt.getDay() === 0 || dt.getDay() === 6}>
              <CheckBox checked={isDayBeforeStartDate} />
              <DayNum>{day}</DayNum>
              <WeekLetter>{weekdayLetter(dt)}</WeekLetter>
              <Notes
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                  const t = (e.target as HTMLDivElement).innerText;
                  pocketCalStorage.setMonthlyLogEntry(
                    keyFor(year, month, day),
                    t
                  );
                }}
              >
                {entries[day]}
              </Notes>
            </Row>
          );
        })}
      </Rows>
    </Wrapper>
  );
}
