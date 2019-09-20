import React from "react";
import styled from "styled-components";
import CenteredContainer from "../components/CenteredContainer";
import Heading from "../components/Heading";
import { MY_ADDRESS } from "../util/constants";
import API from "../util/API";

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

export default function Balance() {
  const [balance, setBalance] = React.useState(null);

  React.useEffect(() => {
  API.connect()
    .then(() => {
      console.log(`Getting account info for ${MY_ADDRESS}`);
      return API.getAccountInfo(MY_ADDRESS);
    })
    .then(info => {
      console.info(info);
      setBalance(info.xrpBalance);
    })
    .catch(console.error);

  return () => {
    API.disconnect();
  };
}, []);


  return (
    <CenteredContainer>
      {!balance && <p>Loading...</p>}
      {balance && (
        <>
          <Heading>Your Balance</Heading>
          <Amount>
            {balance} <span>XRP</span>
          </Amount>
          <Address>
            Address: <span>rJvNPPw1ew9Ph1evJ86g8Nrp3rqyHHnvQL</span>
          </Address>
        </>
      )}
    </CenteredContainer>
  );
}
