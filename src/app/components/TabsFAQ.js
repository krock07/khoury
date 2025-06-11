"use client";

import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import useMeasure from "react-use-measure";

export const TabsFAQ = () => {
  const [selected, setSelected] = useState(TABS[0]);

  return (
    <Box
      id="faqs"
      as="section"
      bg="green.900"
      px={4}
      pb={6}
      color="white"
      overflow="hidden"
    >
      <HeadingComponent />
      <Tabs selected={selected} setSelected={setSelected} />
      <Questions selected={selected} />
    </Box>
  );
};

const HeadingComponent = () => {
  return (
    <Box textAlign="center" mb={8} position="relative" py={12}>
      <Text
        bgGradient="linear(to-r, green.500, green.500)"
        bgClip="text"
        fontWeight="medium"
        color="transparent"
      >
        {`Let's answer some questions`}
      </Text>
      <Heading size="2xl" fontWeight="bold" mt={4}>
        FAQs
      </Heading>

      {/* Decorative gradient background */}
      <Box
        position="absolute"
        top="-350px"
        left="50%"
        h="500px"
        w="600px"
        transform="translateX(-50%)"
        bgGradient="linear(to-r, green.500, green.500)"
        borderRadius="full"
        opacity={0.2}
        filter="auto"
        blur="62px"
      />
    </Box>
  );
};

const Tabs = ({ selected, setSelected }) => {
  return (
    <Flex wrap="wrap" justify="center" gap={4} mb={8}>
      {TABS.map((tab) => (
        <Button
          key={tab}
          onClick={() => setSelected(tab)}
          variant="outline"
          borderWidth="1px"
          size="sm"
          borderRadius="md"
          colorScheme={selected === tab ? "green" : "white"}
          position="relative"
          overflow="hidden"
          whiteSpace="no-wrap"
        >
          <Text zIndex="10" position="relative">
            {tab}
          </Text>
          <AnimatePresence>
            {selected === tab && (
              <motion.span
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                  // background: "linear-gradient(to right, #805AD5, #667EEA)",
                  background: "linear-gradient(to right, #68D391, #48BB78)", // Light green to darker green gradient
                }}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.5, ease: "backIn" }}
              />
            )}
          </AnimatePresence>
        </Button>
      ))}
    </Flex>
  );
};

const Questions = ({ selected }) => {
  return (
    <VStack spacing={8} align="stretch" maxW="3xl" mx="auto">
      <AnimatePresence>
        {Object.entries(QUESTIONS).map(([tab, questions]) =>
          selected === tab ? (
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "backIn" }}
              style={{ marginTop: "1rem" }}
            >
              {questions.map((q, idx) => (
                <Question key={idx} {...q} />
              ))}
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </VStack>
  );
};

const Question = ({ question, answer }) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      // initial={false}
      // transition={{ ease: "easeOut", duration: 0.2 }}
      style={{ overflow: "hidden", marginBottom: "1rem" }}
    >
      <Box
        borderWidth="1px"
        borderRadius="xl"
        p={4}
        bg={open ? "gray.800" : "transparent"}
        onClick={() => setOpen(!open)}
        cursor="pointer"
      >
        <Flex justify="space-between" align="center">
          <Text
            fontSize="lg"
            fontWeight="medium"
            color={open ? "white" : "gray.400"}
          >
            {question}
          </Text>
          <motion.span
            variants={{
              open: { rotate: 45 },
              closed: { rotate: 0 },
            }}
          >
            <FiPlus size="24px" color={open ? "white" : "gray.400"} />
          </motion.span>
        </Flex>
        <motion.div
          initial={false}
          animate={{
            height: open ? "auto" : 0,
            marginBottom: open ? "24px" : "0px",
          }}
          style={{ overflow: "hidden" }}
          transition={{ ease: "easeOut", duration: 0.2 }}
        >
          <Text ref={ref} color="gray.400" mt={4} h="auto">
            {answer}
          </Text>
        </motion.div>
      </Box>
    </motion.div>
  );
};
const MotionBox = motion(Box);

const TABS = ["Web dev", "Mobile dev", "UI/UX"];

const QUESTIONS = {
  "Web dev": [
    {
      question: "What is web development?",
      answer:
        "Web development is the process of building and maintaining websites and web applications. It includes everything from designing the user interface (what people see) to developing the backend systems (what powers it behind the scenes). From simple landing pages to complex platforms, web development ensures your digital presence is functional, secure, scalable, and engaging.",
    },
    {
      question: "How do I know if I need it?",
      answer:
        "If you're launching a business, upgrading an outdated site, building a product, or need a better way to connect with your audience online — you need web development.",
    },
    {
      question: "What does it cost?",
      answer:
        "Web development costs can vary based on your needs. A simple, static website may start at a few thousand dollars, while custom platforms or apps with advanced features (like user accounts, payments, dashboards, etc.) require a larger investment.",
    },
  ],
  "Mobile dev": [
    {
      question: "What is mobile development?",
      answer:
        "Mobile development is the process of creating apps specifically designed to run on smartphones and tablets — like iOS (iPhone) and Android devices. It includes everything from designing the interface to writing the code that makes your app function smoothly and securely.",
    },
  ],
  "UI/UX": [
    {
      question: "What is UI/UX?",
      answer:
        "UI (User Interface) and UX (User Experience) design work together to shape how people interact with your digital product.UI is the visual side — the buttons, colors, typography, and layout that users see and tap.UX is the experience — how easy, intuitive, and satisfying it feels to use your app or website",
    },
  ],
};
