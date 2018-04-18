import React from 'react';
import { createComponent, value, stateValue } from '../decart-react';

export default createComponent(
  {
    radius: stateValue(
      // initial value
      { value: 5 },
      // handlers
      {
        onChange: () => e => ({ value: e.target.value }),
      },
    ),
    // calculable value
    circleArea: value(({ radius }) => Math.PI * radius.value * radius.value),
  },
  ({ radius, circleArea }) => (
    <div>
      <input type="range" min="1" max="20" {...radius} />
      <div>r = {radius.value}</div>
      <div>
        π r<sup>2</sup> = {circleArea}
      </div>
    </div>
  ),
);
