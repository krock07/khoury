"use client";

import React, { useEffect, useRef } from "react";
import { Box, Text } from "@chakra-ui/react";

export const ScreenFitText = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const resizeText = () => {
      const container = containerRef.current;
      const textElement = textRef.current;

      if (!container || !textElement) {
        return;
      }

      const containerWidth = container.offsetWidth;

      // Start with a percentage-based font size, relative to the container's width
      let fontSize = containerWidth * 0.08; // Start with 10% of the container's width

      textElement.style.fontSize = `${fontSize}px`;

      // Reduce font size until the text fits within the container
      while (textElement.offsetWidth > containerWidth && fontSize > 1) {
        fontSize -= 1;
        textElement.style.fontSize = `${fontSize}px`;
      }
    };

    resizeText();
    window.addEventListener("resize", resizeText);

    return () => {
      window.removeEventListener("resize", resizeText);
    };
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="20vh"
      w="100%"
      overflow="hidden"
      bg="#171717"
      ref={containerRef}
      position="relative"
    >
      <Text
        as="span"
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        mx="auto"
        whiteSpace="nowrap"
        textAlign="center"
        fontWeight="bold"
        textTransform="uppercase"
        color="transparent" // Set text fill color to transparent
        sx={{
          WebkitTextStroke: "2px #00ac69", // Outline the text with white color
          WebkitTextFillColor: "transparent", // Ensure text fill is transparent
        }}
        ref={textRef}
      >
        It&apos;s Deeper than code
      </Text>
    </Box>
  );
};
