import React from "react";
import { colors } from "src/consts";
import styled from "styled-components/macro";
import { RoleObject } from "../types";
import mapPin from "../../assets/mapPin.svg";
import { WithExternalUrlIcon } from "../atoms";

type TitleRowProps = Pick<
  RoleObject,
  "title" | "locationStr" | "start" | "end" | "titleHref"
>;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Title = ({ title, titleHref }: TitleRowProps) =>
  titleHref ? (
    <WithExternalUrlIcon href={titleHref}>
      <h3>{title}</h3>
    </WithExternalUrlIcon>
  ) : (
    <h3>{title}</h3>
  );

const LocationContainer = styled(FlexDiv)`
  color: ${colors.slate[600]};
  gap: 3px;
  img {
    height: 1em;
    filter: invert(28%) sepia(38%) saturate(359%) hue-rotate(176deg)
      brightness(98%) contrast(85%);
  }
`;
const Location = ({ locationStr }: TitleRowProps) => (
  <LocationContainer>
    <img src={mapPin} alt="Map pin icon" />
    <span>{locationStr}</span>
  </LocationContainer>
);

const DateRangeContainer = styled(FlexDiv)`
  color: ${colors.slate[600]};
`;
const DateRange = ({ start, end }: TitleRowProps) => (
  <DateRangeContainer>
    {start} – {end}
  </DateRangeContainer>
);

const WhenWhere = styled(FlexDiv)`
  gap: 10px;
  flex-wrap: wrap;
  row-gap: 0;
`;

//

const TitleRow = (props: TitleRowProps) => (
  <div>
    <Title {...props} />
    {props.start && props.locationStr && (
      <WhenWhere>
        <DateRange {...props} />
        <Location {...props} />
      </WhenWhere>
    )}
  </div>
);

export default TitleRow;
