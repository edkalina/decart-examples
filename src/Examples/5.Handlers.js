import React from "react";
// import styled from "styled-components";
import { createComponent, handlers } from "../decart-react";

export default createComponent(
  {
    ...handlers({
      onFirstClick: vals => e => {
        alert("First button clicked");
      },
      onSecondClick: vals => e => {
        alert("Second button clicked");
      }
    })
  },
  ({ onFirstClick, onSecondClick }) => (
    <div>
      <button onClick={onFirstClick}>First Button</button>
      <button onClick={onSecondClick}>Second Button</button>
    </div>
  )
);
