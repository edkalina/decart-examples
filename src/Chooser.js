import React from "react";
import styled from "styled-components";
import range from "lodash.range";

import { createComponent, handler } from "./decart-react";

const StyledButton = styled.button`
  cursor pointer;
  border: 1px solid #888;
  padding: 5px 10px;
  background-color: ${props => props.active ? '#ae9' : '#fec'};
  margin: 0 7px;
  outline: none;
`;

const Button = createComponent(
  {
    onClick: handler(({ num, onChoose }) => () => onChoose(num))
  },
  ({ num, active, onClick }) => (
    <StyledButton active={active} onClick={onClick}>
      {num}
    </StyledButton>
  )
);

export default ({ active, count, onChoose }) => (
  <div>
    {range(1, count + 1).map(num => (
      <Button active={active === num} num={num} onChoose={onChoose} />
    ))}
  </div>
);
