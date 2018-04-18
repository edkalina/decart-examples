import React from "react";
import styled from "styled-components";
import { createComponent, stateValue } from "../decart-react";

const openable = () =>
  stateValue(
    { opened: false },
    {
      open: () => () => ({ opened: true }),
      close: () => () => ({ opened: false }),
      toggle: ({ opened }) => () => ({ opened: !opened })
    }
  );

export default createComponent(
  {
    menu: openable(),
    hint: openable()
  },
  ({ menu, hint }) => (
    <div>
      <HintContainer>
        <div>
          <button onClick={hint.toggle}>Click Me!</button>
        </div>
        {hint.opened && (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            vehicula commodo leo, eget auctor felis ullamcorper finibus. Vivamus
            consectetur sapien est, sit amet mollis libero tempor sed. Sed orci
            libero, cursus in dictum sed, congue ut orci. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia Curae;
            Nullam leo urna, congue nec convallis id, finibus ut augue. Duis
            ante tortor, interdum vitae lorem sit amet, facilisis accumsan
            nulla. Phasellus sed erat non tortor accumsan congue. Vestibulum
            venenatis arcu sit amet sollicitudin dictum. Nulla ultrices sit amet
            tortor nec lobortis.
          </p>
        )}
      </HintContainer>
      <div>
        <button onClick={menu.open}>Open Menu</button>
        <button onClick={menu.close}>Close Menu</button>
        <button onClick={menu.toggle}>Toggle Menu</button>
      </div>
      {menu.opened && (
        <Menu>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </Menu>
      )}
    </div>
  )
);

const Menu = styled.div`
  max-width: 100px;
  border: 1px solid #678;
  border-radius: 3px;
  margin: 20px auto;
  overflow: hidden;
`;

const Item = styled.button`
  display: block;
  width: 100%;
  background: none;
  border: 0 none;
  outline: 0 none;
  cursor: pointer;
  padding: 5px;

  &:hover {
    background-color: #eee;
  }
`;

const HintContainer = styled.div`
  border: 1px dashed #abc;
  padding: 10px;
  margin-bottom: 20px;
`;
