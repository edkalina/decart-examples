import React from "react";
import styled from "styled-components";
import { createComponent, stateValue } from "../decart-react";

export default createComponent(
  {
    menu: stateValue(
      // initial state
      { opened: false },
      // handlers for state
      {
        open: () => () => ({ opened: true }),
        close: () => () => ({ opened: false }),
        toggle: ({ opened }) => () => ({ opened: !opened })
      }
    )
  },
  // your function will get all props + values defined above
  ({ menu }) => (
    <div>
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
