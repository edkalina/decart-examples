import React from "react";
import styled from "styled-components";
import { createComponent, renderIf } from "../decart-react";

import loadingSim from "../helpers/loadingSim";
import Loading from "../helpers/LoadingCounter";

export default createComponent(
  {
    query: loadingSim(),
    ...renderIf(({ query }) => query.loading, Loading)
  },
  ({ query }) => (
    <div>
      <button onClick={query.startLoading}>Start loading</button>
    </div>
  )
);

const Container = styled.div`
  text-align: left;
  width: 280px;
  margin: 0 auto;
`;
