import { Box, Flex, Image, Text } from "@chakra-ui/react";

const WhoWeWorkWith = () => {
  return (
    <Box py={8}>
      {" "}
      <Box textAlign="center" mb={8}>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.400">
          Companies we worked with
        </Text>
      </Box>
      {/* Adjust padding and background as needed */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        maxW="4xl"
        mx="auto"
        px={4}
      >
        <Image
          src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg"
          alt="Transistor"
          height="40px"
        />
        <Image
          src="https://tailwindui.com/img/logos/158x48/reform-logo-white.svg"
          alt="Reform"
          height="40px"
        />
        <Image
          src="https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg"
          alt="Tuple"
          height="40px"
        />
        <Image
          src="https://img.icons8.com/?size=100&id=oStUUtcLsEel&format=png&color=FFFFFF"
          alt="SavvyCal"
          height="40px"
        />
        <Image
          src="https://img.icons8.com/?size=100&id=akkAUlzskCro&format=png&color=FFFFFF"
          alt="Statamic"
          height="40px"
        />
      </Flex>
    </Box>
  );
};

export default WhoWeWorkWith;
