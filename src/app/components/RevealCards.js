"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Box, Heading, Text, Grid, Link, Flex } from "@chakra-ui/react";

const RevealCards = () => {
  return (
    <Box as="section" p={8} bg="green.900">
      <Heading
        textAlign="center"
        color="white"
        fontSize={{ base: "3xl", md: "5xl" }}
        fontWeight="bold"
        mb={8}
        mt={16}
      >
        Featured Projects
      </Heading>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={4}
        maxW="7xl"
        mx="auto"
        px={4}
      >
        <Card
          title="Gap Gambler"
          description="Stock application landing page. (React, TypeScript)"
          imgSrc="/GGSite.png"
          link="https://gapgambler.com/"
        />
        <Card
          title="Earnings Tournament"
          description="Earnings Tournament. Predict stock market outcomes. (React, Typescript)"
          imgSrc="/ETournament.png"
          link="https://earningstournament.com/"
        />
        <Card
          title="Posh Beauty Supply"
          description="Posh Beauty supply site built with JavaScript, CSS"
          imgSrc="/POSH.png"
          link="https://poshbeautysupply.com/"
        />
        <Card
          title="Nubian Roots Beauty Spa"
          description="Spa website built with Javascript, CSS, HTML"
          imgSrc="/NubianRoots.png"
          link="https://nubianrootsbeautyandspa.com/"
        />
        <Card
          title="Dynasty Solutions"
          description="Responsive Figma design"
          imgSrc="/DynastySolutions.png"
          link="https://www.figma.com/proto/koSjS0EUPETxLUnCGCHtww/Dynasty-Solutions-Delivery_file-?node-id=4302-313&p=f&t=uLQTE1LWzVfh13rw-1&scaling=min-zoom&content-scaling=fixed&page-id=4302%3A46"
        />
        <Card
          title="Queendom Connections"
          description="Youth mentor website built with JavaScript,CSS,HTML"
          imgSrc="QConnections.png"
          link="https://www.queendomconnectionsinc.org/"
        />
        <Card
          title="Mary Bush Insurance Provider"
          description="Responsive Figma design for insurance company"
          imgSrc="/MBush.png"
          link="https://www.figma.com/proto/zibhdzbmy83lL1H3hbTTP7/Figma-source-file?page-id=3336%3A59&node-id=5190-1303&viewport=250%2C107%2C0.25&t=dsSD4k74ACAHR7B3-1&scaling=min-zoom&content-scaling=fixed"
        />
        <Card
          title="Modern"
          description="This one's real blocky"
          imgSrc="https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80"
        />
      </Grid>
    </Box>
  );
};

const Card = ({ imgSrc, title, description, link }) => {
  return (
    <motion.div
      whileHover="hover"
      style={{ position: "relative", width: "100%", height: "300px" }}
    >
      <Box
        bg="black"
        p={6}
        h="50%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading fontSize="xl" mb={2} color="white">
          {title}
        </Heading>
        <Text fontSize="sm" fontWeight="light" color="gray.300">
          {description}
        </Text>
      </Box>

      <motion.div
        initial={{ top: "0%", right: "0%" }}
        variants={{
          hover: { top: "50%", right: "50%" },
        }}
        style={{
          position: "absolute",
          inset: "0",
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 10,
        }}
      />

      <Link
        href={link}
        position="absolute"
        bottom="0"
        right="0"
        width="50%"
        height="50%"
        display="grid"
        placeItems="center"
        bg="white"
        color="black"
        _hover={{ color: "indigo.500" }}
        transition="color 0.2s"
      >
        <Flex alignItems="center">
          <Text fontSize="xs">MORE</Text>
          <FiArrowUpRight fontSize="lg" />
        </Flex>
      </Link>
    </motion.div>
  );
};

export default RevealCards;
