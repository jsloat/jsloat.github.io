import React, { useEffect, useState, useMemo } from "react";
import { colors } from "src/consts";
import styled from "styled-components";
import pocketCalStorage from "../pocketCalStorage";

type Props = { startDate: string };
export default function MonthlyLog({ startDate }: Props) {
  const visibleDates = getVisibleDates(new Date(startDate + "T00:00:00"), 28);

  const initialEntries = useMemo(() => {
    const map: Record<string, string> = {};
    for (const date of visibleDates) {
      const k = pocketCalStorage.getDayKey(date);
      const v = pocketCalStorage.getMonthlyLogEntry(date) ?? "";
      map[k] = v;
    }
    return map;
  }, [startDate]);

  const [entries, setEntries] =
    useState<Record<string, string>>(initialEntries);

  useEffect(() => {
    setEntries(initialEntries);
  }, [initialEntries]);

  return (
    <Wrapper aria-label="monthly-log">
      <Rows>
        {visibleDates.map((date, i) => {
          const dateKey = pocketCalStorage.getDayKey(date);
          return (
            <DateRowContents
              date={date}
              entry={entries[dateKey]}
              setEntries={setEntries}
              key={dateKey}
              index={i}
            />
          );
        })}
      </Rows>
    </Wrapper>
  );
}

type DateRowContentsProps = {
  date: Date;
  entry: string | undefined;
  setEntries: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  index: number;
};
const DateRowContents = ({
  date,
  entry,
  setEntries,
  index,
}: DateRowContentsProps) => {
  const dateKey = pocketCalStorage.getDayKey(date);
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const shouldShowMonthBadge = dayOfMonth === 1 || index === 0;

  return (
    <Row key={dateKey} isWeekend={isWeekend}>
      <CheckBox />
      <DayNum>{dayOfMonth}</DayNum>
      <WeekLetter>{weekdayLetters[dayOfWeek]}</WeekLetter>
      <Notes
        contentEditable
        suppressContentEditableWarning
        onKeyDown={(e) => {
          const isEnter = e.key === "Enter";
          const isEscape = e.key === "Escape";
          if (!isEnter && !isEscape) return;
          if (isEnter) e.preventDefault();
          e.currentTarget.blur();
        }}
        onBlur={(e) => {
          const t = (e.target as HTMLDivElement).innerText;
          pocketCalStorage.setMonthlyLogEntry(date, t);
          setEntries((s) => ({ ...s, [dateKey]: t }));
        }}
      >
        {entry}
      </Notes>
      {shouldShowMonthBadge && (
        <MonthBadge>
          {date.toLocaleString(undefined, { month: "short" }).toUpperCase()}
        </MonthBadge>
      )}
    </Row>
  );
};

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

const weekdayLetters = ["S", "M", "T", "W", "T", "F", "S"];

const getVisibleDates = (start: Date, days: number): Date[] => {
  const dates: Date[] = [];
  for (let i = 0; i < days; i++) {
    const dt = new Date(start);
    dt.setDate(start.getDate() + i);
    dates.push(dt);
  }
  return dates;
};
