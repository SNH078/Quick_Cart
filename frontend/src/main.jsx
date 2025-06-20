// import React from "react";
import { ChakraProvider} from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";


createRoot(document.getElementById("root")).render(
    <BrowserRouter>
  <StrictMode>
    <ChakraProvider >
      <App />
    </ChakraProvider>
  </StrictMode>
    </BrowserRouter>
);

