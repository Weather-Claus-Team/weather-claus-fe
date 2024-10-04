import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider, queryClient } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

const queryClient = new queryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
