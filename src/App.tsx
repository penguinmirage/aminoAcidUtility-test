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
  background: linear-gradient(
    rgba(0, 0, 0, 0.3), 
    rgba(0, 0, 0, 0.3)
  ),
  url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%23487c5c;stop-opacity:1" /><stop offset="50%" style="stop-color:%236b8e5a;stop-opacity:1" /><stop offset="100%" style="stop-color:%23a4c68a;stop-opacity:1" /></linearGradient><linearGradient id="treeGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%232c4c34;stop-opacity:1" /><stop offset="100%" style="stop-color:%23436b4a;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23skyGrad)"/><g opacity="0.9"><ellipse cx="150" cy="500" rx="80" ry="280" fill="url(%23treeGrad)"/><ellipse cx="320" cy="480" rx="90" ry="300" fill="url(%23treeGrad)"/><ellipse cx="500" cy="520" rx="75" ry="260" fill="url(%23treeGrad)"/><ellipse cx="680" cy="490" rx="85" ry="290" fill="url(%23treeGrad)"/><ellipse cx="850" cy="510" rx="70" ry="270" fill="url(%23treeGrad)"/><ellipse cx="1000" cy="480" rx="80" ry="300" fill="url(%23treeGrad)"/></g><g opacity="0.7"><ellipse cx="200" cy="520" rx="60" ry="240" fill="%23315438"/><ellipse cx="400" cy="500" rx="65" ry="250" fill="%23315438"/><ellipse cx="600" cy="530" rx="55" ry="220" fill="%23315438"/><ellipse cx="800" cy="505" rx="60" ry="245" fill="%23315438"/><ellipse cx="950" cy="515" rx="50" ry="235" fill="%23315438"/></g><g opacity="0.3"><circle cx="200" cy="200" r="1.5" fill="%23a8d8ff"><animate attributeName="cy" values="200;600;200" dur="3s" repeatCount="indefinite"/></circle><circle cx="400" cy="150" r="1" fill="%23a8d8ff"><animate attributeName="cy" values="150;550;150" dur="2.5s" repeatCount="indefinite"/></circle><circle cx="600" cy="180" r="1.5" fill="%23a8d8ff"><animate attributeName="cy" values="180;580;180" dur="3.2s" repeatCount="indefinite"/></circle><circle cx="800" cy="160" r="1" fill="%23a8d8ff"><animate attributeName="cy" values="160;560;160" dur="2.8s" repeatCount="indefinite"/></circle><circle cx="300" cy="220" r="1" fill="%23a8d8ff"><animate attributeName="cy" values="220;620;220" dur="3.5s" repeatCount="indefinite"/></circle><circle cx="500" cy="140" r="1.5" fill="%23a8d8ff"><animate attributeName="cy" values="140;540;140" dur="2.3s" repeatCount="indefinite"/></circle><circle cx="700" cy="200" r="1" fill="%23a8d8ff"><animate attributeName="cy" values="200;600;200" dur="3.1s" repeatCount="indefinite"/></circle><circle cx="900" cy="170" r="1.5" fill="%23a8d8ff"><animate attributeName="cy" values="170;570;170" dur="2.7s" repeatCount="indefinite"/></circle><circle cx="100" cy="190" r="1" fill="%23a8d8ff"><animate attributeName="cy" values="190;590;190" dur="3.4s" repeatCount="indefinite"/></circle><circle cx="1100" cy="160" r="1" fill="%23a8d8ff"><animate attributeName="cy" values="160;560;160" dur="2.9s" repeatCount="indefinite"/></circle></g></svg>');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
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
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 480px) {
    padding: 15px 10px;
    font-size: 11px;
  }
`;

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        <ContentWrapper>
          <div className="App">
            <SequenceAlignment />
          </div>
        </ContentWrapper>
        <Footer>
          penguinmirage Web Development. 2025 Exclusively for BIOCAD
        </Footer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;