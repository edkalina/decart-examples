import React from 'react';
import styled from 'styled-components';

export default () => (
  <Container>
    <p>
      <b>Decart Components</b> - alternative api to declare <em>React</em> components.
    </p>
    <p>
      The key features are:
      <ul>
        <li>explicit</li>
        <li>reusability</li>
        <li>performance</li>
      </ul>
    </p>
    <p>
      It is inspired by HOC and old react's mixins. But tries to avoid all problems of both
      patterns. Also either functional component or class component will be created depending on
      extensions you have used.
    </p>
    <p>Check examples</p>
  </Container>
);

const Container = styled.div`
  max-width: 420px;
  border: 1px solid #ddd;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
`;
