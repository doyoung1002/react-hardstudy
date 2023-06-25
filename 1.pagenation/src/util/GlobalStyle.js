import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  body {
    background-color: #070707;
    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
    color: #eee;
    font-size: 1vw;
    line-height: 1.6;
    letter-spacing: 0em;
    min-height: 100%;
  }

  .img{
    max-width: 100%;
    vertical-align: middle;
    display: inline-block;
  }
`;

export default GlobalStyle;