import React from 'react';
import styled from 'styled-components';
import { createComponent, renderIf } from '../decart-react';

import loadingSim from '../helpers/loadingSim';
import Loading from '../helpers/LoadingCounter';

export default createComponent(
  {
    // query simulator
    query: loadingSim(),
    // conditional rendering
    ...renderIf(
      // test function that should return boolean
      ({ query }) => query.loading,
      // function to call if test function returned true;
      // it will be called as Loading(vals, next),
      // so functional components can be passed as is
      Loading,
    ),
  },
  ({ query }) => (
    <div>
      <button onClick={query.startLoading}>Start loading</button>
    </div>
  ),
);

const Container = styled.div`
  text-align: left;
  width: 280px;
  margin: 0 auto;
`;
