import { StrictMode } from 'react';
// import './index.css';
import App from "./components/App";
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = createRoot(document.getElementById('root'));


root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
