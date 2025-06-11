import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  IconButton,
  chakra,
} from "@chakra-ui/react";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiGithub,
  FiYoutube,
} from "react-icons/fi";

const navigation = {
  main: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Accessibility", href: "#" },
    { name: "Partners", href: "#" },
  ],
  social: [
    { name: "Facebook", href: "#", icon: FiFacebook },
    { name: "Instagram", href: "#", icon: FiInstagram },
    { name: "X", href: "#", icon: FiTwitter },
    { name: "GitHub", href: "#", icon: FiGithub },
    { name: "YouTube", href: "#", icon: FiYoutube },
  ],
};

export default function Footer() {
  return (
    <Box as="footer" bg="green.900" py={10}>
      <Container maxW="7xl">
        <Stack
          direction={{ base: "column", sm: "row" }}
          justify={{ sm: "center" }}
          spacing={{ base: 6, sm: 12 }}
          textAlign="center"
        >
          {/* {navigation.main.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              fontSize="sm"
              color="gray.600"
              _hover={{ color: "gray.900" }}
            >
              {item.name}
            </Link>
          ))} */}
        </Stack>
        <Stack direction="row" justify="center" mt={10} spacing={6}>
          {/* {navigation.social.map((item) => (
            <IconButton
              key={item.name}
              as="a"
              href={item.href}
              aria-label={item.name}
              icon={<item.icon size={24} />}
              variant="ghost"
              color="gray.400"
              _hover={{ color: "gray.500" }}
            />
          ))} */}
        </Stack>
        <Text mt={10} fontSize="xs" color="gray.500" textAlign="center">
          &copy; 2025 Khoury Smith,. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
