import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Nav from './components/Nav';

const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--blue);
  color: white;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <Nav />
      <p>Hi hello</p>
    </AppContainer>
  );
}

export default App;
