import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Snowfall from "react-snowfall";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
html, body {
    min-height: 100%;
    margin: 0;
    padding: 0;
}

body {
	line-height: 1;
  background-image: linear-gradient(to left, #1a1f23, #242b31, #2e373f, #38434e, #43505d);  
  color: white;
	font-family: "Outfit", sans-serif;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a {
	color: inherit;
	text-decoration: none;
}
`;

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Snowfall
            style={{
              position: "fixed",
              width: "100vw",
              height: "100vh",
            }}
          />
          <GlobalStyle />
          <App />
        </HelmetProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </BrowserRouter>
);
