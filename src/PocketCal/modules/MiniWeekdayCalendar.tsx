import React, { useMemo, useState, useEffect } from "react";
import { colors } from "src/consts";
import styled from "styled-components";
import pocketCalStorage from "../pocketCalStorage";

type Props = {
  startDate: string;
  initTitle: string;
  onTitleChange: (t: string) => void;
  instanceId?: 1 | 2;
};

export default function MiniWeekdayCalendar({
  startDate,
  initTitle,
  onTitleChange,
  instanceId = 1,
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

  // notes state: map dateKey -> newline-delimited string
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const dateKeyFor = (d: Date) => {
    const y = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}${mm}${dd}`;
  };

  useEffect(() => {
    const map: Record<string, string> = {};
    for (const d of weekdayDates) {
      const k = dateKeyFor(d);
      // read mini-specific per-mini dict entry
      const raw = pocketCalStorage.getMiniEntry(instanceId, k) ?? "";
      let val = "";
      if (!raw) {
        val = "";
      } else {
        // support older JSON-array format by converting to newline-delimited string
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            val = parsed.filter(Boolean).join("\n");
          } else if (typeof parsed === "string") {
            val = parsed;
          } else {
            val = String(raw);
          }
        } catch (e) {
          // not JSON, treat as plain string
          val = String(raw);
        }
      }
      map[k] = val;
    }
    setNotesMap(map);
  }, [startDate, instanceId]);

  const saveNotesFor = (d: Date, text: string) => {
    const k = dateKeyFor(d);
    try {
      pocketCalStorage.setMiniEntry(instanceId, k, text);
    } catch (e) {
      // ignore
    }
    setNotesMap((s) => ({ ...s, [k]: text }));
  };

  const openEditorFor = (d: Date) => {
    const k = dateKeyFor(d);
    setEditingKey(k);
    setEditingText(notesMap[k] ?? "");
  };

  const saveEditor = (d: Date) => {
    saveNotesFor(d, editingText);
    setEditingKey(null);
    setEditingText("");
  };

  const cancelEditor = () => {
    setEditingKey(null);
    setEditingText("");
  };

  return (
    <Wrapper aria-label="mini-weekday-calendar">
      <Title
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const t = (e.target as HTMLDivElement).innerText;
          setTitle(t);
          if (onTitleChange) onTitleChange(t);
        }}
      >
        {title}
      </Title>

      <Grid style={{ ["--rows" as any]: rowsCount }}>
        {weekdayDates.map((d, i) => {
          const isDateInMonth = d.getMonth() === month;
          const isActive = isDateInMonth && start.getDate() <= d.getDate();
          const k = dateKeyFor(d);
          return (
            <Cell key={i} inactive={!isActive}>
              {isDateInMonth && (
                <>
                  <DateRow>
                    <DateLabel>
                      {d.getDate()}
                      {weekdayLetter(d)}
                    </DateLabel>
                    <AddNoteBtn
                      title="Add / Edit notes"
                      onClick={(ev) => {
                        ev.stopPropagation();
                        openEditorFor(d);
                      }}
                    >
                      ✎
                    </AddNoteBtn>
                  </DateRow>

                  <NotesList
                    aria-hidden={!notesMap[k]}
                    onClick={() => openEditorFor(d)}
                  >
                    {(notesMap[k] || "")
                      .split("\n")
                      .filter(Boolean)
                      .slice(0, 3)
                      .map((line, idx) => (
                        <NoteItem key={idx}>{line}</NoteItem>
                      ))}
                  </NotesList>

                  {editingKey === k && (
                    <EditorWrapper>
                      <EditorTextarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        placeholder="Enter notes (use newlines for bullets)"
                      />
                      <EditorButtons>
                        <EditorButton
                          onClick={() => saveEditor(d)}
                          title="Save"
                        >
                          Save
                        </EditorButton>
                        <EditorButton onClick={cancelEditor} title="Cancel">
                          Cancel
                        </EditorButton>
                      </EditorButtons>
                    </EditorWrapper>
                  )}
                </>
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
  overflow: auto;
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
  flex-direction: column;
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AddNoteBtn = styled.button`
  width: 18px;
  height: 18px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.slate[700]};
  cursor: pointer;
  font-size: 14px;
  line-height: 1;

  @media print {
    display: none;
  }
`;

const DateLabel = styled.div`
  line-height: 1em;
`;

const NotesList = styled.ul`
  margin: 4px 0 0 8px;
  padding: 0;
  list-style: disc;
  font-size: 7px;
  line-height: 1.1;
  max-height: 3.6em; /* approx 3 items */
`;

const NoteItem = styled.li`
  margin: 0;
  padding: 0;
`;

const EditorWrapper = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: column;
`;

const EditorTextarea = styled.textarea`
  width: 100%;
  min-height: 48px;
  font-size: 11px;
  padding: 6px;
  box-sizing: border-box;
  resize: vertical;
`;

const EditorButtons = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 6px;
`;

const EditorButton = styled.button`
  padding: 4px 8px;
  font-size: 12px;
`;
