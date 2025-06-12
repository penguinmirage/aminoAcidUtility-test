import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import styled from 'styled-components';
import SequenceAlignment from './components/SequenceAlignment';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const AppContainer = styled.div`
  min-height: 100vh;
  background:
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('https://wallpaperaccess.com/full/3312124.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background:
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('https://wallpaperaccess.com/full/3312124.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 40px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 30px 15px;
  }

  @media (max-width: 480px) {
    padding: 25px 10px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const MainContent = styled.main`
  background:
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('https://wallpaperaccess.com/full/3312124.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Footer = styled.footer`
  margin-top: auto;
  text-align: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  font-size: 12px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 480px) {
    padding: 15px 10px;
    font-size: 11px;
  }
`;

const App = (): React.JSX.Element => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppContainer>
      <Header>
        <HeaderTitle>BIOCAD Sequence Alignment</HeaderTitle>
      </Header>
      <MainContent>
        <ContentWrapper>
          <div className='App'>
            <SequenceAlignment />
          </div>
        </ContentWrapper>
      </MainContent>
      <Footer>
        penguinmirage Web Development. 2025 Exclusively for BIOCAD
      </Footer>
    </AppContainer>
  </ThemeProvider>
);

export default App;
