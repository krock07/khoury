"use client";

import React, { useRef } from "react";

import { FiArrowUpRight } from "react-icons/fi";

import {
  Box,
  Text,
  VStack,
  Flex,
  HStack,
  Button,
  shouldForwardProp,
  chakra,
} from "@chakra-ui/react";
import {
  motion,
  useScroll,
  useTransform,
  isValidMotionProp,
} from "framer-motion";

export const TextParallaxContentExample = () => (
  <Box bg="green.900">
    <TextParallaxContent
      imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      subheading="Collaborate"
      heading="Built for all of us."
    >
      <ExampleContent />
    </TextParallaxContent>
    <TextParallaxContent
      imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      subheading="Quality"
      heading="Never compromise."
    >
      <ExampleContentTwo />
    </TextParallaxContent>
    {/* <TextParallaxContent
      imgUrl="/ai-section.jpg"
      subheading="Test copy"
      heading="Description."
    >
      <ExampleContent />
    </TextParallaxContent> */}
  </Box>
);

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <Box>
      <Box position="relative" h="100vh">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </Box>
      {children}
    </Box>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <MotionBox
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      position="sticky"
      zIndex={0}
      overflow="hidden"
      //   borderRadius="3xl"
    >
      <MotionBox
        style={{ opacity }}
        position="absolute"
        inset={0}
        bg="neutral.950"
        _after={{
          content: '""',
          bg: "rgba(0, 0, 0, 0.7)",
          position: "absolute",
          inset: 0,
        }}
      />
    </MotionBox>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <MotionBox
      style={{ y, opacity }}
      ref={targetRef}
      position="absolute"
      left={0}
      top={0}
      display="flex"
      h="100vh"
      w="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      color="white"
    >
      <Text mb={2} textAlign="center" fontSize={{ base: "xl", md: "3xl" }}>
        {subheading}
      </Text>
      <Text
        textAlign="center"
        fontSize={{ base: "4xl", md: "7xl" }}
        fontWeight="bold"
      >
        {heading}
      </Text>
    </MotionBox>
  );
};

const ExampleContent = () => (
  <Box
    mx="auto"
    maxW="5xl"
    display="grid"
    gridTemplateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }}
    gap={8}
    px={4}
    pb={24}
    pt={12}
  >
    <Text
      gridColumn={{ base: "1", md: "span 4" }}
      fontSize="3xl"
      fontWeight="bold"
      color="green.500"
    >
      Engineering is a Team Sport
    </Text>
    <Box gridColumn={{ base: "1", md: "span 8" }}>
      <Text mb={4} fontSize={{ base: "xl", md: "2xl" }} color="white">
        The best software isn&apos;t built in silos — it&apos;s forged in
        collaboration. From designers and developers to stakeholders and users,
        we believe every voice shapes a better product. That&apos;s why our
        engineering process is open, iterative, and deeply human.
      </Text>
      {/* <Text mb={8} fontSize={{ base: "xl", md: "2xl" }} color="gray.600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        reiciendis blanditiis aliquam aut fugit sint.
      </Text>
      <Button
        w={{ base: "full", md: "fit-content" }}
        bg="neutral.900"
        px={9}
        py={4}
        fontSize="xl"
        color="white"
        _hover={{ bg: "neutral.700" }}
        leftIcon={<FiArrowUpRight />}
      >
        Learn more
      </Button> */}
    </Box>
  </Box>
);

const ExampleContentTwo = () => (
  <Box
    mx="auto"
    maxW="5xl"
    display="grid"
    gridTemplateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }}
    gap={8}
    px={4}
    pb={24}
    pt={12}
  >
    <Text
      gridColumn={{ base: "1", md: "span 4" }}
      fontSize="3xl"
      fontWeight="bold"
      color="green.500"
    >
      Bold & Direct
    </Text>
    <Box gridColumn={{ base: "1", md: "span 8" }}>
      <Text mb={4} fontSize={{ base: "xl", md: "2xl" }} color="white">
        {`In software engineering, quality isn't a bonus — it's the baseline.
        Every line of code, every architecture decision, and every deployment
        reflects a commitment to excellence. We don't just build products
        that work — we build systems that last, scale, and adapt.`}
      </Text>
      {/* <Text mb={8} fontSize={{ base: "xl", md: "2xl" }} color="gray.600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        reiciendis blanditiis aliquam aut fugit sint.
      </Text>
      <Button
        w={{ base: "full", md: "fit-content" }}
        bg="neutral.900"
        px={9}
        py={4}
        fontSize="xl"
        color="white"
        _hover={{ bg: "neutral.700" }}
        leftIcon={<FiArrowUpRight />}
      >
        Learn more
      </Button> */}
    </Box>
  </Box>
);
