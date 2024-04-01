import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  /* color */
  --color-main: #76dd4e;
  --color-black: #222;
  --color-white: #fff;
  --color-warning: #ff9191;
  --color-grey: #d9d9d9;
}
  body {
    background-color: #fff;
    margin: 0 auto;
  }

`;
export default GlobalStyles;
