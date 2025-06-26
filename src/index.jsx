import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./i18n"; // Import i18n configuration
import "./styles/tailwind.css";
import "./styles/index.css";
import React, { Suspense } from "react"; // Import Suspense

const container = document.getElementById("root");
const root = createRoot(container);

// Basic loading fallback UI
const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    Loading...
  </div>
);

root.render(
  <Suspense fallback={<LoadingFallback />}>
    <App />
  </Suspense>
);
