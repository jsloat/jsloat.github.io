import React from "react";
import styled from "styled-components";
import { Timespan, Day } from "./types";
import { mockFilledWeek } from "./mockData";
import { minutesToTimeLabel } from "./utils";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: Inter, Roboto, Arial, sans-serif;
  width: 100%;
`;

const Grid = styled.div`
  height: 100%;
  display: flex;
  gap: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const TimeAxis = styled.div`
  width: 48px;
  border-right: 1px solid rgba(0, 0, 0, 0.18);
  font-size: 12px;
  color: #444;
  padding: 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TimeAxisInner = styled.div`
  position: relative;
  flex: 1 1 auto;
  width: 100%;
`;

const DayColumn = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  border-left: 1px solid black;
`;

const DayHeader = styled.div`
  height: 28px;
  font-weight: 600;
  font-size: 13px;
  padding: 4px;
  box-sizing: border-box;
  text-align: center;
  border-bottom: 1px solid black;
`;

const ChildrenRow = styled.div`
  flex: 1 1 auto;
  display: flex;
  gap: 4px;
  position: relative;
`;

const ChildColumn = styled.div`
  flex: 1 1 0;
  border-left: 1px solid rgba(0, 0, 0, 0.14);
  position: relative;
`;

const ChildHeaderRow = styled.div`
  display: flex;
  gap: 4px;
`;

const ChildHeader = styled.div`
  flex: 1 1 0;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  padding: 4px;
  box-sizing: border-box;
  border-left: 1px solid rgba(0, 0, 0, 0.14);
`;

const TimespanBlock = styled.div<{
  top: number;
  height: number;
  color?: string;
}>`
  position: absolute;
  left: 4px;
  right: 4px;
  top: ${({ top }) => `${top}%`};
  height: ${({ height }) => `${height}%`};
  background: ${({ color }) => color ?? "rgba(0,0,0,0.04)"};
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  padding: 4px;
  font-size: 11px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimespanLabel = styled.div`
  /* writing-mode: vertical-lr; */
  display: flex;
  font-size: 8px;
  line-height: 1em;
  align-items: center;
  text-align: center;
  overflow: visible;
`;

const NotesSection = styled.div`
  margin-top: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
  height: 320px;
  overflow: auto;
  background: #fff;
`;

const NoteItem = styled.div`
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.04);
`;

const NoteBody = styled.div`
  font-size: 13px;
  color: #222;
  white-space: pre-wrap;
  word-break: break-word;
`;
const NoteTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
`;

export default function ChildcareScheduler() {
  let min = Infinity;
  let max = -Infinity;
  for (const day of mockFilledWeek) {
    for (const child in day.childToDayspan) {
      const spans = day.childToDayspan[child];
      for (const s of spans) {
        min = Math.min(min, s.startMinutes);
        max = Math.max(max, s.endMinutes);
      }
    }
  }
  if (!isFinite(min) || !isFinite(max)) {
    min = 8 * 60;
    max = 17 * 60;
  }
  const total = max - min || 1;

  const dayHeaderLabel = (day: Day) => {
    const d = new Date(
      Number(day.dateKey.slice(0, 4)),
      Number(day.dateKey.slice(4, 6)) - 1,
      Number(day.dateKey.slice(6, 8))
    );
    const dayOfMonth = d.getDate();
    const letter = ["S", "M", "T", "W", "T", "F", "S"][d.getDay()];
    return `${dayOfMonth}${letter}`;
  };

  return (
    <Wrapper>
      <Grid>
        <TimeAxis>
          <div style={{ height: 28 }} />
          <TimeAxisInner>
            {/* Show a handful of labels: every hour */}
            {(() => {
              const labels: number[] = [];
              // always start with the exact min time
              labels.push(min);

              // add hour ticks between min and max (skip duplicating min)
              const firstHour = Math.ceil(min / 60);
              for (let h = firstHour; h * 60 < max; h++) {
                const m = h * 60;
                if (m !== min) labels.push(m);
              }

              // ensure max is always present as the last label
              if (labels[labels.length - 1] < max) labels.push(max);

              return labels.map((minutes, i) => {
                const pct = ((minutes - min) / total) * 100;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      top: `${pct}%`,
                      transform: "translateY(-50%)",
                    }}
                  >
                    {minutesToTimeLabel(minutes)}
                  </div>
                );
              });
            })()}
          </TimeAxisInner>
        </TimeAxis>

        {mockFilledWeek.map((day) => (
          <DayColumn key={day.dateKey}>
            <DayHeader>{dayHeaderLabel(day)}</DayHeader>
            <ChildHeaderRow>
              {Object.keys(day.childToDayspan).map((childKey) => (
                <ChildHeader key={childKey}>{childKey}</ChildHeader>
              ))}
            </ChildHeaderRow>
            <ChildrenRow>
              {Object.keys(day.childToDayspan).map((childKey) => (
                <ChildColumn key={childKey}>
                  {day.childToDayspan[childKey].map((ts: Timespan, idx) => {
                    const top = ((ts.startMinutes - min) / total) * 100;
                    const height =
                      ((ts.endMinutes - ts.startMinutes) / total) * 100;
                    return (
                      <TimespanBlock
                        key={idx}
                        top={top}
                        height={height}
                        color={ts.caretaker.color}
                      >
                        <TimespanLabel>
                          {ts.caretaker.name}{" "}
                          {minutesToTimeLabel(ts.startMinutes)}
                        </TimespanLabel>
                      </TimespanBlock>
                    );
                  })}
                </ChildColumn>
              ))}
            </ChildrenRow>
          </DayColumn>
        ))}
      </Grid>

      <NotesSection>
        <NoteTitle>Notes</NoteTitle>
        <div style={{ marginLeft: 56 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(5, 1fr)`,
              gap: 8,
            }}
          >
            {mockFilledWeek.map((day) => (
              <NoteItem key={day.dateKey} style={{ minHeight: 60 }}>
                <NoteBody>
                  {day.notes ?? <span style={{ color: "#999" }}>—</span>}
                </NoteBody>
              </NoteItem>
            ))}
          </div>
        </div>
      </NotesSection>
    </Wrapper>
  );
}
