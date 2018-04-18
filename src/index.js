import React from 'react';
import styled from 'styled-components';
import { render } from 'react-dom';
import { createComponent, stateValue, value } from './decart-react';
import Chooser from './Chooser';
import Examples from './Examples';

const getExampleState = index => ({
  index,
  ...Examples[index],
});

const App = createComponent(
  {
    example: stateValue(getExampleState(0), {
      setActive: () => index => getExampleState(index),
      goToNext: ({ index }) => () => getExampleState(index + 1),
      goToPrev: ({ index }) => () => getExampleState(index - 1),
    }),
  },
  ({ example }) => (
    <Container>
      <h1>Decart Component Examples</h1>
      <Chooser active={example.index} count={Examples.length - 1} onChoose={example.setActive} />
      <Head>
        <PrevButton onClick={example.goToPrev} disabled={example.index === 0}>
          &lt; Prev
        </PrevButton>
        <NextButton onClick={example.goToNext} disabled={example.index === Examples.length - 1}>
          Next &gt;
        </NextButton>
        <h3>
          {example.index}. {example.title}
        </h3>
      </Head>
      <example.Component {...example.props} />
      {example.screen && (
        <Screenshot>
          <img src={example.screen} />
        </Screenshot>
      )}
    </Container>
  ),
);

const Container = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

const Head = styled.div``;

const PrevButton = styled.button`
  border: 0 none;
  outline: 0 none;
  background: none;
  cursor: pointer;
  color: #232;

  float: left;

  &:disabled {
    cursor: default;
    color: #abc;
  }
`;

const NextButton = PrevButton.extend`
  float: right;
`;

const Screenshot = styled.div`
  margin-top: 10px;

  img {
    width: 810px;
  }
`

render(<App />, document.getElementById('root'));
