import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { EncryptButton } from "./EncryptButton";
import Nav from "./Nav";

export default function HeroSection() {
  return (
    <Box
      height="100vh"
      bgImage="url('/header-background.jpg')" // Replace with your background image path
      bgSize="cover"
      bgPosition="center"
      position="relative"
      color="white"
    >
      <Nav />
      {/* Overlay gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-b, rgba(0, 15, 10, 0.7), rgba(0, 15, 10, 1))"
        zIndex={0}
      />

      {/* Content */}
      <Flex
        position="relative"
        zIndex={1}
        height="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start" // Align content to the left
        px={36}
        textAlign="left" // Ensure text is left-aligned
      >
        {/* <Image
          boxSize="100px"
          src="/idtc.png" // Replace with your logo path
          alt="It's deeper than code ai agency"
          mb={8}
        /> */}
        <Heading
          as="h1"
          fontSize={{ base: "2xl", md: "5xl", lg: "6xl" }}
          mb={4}
          fontWeight="bold"
        >
          WELCOME,{" "}
          <Text color="green.500" as="span">
            I&apos;M KHOURY
          </Text>
          {/* <br /> Line break to move ROCKSTAR! to the next line */}
        </Heading>
        <Text
          color="green.500"
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          maxW="800px"
          fontWeight="bold"
          mb={6}
        >
          GRAPHIC DESIGN, WEBSITE, EXPERTISE, AND MORE.
        </Text>
        <Text
          fontSize={{ base: "sm", md: "md", lg: "lg" }}
          maxW="800px"
          mb={10}
        >
          {`I'm a Software Engineer. I love Call of Duty, and if I use the
          shotgun you won't have a chance. Once upon a time I thought, I was
          going to be a professional football player. Obviously that didn't
          happen but I'd bet that I am the fastest developer you ever met. We
          can race at anytime! As a Frontend Developer, I enjoy using my
          obsessive attention to detail, my unequivocal love for making things,
          and my mission-driven work ethic to literally change the world.`}
        </Text>
        <EncryptButton />
        {/* <Button
          colorScheme="green"
          size="lg"
          fontWeight="bold"
          rounded="full"
          px={8}
          py={6}
          boxShadow="lg"
        >
          BOOK A FREE CONSULTATION
        </Button> */}
      </Flex>
    </Box>
  );
}
