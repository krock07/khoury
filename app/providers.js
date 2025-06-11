// app/providers.js
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../src/styles/theme";

export function Providers({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
