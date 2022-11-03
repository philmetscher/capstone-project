import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  --primary: #6996DB;
  --primary-gradient: linear-gradient(180deg, #6996DB 0%, #4E87DD 100%);
  --secondary: #1D1D1D;
  --secondary-gradient: linear-gradient(180deg, #2D2D2D 0%, #1D1D1D 100%);
  --secondary-05: rgba(17, 17, 17, 0.5);
  --white: #FAFAFA;
  --white-07: rgba(250, 250, 250, 0.7);
  --white-05: rgba(250, 250, 250, 0.5);
  --gray: #D7D7D7;
  --card-bg: #26282D;
  --main-bg: #111111;
  --overlap-bg: linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, #111111 100%);

  --error: #EE3232;
  --error-gradient: linear-gradient(180deg, #EE3232 0%, #b60f0f 100%);
}

/* open-sans-300 - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300;
  src: local(''),
      url('/fonts/open-sans/open-sans-v34-latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
      url('/fonts/open-sans/open-sans-v34-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-regular - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  src: local(''),
      url('/fonts/open-sans/open-sans-v34-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
      url('/fonts/open-sans/open-sans-v34-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-500 - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 500;
  src: local(''),
      url('/fonts/open-sans/open-sans-v34-latin-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
      url('/fonts/open-sans/open-sans-v34-latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-600 - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  src: local(''),
      url('/fonts/open-sans/open-sans-v34-latin-600.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
      url('/fonts/open-sans/open-sans-v34-latin-600.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-700 - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  src: local(''),
      url('/fonts/open-sans/open-sans-v34-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
      url('/fonts/open-sans/open-sans-v34-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-800 - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 800;
  src: local(''),
      url('/fonts/open-sans/open-sans-v34-latin-800.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
      url('/fonts/open-sans/open-sans-v34-latin-800.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-300italic - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 300;
  src: local(''),
      url('/fonts/open-sans/open-sans-v34-latin-300italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
      url('/fonts/open-sans/open-sans-v34-latin-300italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-italic - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 400;
  src: local(''),
      url('/fonts/open-sans/open-sans-v34-latin-italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
      url('/fonts/open-sans/open-sans-v34-latin-italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-500italic - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 500;
  src: local(''),
      url('/fonts/open-sans/open-sans-v34-latin-500italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
      url('/fonts/open-sans/open-sans-v34-latin-500italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-600italic - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 600;
  src: local(''),
      url('/fonts/open-sans/open-sans-v34-latin-600italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
      url('/fonts/open-sans/open-sans-v34-latin-600italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-700italic - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 700;
  src: local(''),
      url('/fonts/open-sans/open-sans-v34-latin-700italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
      url('/fonts/open-sans/open-sans-v34-latin-700italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-800italic - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 800;
  src: local(''),
      url('/fonts/open-sans/open-sans-v34-latin-800italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
      url('/fonts/open-sans/open-sans-v34-latin-800italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

*, *:after, *:before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: none;
}
html {
  font-size: 100%;
}
html, body, #__next {
  width: 100%;
  min-height: 100vh;
}
body {
  font-family: 'Open Sans', sans-serif;
  background-color: var(--main-bg);
  color: var(--white);
}
body, button, input {
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.6875rem;
}
*:after, *:before {
  line-height: 1.25rem;
}
a {
  text-decoration: none;
  color: var(--white);
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
`;

export default GlobalStyle;
