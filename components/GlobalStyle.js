import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --text-primary: #0c2c4d;
    --background-primary: #edf0f5;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Noto Sans', sans-serif;
    background-color: var(--background-primary)
  }
`;

export default GlobalStyle;
