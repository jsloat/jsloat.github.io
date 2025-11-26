/* eslint-disable complexity */

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Timespan, Day, Week, Weekday } from "./types";
import {
  emptyWeek,
  minutesToTimeLabel,
  timeToMinutesFromMidnight,
} from "./utils";
import pocketCalStorage from "src/PocketCal/pocketCalStorage";
import { useModal } from "src/Modal";

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
  @media print {
    button {
      display: none;
    }
  }
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
  /* Base color from caretaker, with a subtle hatched overlay for texture */
  background-color: ${({ color }) => color ?? "rgba(0,0,0,0.04)"};
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.14) 0px,
    rgba(255, 255, 255, 0.14) 6px,
    rgba(0, 0, 0, 0.06) 6px,
    rgba(0, 0, 0, 0.06) 12px
  );
  background-blend-mode: overlay;
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
  background-color: white;
  padding: 2px;
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

const SettingsButton = styled.button`
  position: absolute;
  right: 12px;
  top: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  @media print {
    display: none;
  }
`;

const ResetButton = styled.button`
  position: absolute;
  right: 52px;
  top: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  @media print {
    display: none;
  }
`;

const SettingsPanel = styled.div`
  position: absolute;
  right: 12px;
  top: 44px;
  width: 260px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  z-index: 40;
  @media print {
    display: none;
  }
`;

const SettingRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 6px;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 6px;
  top: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const ErrorText = styled.div`
  color: #b00020;
  font-size: 12px;
  margin-top: 6px;
`;

type Props = { startDate?: string };

const WEEKDAYS: Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export default function ChildcareScheduler({ startDate }: Props) {
  // Allow editing the week JSON via a textarea. Start with persisted value if present,
  // otherwise fall back to the mock data.
  const [weekData, setWeekData] = useState<Week>(() => {
    const persisted = pocketCalStorage.getWeek();
    return persisted ?? emptyWeek;
  });
  // raw editor removed; no editor-format helper needed

  // raw JSON editor removed; internal editor state cleared

  const [showSettings, setShowSettings] = useState(false);
  const [caretakerColors, setCaretakerColors] = useState<
    Record<string, string>
  >(() => {
    return pocketCalStorage.getCaretakerColors?.() ?? {};
  });

  const childHeaderRef = useRef<HTMLDivElement | null>(null);
  const [childHeaderHeight, setChildHeaderHeight] = useState<number>(0);
  const addTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const update = () => {
      if (childHeaderRef.current) {
        setChildHeaderHeight(
          Math.round(childHeaderRef.current.getBoundingClientRect().height)
        );
      }
    };

    update();
    const RO = (window as any).ResizeObserver;
    let ro: any = null;
    if (RO) {
      ro = new RO(() => update());
      if (childHeaderRef.current) ro.observe(childHeaderRef.current);
    }
    return () => ro?.disconnect?.();
  }, [childHeaderRef.current]);

  let min = Infinity;
  let max = -Infinity;
  for (const day of weekData) {
    for (const childKey of ["JSS", "CMS"]) {
      const spans = (day.data?.[childKey as "JSS" | "CMS"] || []) as any[];
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

  const axisLabels = (() => {
    const labels: number[] = [];
    labels.push(min);
    const firstHour = Math.ceil(min / 60);
    for (let h = firstHour; h * 60 < max; h++) {
      const m = h * 60;
      if (m !== min) labels.push(m);
    }
    if (labels[labels.length - 1] < max) labels.push(max);
    return labels;
  })();

  // Compute the monday for the provided startDate (most recent Monday on or before startDate)
  const computeMonday = (isoDate?: string) => {
    const d = isoDate ? new Date(isoDate + "T00:00:00") : new Date();
    const jsDay = d.getDay(); // 0 = Sun, 1 = Mon
    const delta = (jsDay + 6) % 7; // days since Monday
    const mon = new Date(d);
    mon.setDate(d.getDate() - delta);
    mon.setHours(0, 0, 0, 0);
    return mon;
  };

  const monday = computeMonday(startDate);

  const dayHeaderLabel = (offset: number) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + offset);
    const dayOfMonth = d.getDate();
    const letter = ["S", "M", "T", "W", "T", "F", "S"][d.getDay()];
    return `${dayOfMonth}${letter}`;
  };

  // Helper to find the Day object for a given weekday
  const dayForWeekday = (weekday: Weekday): Day => {
    const found = weekData.find((d) => d.weekday === weekday);
    if (found) return found;
    return { weekday, data: { JSS: [], CMS: [] } } as Day;
  };

  useEffect(() => {
    pocketCalStorage.setCaretakerColors(caretakerColors);
  }, [caretakerColors]);

  // Modal for editing a timespan
  const { Modal, setIsModalActive } = useModal();
  const [modalInfo, setModalInfo] = useState<{
    dayIndex: number;
    childKey: "JSS" | "CMS";
    tsIndex: number;
  } | null>(null);
  const [modalText, setModalText] = useState("");
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<"edit" | "add">("edit");
  const [addModalInfo, setAddModalInfo] = useState<{
    dayIndex: number;
    childKey: "JSS" | "CMS";
  } | null>(null);

  const openTimespanModal = (
    dayIndex: number,
    childKey: "JSS" | "CMS",
    tsIndex: number,
    ts: Timespan
  ) => {
    setModalMode("edit");
    setModalInfo({ dayIndex, childKey, tsIndex });
    setModalText(
      `${ts.caretaker}: ${minutesToTimeLabel(
        ts.startMinutes
      )}-${minutesToTimeLabel(ts.endMinutes)}`
    );
    setModalError(null);
    setIsModalActive(true);
  };

  const openAddModal = (dayIndex: number, childKey: "JSS" | "CMS") => {
    setModalMode("add");
    setAddModalInfo({ dayIndex, childKey });
    setModalText("");
    setModalError(null);
    setIsModalActive(true);
  };

  const closeAddModal = () => {
    setIsModalActive(false);
    setAddModalInfo(null);
    setModalText("");
    setModalError(null);
    setModalMode("edit");
  };

  const saveAddModal = () => {
    if (!addModalInfo) return;
    const raw = addTextareaRef.current
      ? addTextareaRef.current.value
      : modalText;
    const lines = raw
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) {
      setModalError("No lines provided");
      return;
    }
    const parsed: Timespan[] = [];
    for (const line of lines) {
      const m = line.match(
        /^([^:]+):\s*([0-9]{1,2}:[0-9]{2})-([0-9]{1,2}:[0-9]{2})$/
      );
      if (!m) {
        setModalError(`Invalid line: ${line}`);
        return;
      }
      const name = m[1].trim();
      const start = timeToMinutesFromMidnight(m[2]);
      const end = timeToMinutesFromMidnight(m[3]);
      parsed.push({ caretaker: name, startMinutes: start, endMinutes: end });
    }

    const newWeek = JSON.parse(JSON.stringify(weekData)) as Week;
    const arr = newWeek[addModalInfo.dayIndex].data[addModalInfo.childKey];
    arr.push(...parsed);
    setWeekData(newWeek);
    try {
      pocketCalStorage.setWeek?.(newWeek);
    } catch (err) {}
    closeAddModal();
  };

  const closeTimespanModal = () => {
    setIsModalActive(false);
    setModalInfo(null);
    setModalText("");
    setModalError(null);
  };

  const saveTimespanFromModal = () => {
    if (!modalInfo) return;
    const m = modalText.match(
      /^([^:]+):\s*([0-9]{1,2}:[0-9]{2})-([0-9]{1,2}:[0-9]{2})$/
    );
    if (!m) {
      setModalError("Expected format: NAME: H:MM-H:MM");
      return;
    }
    const name = m[1].trim();
    const start = timeToMinutesFromMidnight(m[2]);
    const end = timeToMinutesFromMidnight(m[3]);
    const updated: Timespan = {
      caretaker: name,
      startMinutes: start,
      endMinutes: end,
    };

    const newWeek = JSON.parse(JSON.stringify(weekData)) as Week;
    newWeek[modalInfo.dayIndex].data[modalInfo.childKey].splice(
      modalInfo.tsIndex,
      1,
      updated
    );
    setWeekData(newWeek);
    try {
      pocketCalStorage.setWeek?.(newWeek);
    } catch (err) {}
    closeTimespanModal();
  };

  const deleteTimespanFromModal = () => {
    if (!modalInfo) return;
    const newWeek = JSON.parse(JSON.stringify(weekData)) as Week;
    newWeek[modalInfo.dayIndex].data[modalInfo.childKey].splice(
      modalInfo.tsIndex,
      1
    );
    setWeekData(newWeek);
    try {
      pocketCalStorage.setWeek?.(newWeek);
    } catch (err) {}
    closeTimespanModal();
  };

  return (
    <Wrapper>
      <ResetButton
        onClick={() => {
          const emptyWeek = WEEKDAYS.map((w) => ({
            weekday: w,
            data: { JSS: [], CMS: [] },
          })) as unknown as Week;
          setWeekData(emptyWeek);
          try {
            pocketCalStorage.setWeek?.(emptyWeek);
          } catch (err) {}
        }}
      >
        Reset
      </ResetButton>
      <SettingsButton onClick={() => setShowSettings((s) => !s)}>
        ⚙️
      </SettingsButton>
      {showSettings ? (
        <SettingsPanel>
          <CloseButton onClick={() => setShowSettings(false)}>✕</CloseButton>
          <NoteTitle>Caretaker colors</NoteTitle>
          {Object.keys(caretakerColors).map((name) => (
            <SettingRow key={name}>
              <div
                style={{
                  width: 1,
                  height: 16,
                  background: caretakerColors[name],
                  border: "1px solid #ccc",
                }}
              />
              <div style={{ flex: 1 }}>{name}</div>
              <input
                type="color"
                value={caretakerColors[name]}
                onChange={(e) =>
                  setCaretakerColors((s) => ({ ...s, [name]: e.target.value }))
                }
              />
            </SettingRow>
          ))}
          <SettingRow>
            <input placeholder="name" id="new-caretaker-name" />
            <input
              type="color"
              defaultValue="#ffffff"
              id="new-caretaker-color"
            />
            <button
              onClick={() => {
                const n = (
                  document.getElementById(
                    "new-caretaker-name"
                  ) as HTMLInputElement
                ).value.trim();
                const c = (
                  document.getElementById(
                    "new-caretaker-color"
                  ) as HTMLInputElement
                ).value;
                if (!n) return;
                setCaretakerColors((s) => ({ ...s, [n]: c }));
                (
                  document.getElementById(
                    "new-caretaker-name"
                  ) as HTMLInputElement
                ).value = "";
              }}
            >
              Add
            </button>
          </SettingRow>
        </SettingsPanel>
      ) : null}
      <Grid>
        <TimeAxis>
          <div style={{ height: 28 + childHeaderHeight }} />
          <TimeAxisInner>
            {/* Show the precomputed labels */}
            {axisLabels.map((minutes, i) => {
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
            })}
          </TimeAxisInner>
        </TimeAxis>

        {/* Right side: an overlay container that holds the day columns and horizontal grid lines */}
        <div style={{ position: "relative", flex: 1, display: "flex" }}>
          {/* Horizontal grid lines overlayed and aligned with the axis labels. */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 28 + childHeaderHeight,
              bottom: 0,
              pointerEvents: "none",
            }}
          >
            {axisLabels.map((minutes, i) => {
              const pct = ((minutes - min) / total) * 100;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: `${pct}%`,
                    left: 0,
                    right: 0,
                    transform: "translateY(-50%)",
                    borderTop: "1px dashed rgba(0,0,0,.8)",
                  }}
                />
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 8, width: "100%" }}>
            {WEEKDAYS.map((weekday, dayIndex) => {
              const day = dayForWeekday(weekday);
              return (
                <DayColumn key={weekday}>
                  <DayHeader>{dayHeaderLabel(dayIndex)}</DayHeader>
                  <ChildHeaderRow ref={childHeaderRef}>
                    <ChildHeader>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                        }}
                      >
                        <span>JSS</span>
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => openAddModal(dayIndex, "JSS")}
                        >
                          +
                        </button>
                      </div>
                    </ChildHeader>
                    <ChildHeader>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                        }}
                      >
                        <span>CMS</span>
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => openAddModal(dayIndex, "CMS")}
                        >
                          +
                        </button>
                      </div>
                    </ChildHeader>
                  </ChildHeaderRow>
                  <ChildrenRow>
                    {(["JSS", "CMS"] as const).map((childKey) => (
                      <ChildColumn key={childKey}>
                        {(day.data?.[childKey] || []).map(
                          (ts: Timespan, idx: number) => {
                            const top = ((ts.startMinutes - min) / total) * 100;
                            const height =
                              ((ts.endMinutes - ts.startMinutes) / total) * 100;
                            const mapped = caretakerColors[ts.caretaker];
                            const color = mapped ?? undefined;
                            return (
                              <TimespanBlock
                                key={idx}
                                top={top}
                                height={height}
                                color={color}
                                onClick={() =>
                                  openTimespanModal(dayIndex, childKey, idx, ts)
                                }
                              >
                                <TimespanLabel>
                                  {ts.caretaker}{" "}
                                  {minutesToTimeLabel(ts.startMinutes)}
                                </TimespanLabel>
                              </TimespanBlock>
                            );
                          }
                        )}
                      </ChildColumn>
                    ))}
                  </ChildrenRow>
                </DayColumn>
              );
            })}
          </div>
        </div>
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
            {WEEKDAYS.map((weekday) => {
              const day = dayForWeekday(weekday);
              return (
                <NoteItem key={weekday} style={{ minHeight: 60 }}>
                  <NoteBody
                    contentEditable
                    suppressContentEditableWarning
                    onKeyDown={(e) => {
                      // Allow Enter to create newlines. Use Escape to finish editing.
                      if (e.key === "Escape") {
                        (e.currentTarget as HTMLDivElement).blur();
                      }
                    }}
                    onBlur={(e) => {
                      const t = (e.target as HTMLDivElement).innerText;
                      // Build canonical week array (Mon-Fri) and set notes for this weekday
                      const newWeek: Week = WEEKDAYS.map((w) => {
                        const existing = weekData.find((d) => d.weekday === w);
                        return {
                          weekday: w,
                          data: {
                            JSS: existing?.data?.JSS ?? [],
                            CMS: existing?.data?.CMS ?? [],
                          },
                          notes: w === weekday ? t : existing?.notes,
                        } as any;
                      }) as Week;
                      setWeekData(newWeek);
                      try {
                        pocketCalStorage.setWeek?.(newWeek);
                      } catch (err) {
                        // ignore
                      }
                      // raw editor removed; nothing else to update
                    }}
                  >
                    {day.notes ?? <span style={{ color: "#999" }}>—</span>}
                  </NoteBody>
                </NoteItem>
              );
            })}
          </div>
        </div>
      </NotesSection>

      {/* Raw JSON editor removed per request */}
      {/* Timespan / Add modal */}
      <Modal>
        {modalMode === "edit" ? (
          <div style={{ padding: 12 }}>
            <NoteTitle>Edit timespan</NoteTitle>
            <div style={{ marginBottom: 8 }}>
              <input
                style={{ width: "100%", boxSizing: "border-box", padding: 6 }}
                value={modalText}
                onChange={(e) => setModalText(e.target.value)}
                autoFocus
              />
              {modalError ? <ErrorText>{modalError}</ErrorText> : null}
            </div>
            <div
              style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
            >
              <button onClick={closeTimespanModal}>Close</button>
              <button onClick={deleteTimespanFromModal}>Delete</button>
              <button onClick={saveTimespanFromModal}>Save</button>
            </div>
          </div>
        ) : (
          <div style={{ padding: 12 }}>
            <NoteTitle>Add timespans</NoteTitle>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 12, marginBottom: 6, color: "#555" }}>
                Enter one shorthand per line: NAME: H:MM-H:MM
              </div>
              <textarea
                ref={addTextareaRef}
                defaultValue={modalText}
                style={{
                  width: "100%",
                  minHeight: 160,
                  boxSizing: "border-box",
                  padding: 6,
                }}
                autoFocus
              />
              {modalError ? <ErrorText>{modalError}</ErrorText> : null}
            </div>
            <div
              style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
            >
              <button onClick={closeAddModal}>Close</button>
              <button onClick={saveAddModal}>Save</button>
            </div>
          </div>
        )}
      </Modal>
    </Wrapper>
  );
}
