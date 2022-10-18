import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  --primary: #6996DB;
  --primary-gradient: linear-gradient(180deg, #6996DB 0%, #4E87DD 100%);
  --secondary: #1D1D1D;
  --secondary-gradient: linear-gradient(180deg, #2D2D2D 0%, #1D1D1D 100%);
  --white: #FAFAFA;
  --white-07: rgba(250, 250, 250, 0.7);
  --white-05: rgba(250, 250, 250, 0.5);
  --gray: #D7D7D7;
  --card-bg: #26282D;
  --main-bg: #111111;
  --overlap-bg: linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, #111111 100%);
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

/* icons */
@font-face {
  font-family: 'icomoon';
  src:  url('/fonts/icons/icomoon.eot?ahq17d');
  src:  url('/fonts/icons/icomoon.eot?ahq17d#iefix') format('embedded-opentype'),
    url('/fonts/icons/icomoon.ttf?ahq17d') format('truetype'),
    url('/fonts/icons/icomoon.woff?ahq17d') format('woff'),
    url('/fonts/icons/icomoon.svg?ahq17d#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^="icon-"],
[class*=" icon-"] {
  display: inline-block;
  width: 24px;
  height: 24px;

  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: "icomoon" !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &:before {
    display: block;
    width: 24px;
    height: 24px;
    font-size: 1.5rem;
  }
}

.icon-check:before {
  content: "\\e900";
}
.icon-chevron-down:before {
  content: "\\e901";
}
.icon-chevron-left:before {
  content: "\\e902";
}
.icon-chevron-right:before {
  content: "\\e903";
}
.icon-chevron-up:before {
  content: "\\e904";
}
.icon-cross:before {
  content: "\\e905";
}
.icon-delete:before {
  content: "\\e906";
}
.icon-drag:before {
  content: "\\e907";
}
.icon-edit:before {
  content: "\\e908";
}
.icon-email:before {
  content: "\\e909";
}
.icon-google:before {
  content: "\\e90a";
}
.icon-list:before {
  content: "\\e90b";
}
.icon-lock:before {
  content: "\\e90c";
}
.icon-logo:before {
  content: "\\e90d";
}
.icon-logout:before {
  content: "\\e90e";
}
.icon-minus:before {
  content: "\\e90f";
}
.icon-plus:before {
  content: "\\e910";
}
.icon-reset:before {
  content: "\\e911";
}
.icon-settings:before {
  content: "\\e912";
}
.icon-user:before {
  content: "\\e913";
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
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
a {
  text-decoration: none;
  color: var(--white);
}
`;

export default GlobalStyle;
