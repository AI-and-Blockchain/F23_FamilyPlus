import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { DAppProvider } from "@usedapp/core";

const root = document.getElementById("root");

if (root) {
  const rootInstance = createRoot(root);

  rootInstance.render(
    <React.StrictMode>
      {/* Wrap our app in the provider, config is required, but can be left as an empty object: */}
      <DAppProvider config={{}}>
        <App />
      </DAppProvider>
    </React.StrictMode>
  );
}
