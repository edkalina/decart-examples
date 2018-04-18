import React from "react";
import styled from "styled-components";
import { createComponent } from "../decart-react";

export default createComponent(
  {
    global: reduxValue(state => ({
      counter: state.counter
    })),
    actions: reduxActions(dispatch => ({
      onIncrement: () => dispatch(incrementAction()),
      onDecrement: () => dispatch(decrementAction())
    }))
  },
  ({ global, actions }) => (
    <div>
      <button onClick={actions.onDecrement}>-</button>
      <button onClick={actions.onIncrement}>+</button>
      {global.counter}
    </div>
  )
);
