import React from "react";
import styled from "styled-components";
import { createComponent } from "../decart-react";

export default createComponent(() => (
  <div>
    <p>
      Simple component wrapped with <em>createComponent</em>.
    </p>
    <p>
      In this case <em>createComponent</em> just returns function that
      you&#39;ve passed to it
    </p>
  </div>
));
