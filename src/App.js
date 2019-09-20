import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Balance from "./pages/Balance";
import Send from "./pages/Send";
import { MY_ADDRESS } from './util/constants';
import API from "./util/API";

const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--blue);
  color: white;
`;

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
`;

function App() {
  const [balance, setBalance] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState("balance");

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
    }
  }, []);

  return (
    <AppContainer>
      <Header />
      <Nav currentPage={currentPage} changePage={setCurrentPage} />
      <Inner>
        {currentPage === "balance" && (
          <>
            {!balance && <p>Loading...</p>}
            {balance && <Balance balance={balance} />}
          </>
        )}
        {currentPage === "send" && (
          <Send />
        )}
      </Inner>
    </AppContainer>
  );
}

export default App;
