import React from "react";
import { colors } from "src/consts";
import styled from "styled-components";

type Props = {
  startDate: string; // YYYY-MM-DD
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Grid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;
  gap: 0; /* no gaps between cells */
  background: #eee;
`;

const Cell = styled.div<{ inactive?: boolean }>`
  background: #fff;
  border: 1px solid #ddd;
  position: relative;
  padding: 6px;
  color: ${(p) => (p.inactive ? "#bbb" : "#111")};
  font-size: 11px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
`;

const DateLabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const DateLabel = styled.div`
  font-weight: 600;
  font-size: 11px;
  line-height: 1em;
`;

const MonthBadge = styled.div`
  color: ${colors.pink[600]};
  line-height: 1em;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  border: 1px solid ${colors.pink[600]};
  margin-right: 4px;

  @media print {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
`;

export default function TwoMonthCal({ startDate }: Props) {
  const start = new Date(startDate + "T00:00:00");
  // end = last day of next month
  const end = new Date(start.getFullYear(), start.getMonth() + 2, 0);

  // find first Monday on/ before start
  const startDay = start.getDay(); // 0 Sun .. 6 Sat
  const daysToMonday = (startDay + 6) % 7; // 0 if Monday, 1 if Tue... 6 if Sunday
  const firstCell = new Date(start);
  firstCell.setDate(start.getDate() - daysToMonday);

  const endDay = end.getDay();
  const daysToSunday = (7 - endDay) % 7;
  const lastCell = new Date(end);
  lastCell.setDate(end.getDate() + daysToSunday);

  // generate dates
  const dates: Date[] = [];
  for (let d = new Date(firstCell); d <= lastCell; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
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

  const shortMonth = (d: Date) =>
    d.toLocaleString("en-US", { month: "short" }).toUpperCase();

  // determine months that will be shown (for badge placement when first occurs)
  const monthFirstSeen: Record<string, boolean> = {};

  return (
    <Wrapper aria-label="two-month-cal">
      <Grid>
        {dates.map((d, i) => {
          const inRange = d >= start && d <= end;
          const showMonthBadge =
            d.getDate() === 1 &&
            inRange &&
            !monthFirstSeen[`${d.getFullYear()}-${d.getMonth()}`];
          if (d.getDate() === 1 && inRange) {
            monthFirstSeen[`${d.getFullYear()}-${d.getMonth()}`] = true;
          }

          return (
            <Cell key={i} inactive={!inRange}>
              <DateLabelContainer>
                {inRange && (
                  <DateLabel>
                    {d.getDate()}
                    {weekdayLetter(d)}
                  </DateLabel>
                )}
                {showMonthBadge && <MonthBadge>{shortMonth(d)}</MonthBadge>}
              </DateLabelContainer>
            </Cell>
          );
        })}
      </Grid>
    </Wrapper>
  );
}
