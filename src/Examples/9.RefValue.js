import React from "react";
import { createComponent, refValue, handler } from "../decart-react";

export default createComponent(
  {
    // it uses React.createRef() so api is the same
    input: refValue(),
    onClick: handler(({ input }) => () => {
      input.current.focus();
    })
  },
  ({ input, onClick }) => (
    <div>
      <input ref={input} />
      <button onClick={onClick}>Focus input</button>
    </div>
  )
);
