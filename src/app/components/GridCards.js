"use client";

import {
  Box,
  Grid,
  Link,
  Heading,
  Text,
  Flex,
  Icon,
  Image,
  GridItem,
} from "@chakra-ui/react";
import {
  FiBookOpen,
  FiEye,
  FiWatch,
  FiArrowUpRight,
  FiArrowRight,
} from "react-icons/fi";
import AIButtonWrapper from "./AIButton";

export const GridCards = () => {
  return (
    <Box bg="#171717" p={{ base: 4, md: 12 }} color="neutral.50">
      <Heading
        textAlign="center"
        color="white"
        fontSize={{ base: "3xl", md: "5xl" }}
        fontWeight="bold"
        mb={8}
      >
        The Process
      </Heading>
      <Grid
        mx="auto"
        maxW="7xl"
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={0}
        border="1px solid"
        borderColor="green.500"
      >
        <GridItem borderRight="1px solid" borderColor="green.500">
          <TitleCard />
        </GridItem>
        <GridItem borderRight="1px solid" borderColor="green.500">
          <Card
            href="#"
            title="Business Needs"
            description="Tell us about your business goals and challenges, and we'll tailor AI-driven solutions to meet your specific needs."
            step="Step 1"
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </GridItem>
        <GridItem borderRight="1px solid" borderColor="green.500">
          <Card
            href="#"
            title="Inquiry Form"
            step="Step 2"
            description="Have a question or ready to take the next step? Fill out our inquiry form , and our team will get back to you promptly"
            src="https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2379&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </GridItem>
      </Grid>
      <Grid
        mx="auto"
        maxW="7xl"
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={0}
        borderX="1px solid"
        borderBottom="1px solid"
        borderColor="green.500"
      >
        <GridItem borderRight="1px solid" borderColor="green.500">
          <Card
            href="#"
            title="Consultation"
            description="Our experts will take the time to understand your business challenges and opportunities, offering insights and recommendations tailored to your goals"
            step="Step 3"
            src="https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </GridItem>
        <GridItem borderRight="1px solid" borderColor="green.500">
          <Card
            href="#"
            title="Develop & Review"
            description="hroughout the development process, you'll have the opportunity to review progress, provide feedback, and ensure everything aligns with your vision."
            step="Step 4"
            src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </GridItem>

        <Card
          href="#"
          title="Project Delivery"
          description="From concept to completion, we ensure a smooth and timely project delivery process. Our team works closely with you at every stage"
          step="Step 5"
          isLastCard={true}
          src="https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </Grid>
      <Grid
        mx="auto"
        maxW="5xl"
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={0}
        borderX="1px solid"
        borderBottom="1px solid"
        borderColor="green.500"
      ></Grid>
    </Box>
  );
};

const Card = ({ href, title, step, src, description, isLastCard }) => {
  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      overflow="hidden"
      p={{ base: 6, md: 9 }}
      h={{ base: "14rem", md: "20rem" }}
      transition="background-color 0.5s ease"
      _hover={{ bg: "#0a0a0a" }}
      color="white"
      role="group"
    >
      <Flex
        position="absolute"
        left={3}
        top={5}
        alignItems="center"
        gap={1.5}
        fontSize="xs"
        textTransform="uppercase"
        color="neutral.400"
        transition="color 0.5s ease"
        _groupHover={{ color: "neutral.50" }}
      >
        <Text>{step}</Text>
      </Flex>
      <Box zIndex={10} textAlign="left">
        <Heading fontSize="2xl" mb={1} color="green.500">
          {title}
        </Heading>
        <Text fontSize="sm" mb={2}>
          {description}
        </Text>
      </Box>
      {isLastCard ? (
        <AIButtonWrapper />
      ) : (
        <Icon
          as={FiEye}
          position="absolute"
          right={3}
          top={4}
          boxSize={6}
          color="neutral.400"
          transition="color 0.5s ease"
          _groupHover={{ color: "neutral.50" }}
        />
      )}

      <Image
        alt="test"
        src={src}
        position="absolute"
        height="100%"
        width="100%"
        top={0}
        left={0}
        right={0}
        bottom={0}
        objectFit="cover"
        filter="grayscale(100%)"
        blur="4px"
        transition="opacity 0.5s ease, transform 0.5s ease, filter 0.5s ease"
        opacity={0.1}
        _groupHover={{ opacity: 0.3, filter: "grayscale(100%) blur(4px)" }}
      />
      <Corners />
    </Box>
  );
};

const Corners = () => (
  <>
    <Box
      position="absolute"
      left="1px"
      top="1px"
      h="3"
      w="1px"
      transformOrigin="top"
      bg="green.500"
      transform="scale(0)"
      transition="transform 0.5s ease"
      zIndex={10}
      _groupHover={{ transform: "scale(1)" }}
    />
    <Box
      position="absolute"
      left="1px"
      top="1px"
      w="3"
      h="1px"
      transformOrigin="left"
      bg="green.500"
      transform="scale(0)"
      transition="transform 0.5s ease"
      zIndex={10}
      _groupHover={{ transform: "scale(1)" }}
    />
    <Box
      position="absolute"
      right="1px"
      bottom="1px"
      h="3"
      w="1px"
      transformOrigin="bottom"
      bg="green.500"
      transform="scale(0)"
      transition="transform 0.5s ease"
      zIndex={10}
      _groupHover={{ transform: "scale(1)" }}
    />
    <Box
      position="absolute"
      right="1px"
      bottom="1px"
      w="3"
      h="1px"
      transformOrigin="right"
      bg="green.500"
      transform="scale(0)"
      transition="transform 0.5s ease"
      zIndex={10}
      _groupHover={{ transform: "scale(1)" }}
    />
    <Box
      position="absolute"
      left="1px"
      bottom="1px"
      h="3"
      w="1px"
      transformOrigin="bottom"
      bg="green.500"
      transform="scale(0)"
      transition="transform 0.5s ease"
      zIndex={10}
      _groupHover={{ transform: "scale(1)" }}
    />
    <Box
      position="absolute"
      left="1px"
      bottom="1px"
      w="3"
      h="1px"
      transformOrigin="left"
      bg="green.500"
      transform="scale(0)"
      transition="transform 0.5s ease"
      zIndex={10}
      _groupHover={{ transform: "scale(1)" }}
    />

    <Box
      position="absolute"
      right="1px"
      top="1px"
      h="3"
      w="1px"
      transformOrigin="top"
      bg="green.500"
      transform="scale(0)"
      transition="transform 0.5s ease"
      zIndex={10}
      _groupHover={{ transform: "scale(1)" }}
    />
    <Box
      position="absolute"
      right="1px"
      top="1px"
      w="3"
      h="1px"
      transformOrigin="right"
      bg="green.500"
      transform="scale(0)"
      transition="transform 0.5s ease"
      zIndex={10}
      _groupHover={{ transform: "scale(1)" }}
    />
  </>
);

const TitleCard = () => {
  return (
    <Link
      href="#"
      isExternal
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      bg="#0a0a0a"
      p={{ base: 6, md: 9 }}
      h={{ base: "14rem", md: "20rem" }}
      transition="background-color 0.5s ease"
      _hover={{ bg: "emerald.300" }}
      role="group"
    >
      <Heading color="white" fontSize="4xl" textTransform="uppercase">
        <Text _groupHover={{ color: "green.500" }} as="span" color="white">
          scale your
        </Text>
        <br />
        Business In
        <br />5 steps
      </Heading>

      <Icon
        as={FiArrowUpRight}
        position="absolute"
        right={3}
        top={4}
        boxSize={6}
        color="neutral.400"
        transition="color 0.5s ease"
        _groupHover={{ color: "green.500" }}
      />
    </Link>
  );
};
