"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box, Button, Link, HStack, Flex, Text } from "@chakra-ui/react";

const Nav = () => {
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      p={6}
      mb={1}
      w="100%"
    >
      {/* Coordinates Text */}
      <Text
        fontSize="xs"
        color="gray.400"
        display={{ base: "none", md: "block" }}
      >
        33° 44&apos; 56&quot; N, 84° 23&apos; 24&quot; W
        <br />
      </Text>

      {/* Logo */}
      <Logo />

      {/* Navigation Links */}
      <Links />
    </Flex>
  );
};

const Logo = () => {
  return (
    <svg
      width="36"
      height="auto"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        top: "50%",
        right: { base: "4", md: "50%" },
        transform: "translateY(-50%)",
      }}
    >
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        stopColor="red"
      ></path>
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        stopColor="red"
      ></path>
    </svg>
  );
};

const Links = () => {
  return (
    <Flex as="nav" gap={3} fontSize="sm">
      <Link href="#faqs" color="white">
        FAQs
      </Link>
      {/* <Link href="#testimonials" color="white">
        Testimonials
      </Link> */}
      <Link href="#contact" color="white">
        Contact
      </Link>
    </Flex>
  );
};

export default Nav;
