import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import TwoMonthCal from "./modules/TwoMonthCal";
import MonthlyLog from "./modules/MonthlyLog";
import MiniWeekdayCalendar from "./modules/MiniWeekdayCalendar";
import pocketCalStorage from "./pocketCalStorage";

// Helper to format mm values for CSS
const mm = (v: number) => `${v}mm`;

const SHEET_WIDTH_MM = 215.9;
const SHEET_HEIGHT_MM = 279.4;
const SHEET_PADDING_MM = 2;
const CONTENT_WIDTH_MM = SHEET_WIDTH_MM - SHEET_PADDING_MM * 2;
const CONTENT_HEIGHT_MM = SHEET_HEIGHT_MM - SHEET_PADDING_MM * 2;

const GlobalPrintStyles = createGlobalStyle`
  #print-area { display: flex; gap: 20px; flex-wrap: wrap; }

  @media print {
    @page { size: letter; margin: 0; }
    /* force scaling to match manual 150% that produced correct output */
    body { zoom: 150%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

    /* hide everything except the print area */
    body * { visibility: hidden; }
    #print-area, #print-area * { visibility: visible; }
    #print-area { position: absolute; left: 0; top: 0; gap: 0; }

    /* ensure each sheet prints as its own page */
    .sheet { page-break-after: always; box-shadow: none; }

    /* ensure backgrounds print as white and avoid color/antialias gaps */
    .sheet, .sheet * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
`;

const Container = styled.div`
  padding: 12px;
  font-family: Inter, Roboto, Arial, sans-serif;
`;

const Layout = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const Sidebar = styled.div`
  margin-bottom: 16px;
  align-self: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const DateInput = styled.input`
  padding: 6px;
  width: 100%;
  box-sizing: border-box;
`;

const PrintAreaWrapper = styled.div`
  flex: 1;
`;

const PrintArea = styled.div.attrs({ id: "print-area" })`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

// ModuleContainer now absolutely positioned inside the sheet and rotated
const ModuleContainer = styled.div`
  position: absolute;
  left: ${mm(SHEET_PADDING_MM)};
  top: ${mm(SHEET_PADDING_MM)};
  width: ${mm(CONTENT_HEIGHT_MM)}; /* swapped */
  height: ${mm(CONTENT_WIDTH_MM)}; /* swapped */
  transform-origin: 0 0;
  transform: rotate(90deg) translate(0, -100%);
`;

const Sheet = styled.div.attrs({ className: "sheet" })`
  width: ${mm(SHEET_WIDTH_MM)};
  height: ${mm(SHEET_HEIGHT_MM)}; /* US Letter */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  background: white;
  box-sizing: border-box;
  padding: ${mm(SHEET_PADDING_MM)};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

// new: content row and half-column containers for half-page modules
const ContentRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 12px;
  margin-top: 12px;
  flex: 1 1 auto;
`;

const Half = styled.div`
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  background: transparent;
`;

const HalfRight = styled(Half)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Mini = styled.div`
  height: 25%;
  box-sizing: border-box;
`;

const RotateLeft = styled.div`
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const Rotate180 = styled.div`
//   transform: rotate(180deg);
//   width: 100%;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

export default function PocketCal() {
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  // compute module start = first day of the month AFTER the selected startDate
  const moduleStartDate = (() => {
    const d = new Date(startDate + "T00:00:00");
    const nextMonthFirst = new Date(d.getFullYear(), d.getMonth() + 1, 1);
    return nextMonthFirst.toISOString().slice(0, 10);
  })();

  return (
    <Container>
      <GlobalPrintStyles />

      <Layout>
        <Sidebar>
          <Label>Start date for modules</Label>
          <DateInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Sidebar>

        <PrintAreaWrapper>
          <PrintArea>
            <Sheet>
              <ContentRow>
                <Half>
                  <MonthlyLog startDate={startDate} />
                </Half>

                <HalfRight>
                  <Mini>
                    <RotateLeft>
                      <MiniWeekdayCalendar
                        startDate={startDate}
                        initTitle={
                          pocketCalStorage.get("miniWeekdayCalendar1Title") ??
                          "Weekday planner"
                        }
                        onTitleChange={(t) =>
                          pocketCalStorage.set("miniWeekdayCalendar1Title", t)
                        }
                      />
                    </RotateLeft>
                  </Mini>

                  <Mini />
                  <Mini />

                  <Mini>
                    <RotateLeft>
                      <MiniWeekdayCalendar
                        startDate={startDate}
                        initTitle={
                          pocketCalStorage.get("miniWeekdayCalendar2Title") ??
                          "Weekday planner"
                        }
                        onTitleChange={(t) =>
                          pocketCalStorage.set("miniWeekdayCalendar2Title", t)
                        }
                      />
                    </RotateLeft>
                  </Mini>
                </HalfRight>
              </ContentRow>
            </Sheet>

            <Sheet>
              {/* two-month calendar moved to second sheet */}
              <ModuleContainer>
                <TwoMonthCal startDate={moduleStartDate} />
              </ModuleContainer>
            </Sheet>
          </PrintArea>
        </PrintAreaWrapper>
      </Layout>
    </Container>
  );
}
