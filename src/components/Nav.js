import React from "react";
import styled from "styled-components";

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

/** 
 * This is an extremely naive router implementation. Not for production use. 
 * Not accessible or semantic. Does not actually push into history. 
 * Would use a more standard solution in a real application.
*/
const Link = styled.li`
  ${props => (props.active ? "color: var(--black);" : null)}

  &:hover {
    cursor: pointer;
    color: var(--darkBlue);
  }
`;

export default function Nav({ currentPage, changePage }) {
  return (
    <StyledNav>
      <ul>
        <Link active={currentPage === "balance"} onClick={() => changePage("balance")}>View Balance</Link>
        <Link active={currentPage === "send"} onClick={() => changePage("send")}>Send Funds</Link>
      </ul>
    </StyledNav>
  );
}
