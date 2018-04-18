import React from "react";
// import styled from "styled-components";
import { createComponent, handler } from "../decart-react";

export default createComponent(
  {
    onClick: handler(vals => e => {
      alert("Button clicked");
    })
  },
  ({ onClick }) => (
    <div>
      <button onClick={onClick}>Click Me!</button>
    </div>
  )
);
