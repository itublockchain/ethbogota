import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { FakeButton, Footer, Header, Home } from './components';
import { MetaMaskProvider } from './hooks';

import { light, dark, GlobalStyle } from './config/theme';
import { setLocalStorage, getThemePreference } from './utils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
`;
/* eslint-disable */
function Metablast() {
  const [darkTheme, setDarkTheme] = useState(getThemePreference());

  const toggleTheme = () => {
    setLocalStorage('theme', darkTheme ? 'light' : 'dark');
    setDarkTheme(!darkTheme);
  };

  return (
    <ThemeProvider theme={darkTheme ? dark : light}>
      <MetaMaskProvider>
        <GlobalStyle />
        <Wrapper>
          <Header handleToggleClick={toggleTheme} />
          <FakeButton />
          <Home />
          <Footer />
        </Wrapper>
      </MetaMaskProvider>
    </ThemeProvider>
  );
}

export default Metablast;
