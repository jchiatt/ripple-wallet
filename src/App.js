import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Balance from "./pages/Balance";
import Send from "./pages/Send";

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
  const [currentPage, setCurrentPage] = React.useState("balance");

  return (
    <AppContainer>
      <Header />
      <Nav currentPage={currentPage} changePage={setCurrentPage} />
      <Inner>
        {currentPage === "balance" && (
          <Balance />
        )}
        {currentPage === "send" && (
          <Send />
        )}
      </Inner>
    </AppContainer>
  );
}

export default App;
