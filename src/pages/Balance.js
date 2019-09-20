import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
`;

const Heading = styled.h2`
  margin: 0;
`

const Amount = styled.h3`
  margin: 0;
  font-size: 2rem;
  text-align: center;

  span {
    font-size: 1rem;
  }
`;

const Address = styled.p`
  margin: 2rem 0 0;
  font-weight: bold;

  span {
    font-size: 0.875rem;
    font-weight: normal;
  }
`;

export default function Balance({ balance }) {
  return (
    <Container>
      <Heading>Your Balance</Heading>
      <Amount>
        {balance} <span>XRP</span>
      </Amount>
      <Address>
        Address: <span>rJvNPPw1ew9Ph1evJ86g8Nrp3rqyHHnvQL</span>
      </Address>
    </Container>
  );
}
