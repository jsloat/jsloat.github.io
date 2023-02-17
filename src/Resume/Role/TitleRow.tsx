import React from "react";
import { SLATE_600 } from "src/consts";
import styled from "styled-components/macro";
import { RoleObject } from "../types";
import mapPin from "../../assets/mapPin.svg";

type TitleRowProps = Pick<
  RoleObject,
  "title" | "locationStr" | "start" | "end"
>;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Title = ({ title }: TitleRowProps) => <h3>{title}</h3>;

const LocationContainer = styled(FlexDiv)`
  color: ${SLATE_600};
  gap: 3px;
  img {
    height: 1em;
    filter: invert(28%) sepia(38%) saturate(359%) hue-rotate(176deg)
      brightness(98%) contrast(85%);
  }
`;
const Location = ({ locationStr }: TitleRowProps) => (
  <LocationContainer>
    <img src={mapPin} />
    <span>{locationStr}</span>
  </LocationContainer>
);

const DateRangeContainer = styled(FlexDiv)`
  color: ${SLATE_600};
`;
const DateRange = ({ start, end }: TitleRowProps) => (
  <DateRangeContainer>
    {start} – {end}
  </DateRangeContainer>
);

const WhenWhere = styled(FlexDiv)`
  gap: 10px;
  margin-top: 0.35em;
  height: 1em;
  line-height: 1em;
`;

//

const TitleRow = (props: TitleRowProps) => (
  <div>
    <Title {...props} />
    <WhenWhere>
      <DateRange {...props} />
      <Location {...props} />
    </WhenWhere>
  </div>
);

export default TitleRow;
