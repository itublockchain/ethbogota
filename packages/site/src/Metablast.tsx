import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from 'hooks/useTheme';
import { useStyling } from 'hooks/useStyling';
import { MetaMaskProvider } from 'context';
import { Footer, Header } from './components';
import { light, dark, GlobalStyle } from './config/theme';
import { SnapshotPage } from './pages';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
`;

function Metablast() {
  const { theme, toggleTheme } = useTheme();
  useStyling();

  return (
    <ThemeProvider theme={theme === 'dark' ? dark : light}>
      <MetaMaskProvider>
        <GlobalStyle />
        <Wrapper>
          <Header handleToggleClick={toggleTheme} />
          <SnapshotPage />
          <Footer />
        </Wrapper>
      </MetaMaskProvider>
    </ThemeProvider>
  );
}

export default Metablast;
