/* theme.ts */
import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        scrollBehavior: "smooth", // Enables smooth scrolling globally
      },
    },
  },
  colors,
});
