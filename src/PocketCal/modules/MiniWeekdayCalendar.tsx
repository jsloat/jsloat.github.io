import React, { useMemo, useState } from "react";
import { colors } from "src/consts";
import styled from "styled-components";

type Props = {
  startDate: string;
  initTitle: string;
  onTitleChange: (t: string) => void;
};

export default function MiniWeekdayCalendar({
  startDate,
  initTitle,
  onTitleChange,
}: Props) {
  const start = new Date(startDate + "T00:00:00");
  const year = start.getFullYear();
  const month = start.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);

  // find first Monday on/ before first of month
  const startDay = firstOfMonth.getDay();
  const daysToMonday = (startDay + 6) % 7;
  const firstCell = new Date(firstOfMonth);
  firstCell.setDate(firstOfMonth.getDate() - daysToMonday);

  // find last Friday on/ after last of month
  const endDay = lastOfMonth.getDay();
  const daysToFriday = (5 - endDay + 7) % 7;
  const lastCell = new Date(lastOfMonth);
  lastCell.setDate(lastOfMonth.getDate() + daysToFriday);

  const dates: Date[] = [];
  for (let d = new Date(firstCell); d <= lastCell; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }

  // weekday dates (Mon-Fri)
  const rawWeekdayDates = useMemo(
    () => dates.filter((dt) => dt.getDay() >= 1 && dt.getDay() <= 5),
    [startDate]
  );

  // chunk into rows of 5, then drop trailing rows that are entirely out-of-month
  const rows: Date[][] = [];
  for (let i = 0; i < rawWeekdayDates.length; i += 5) {
    rows.push(rawWeekdayDates.slice(i, i + 5));
  }

  // remove trailing rows where every cell is inactive (not in current month)
  while (
    rows.length > 1 &&
    rows[rows.length - 1].every((d) => d.getMonth() !== month)
  ) {
    rows.pop();
  }

  const weekdayDates = rows.flat();
  const rowsCount = Math.max(1, rows.length);

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

  const [title, setTitle] = useState(initTitle);

  return (
    <Wrapper aria-label="mini-weekday-calendar">
      <Title
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const t = (e.target as HTMLDivElement).innerText;
          setTitle(t);
          onTitleChange(t);
        }}
      >
        {title}
      </Title>

      <Grid style={{ ["--rows" as any]: rowsCount }}>
        {weekdayDates.map((d, i) => {
          const isActive = d.getMonth() === month;
          return (
            <Cell key={i} inactive={!isActive}>
              {isActive && (
                <DateLabel>
                  {d.getDate()}
                  {weekdayLetter(d)}
                </DateLabel>
              )}
            </Cell>
          );
        })}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 69.85mm;
  height: 107.95mm;
  box-sizing: border-box;
  padding: 6px;
  display: flex;
  flex-direction: column;
  background: white;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 6px;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const Grid = styled.div`
  gap: 1px;
  width: 100%;
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Mon-Fri */
  grid-template-rows: repeat(var(--rows, 1), 1fr);
`;

const Cell = styled.div<{ inactive?: boolean }>`
  font-size: 8px;
  padding: 3px;
  background: ${(p) => (p.inactive ? colors.slate[200] : "#fff")};
  color: #111;
  border: 1px solid ${colors.slate[300]};
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
`;

const DateLabel = styled.div`
  line-height: 1em;
`;
