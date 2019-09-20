import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  height: 60px;
  background: white;
  color: var(--black);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export default function Header() {
  return (
    <StyledHeader>
      <h1>XRP Wallet</h1>
    </StyledHeader>
  );
}
