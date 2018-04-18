import React from "react";
import styled from 'styled-components';
import { createComponent } from "../decart-react";

export default createComponent(() => (
  <Container>
    <p><b>createComponent</b> is used to declare your components.</p>
    <p>
      In this example you can see simple functional component
      wrapped with <b>createComponent</b>.
    </p>
    <p>
      In this case <b>createComponent</b> just returns function that
      you&#39;ve passed to it.
    </p>
    <p>
      But before function you can specify extension object
      that will change behavior of your component.
      Check next examples.
    </p>
  </Container>
));

const Container = styled.div`
  max-width: 420px;
  border: 1px solid #ddd;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
`;
