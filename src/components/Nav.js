import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.nav`
  background: var(--lightBlue);
  color: white;

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 660px;
    margin: 0 auto;
    padding: 1rem 2rem;
    font-weight: bold;
    list-style: none;
  }
`;

export default function Nav() {
  return (
    <StyledNav>
      <ul>
        <li>View Balance</li>
        <li>Send Funds</li>
      </ul>
    </StyledNav>
  )
}