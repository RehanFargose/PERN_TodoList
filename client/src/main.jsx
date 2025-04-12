import { StrictMode } from 'react';
import App from "./components/App";
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// Create root element to denote start of react component tree
const root = createRoot(document.getElementById('root'));

// Use strictmode to better catch errors during development
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
