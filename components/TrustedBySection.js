import { Box, Flex, Heading, Text, Stack } from "@chakra-ui/react";
import WhoWeWorkWith from "./WhoWeWorkWith";

export default function TrustedSection() {
  return (
    <Box bg="green.900" color="white" py={{ base: 12, md: 16 }}>
      <Box textAlign="center" mb={8}>
        <Heading fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold" mt={8}>
          Trusted by creators worldwide
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.400" mt={4}>
          Explore the impact we&apos;ve made through hundreds of successful
          projects worldwide.
        </Text>
      </Box>

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-around"
        align="center"
        gap={8}
        maxW="7xl"
        mx="auto"
        px={{ base: 20, md: 4 }}
        color="green.500"
      >
        <Box
          bg="gray.800"
          p={6}
          borderRadius="md"
          textAlign="center"
          width={{ base: "full", md: "209.41px" }}
        >
          <Text fontSize="3xl" fontWeight="bold">
            8,000+
          </Text>
          <Text mt={2} fontSize="sm" color="gray.400">
            Creators on the platform
          </Text>
        </Box>

        <Box
          bg="gray.800"
          p={6}
          borderRadius="md"
          textAlign="center"
          width={{ base: "full", md: "209.41px" }}
        >
          <Text fontSize="3xl" fontWeight="bold">
            3%
          </Text>
          <Text mt={2} fontSize="sm" color="gray.400">
            Flat platform fee
          </Text>
        </Box>

        <Box
          bg="gray.800"
          p={6}
          borderRadius="md"
          textAlign="center"
          width={{ base: "full", md: "209.41px" }}
        >
          <Text fontSize="3xl" fontWeight="bold">
            99.9%
          </Text>
          <Text mt={2} fontSize="sm" color="gray.400">
            Uptime guarantee
          </Text>
        </Box>

        <Box
          bg="gray.800"
          p={6}
          borderRadius="md"
          textAlign="center"
          width={{ base: "full", md: "209.41px" }}
        >
          <Text fontSize="3xl" fontWeight="bold">
            $70M
          </Text>
          <Text mt={2} fontSize="sm" color="gray.400">
            Paid out to creators
          </Text>
        </Box>
      </Flex>
      <WhoWeWorkWith />
    </Box>
  );
}
