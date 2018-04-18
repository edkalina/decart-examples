import React from "react";
import styled from "styled-components";
import { createComponent, values, stateValue } from "../decart-react";

export default createComponent(
  {
    degrees: stateValue(
      { value: 90 },
      {
        onChange: () => e => ({ value: e.target.value })
      }
    ),
    // you can group values too
    ...values({
      rads: ({ degrees }) => degrees.value * Math.PI / 180,
      gons: ({ degrees }) => degrees.value * 10 / 9,
      turns: ({ degrees }) => degrees.value / 360
    })
  },
  ({ degrees, rads, gons, turns }) => (
    <div>
      <input type="range" min="0" max="360" {...degrees} />
      <Container>
        <div>
          {degrees.value}° = {rads} rads
        </div>
        <div>
          {degrees.value}° = {gons} ᵍ
        </div>
        <div>
          {degrees.value}° = {turns} turns
        </div>
      </Container>
    </div>
  )
);

const Container = styled.div`
  text-align: left;
  width: 280px;
  margin: 0 auto;
`;
