import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import MonthlyLog from "./modules/MonthlyLog";
import GraphPaperNotes from "./modules/GraphPaperNotes";

export default function PocketCal() {
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  return (
    <Container>
      <GlobalPrintStyles />

      <Layout>
        <SettingsBar>
          <Label>Start date for modules</Label>
          <DateInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </SettingsBar>

        <PrintAreaWrapper>
          <PrintArea>
            <Sheet>
              <ContentRow>
                <Half>
                  <MonthlyLog startDate={startDate} />
                </Half>

                <Half>
                  <GraphPaperNotes />
                </Half>
              </ContentRow>
            </Sheet>

            <Sheet>HELLO WORLD</Sheet>
          </PrintArea>
        </PrintAreaWrapper>
      </Layout>
    </Container>
  );
}

const mm = (v: number) => `${v}mm`;

const SHEET_WIDTH_MM = 215.9;
const SHEET_HEIGHT_MM = 279.4;
const SHEET_PADDING_MM = 2;

const GlobalPrintStyles = createGlobalStyle`
  #print-area { display: flex; gap: 20px; flex-wrap: wrap; }

  @media print {
    @page { size: letter; margin: 0; }
    body { zoom: 150%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

    // Hide everything except the print area
    body * { visibility: hidden; }
    #print-area, #print-area * { visibility: visible; }
    #print-area { position: absolute; left: 0; top: 0; gap: 0; }

    // Ensure each sheet prints as its own page
    .sheet { page-break-after: always; box-shadow: none; }

    // Ensure backgrounds print as white and avoid color/antialias gaps
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

const SettingsBar = styled.div`
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

const Sheet = styled.div.attrs({ className: "sheet" })`
  width: ${mm(SHEET_WIDTH_MM)};
  height: ${mm(SHEET_HEIGHT_MM)};
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
