"use client";

import { Box, Button, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";

const AIButtonWrapper = () => {
  return (
    <Box position="absolute" right={3} top={4}>
      <AIButton />
    </Box>
  );
};

const AIButton = () => {
  return (
    <Button
      position="relative"
      zIndex={1}
      px={4}
      py={2}
      fontWeight="medium"
      color="white"
      borderRadius="md"
      overflow="hidden"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
      _active={{ transform: "scale(0.95)" }}
    >
      <Link href="#contact">
        <Box as="span" position="relative" zIndex={10}>
          Start Now
        </Box>
      </Link>
      <motion.div
        initial={{ left: 0 }}
        animate={{ left: "-300%" }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 4,
          ease: "linear",
        }}
        style={{
          background:
            "linear-gradient(to right, #b3ebd5, #80ddb9, #4dcf9e, #26c285, #00ac69, #008f54, #007242)",
          position: "absolute",
          inset: 0,
          zIndex: 0,
          width: "400%",
        }}
      ></motion.div>
    </Button>
  );
};

export default AIButtonWrapper;
