"use client";

import { useRef, useState } from "react";
import { FiLock } from "react-icons/fi";
import { Box, Flex, Text } from "@chakra-ui/react";
import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

const TARGET_TEXT = "Unlock the code";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

const MotionButton = chakra(motion.button, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export const EncryptButton = () => {
  const intervalRef = useRef(null);
  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setText(TARGET_TEXT);
  };

  return (
    <MotionButton
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      position="relative"
      overflow="hidden"
      rounded="lg"
      border="1px solid"
      // borderColor="neutral.500"
      // bg="neutral.700"
      borderColor="white"
      bg="white"
      px={4}
      py={2}
      fontFamily="mono"
      fontWeight="medium"
      textTransform="uppercase"
      color="black"
      _hover={{ color: "indigo.300" }}
    >
      <Flex align="center" gap={2} zIndex={10}>
        <FiLock />
        <Text as="span">{text}</Text>
      </Flex>
      <Box
        as={motion.div}
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        position="absolute"
        inset={0}
        zIndex={0}
        transform="scale(1.25)"
        bgGradient="linear(to-t, indigo.400 40%, indigo.400/100 50%, indigo.400 60%)"
        opacity={0}
        _groupHover={{ opacity: 1 }}
      />
    </MotionButton>
  );
};
