import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "../node_modules/animate.css/animate.min.css";
// Import our custom CSS
import "./normalize.css";
import "./index.css";
import "./loader.css";
import "./main.css";
import './templatemo-xtra-blog.css';
//import jsx files
import App from "./App.jsx";
// define base url for API requests
// const url_dev ="http://localhost:3000/";
// const url_pro ="http://localhost:3000/api/v1/";
// Create a new root instance
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);