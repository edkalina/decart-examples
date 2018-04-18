import React from "react";
import { createComponent, handler } from "../decart-react";

export default createComponent(
  {
    // it is very similar to recompose/withHandlers
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
