import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #121212;
    color: #f5f5f5;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #f9f871;
  }

  a {
    color: inherit;
  }
`;

export default GlobalStyles;
