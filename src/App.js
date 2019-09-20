import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Balance from "./pages/Balance";

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
  return (
    <AppContainer>
      <Header />
      <Nav />
      <Inner>
        <Balance />
      </Inner>
    </AppContainer>
  );
}

export default App;
