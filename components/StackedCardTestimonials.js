"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Heading,
  Text,
  Icon as ChakraIcon,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {
  SiAtlassian,
  SiDribbble,
  SiGrubhub,
  SiKaggle,
  SiSlack,
  SiNike,
} from "react-icons/si";

const StackedCardTestimonials = () => {
  const [selected, setSelected] = useState(0);

  return (
    <Box
      id="testimonials"
      bg="white"
      py={24}
      px={{ base: 4, lg: 8 }}
      display="grid"
      alignItems="center"
      gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      gap={8}
      overflow="hidden"
    >
      <VStack spacing={4} alignItems="start">
        <Heading fontSize="5xl" fontWeight="bold">
          What our customers think
        </Heading>
        <Text color="gray.500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
          commodi sint, similique cupiditate possimus suscipit delectus illum
          eos iure magnam!
        </Text>
        <SelectBtns
          numTracks={testimonials.length}
          setSelected={setSelected}
          selected={selected}
        />
      </VStack>
      <Cards
        testimonials={testimonials}
        setSelected={setSelected}
        selected={selected}
      />
    </Box>
  );
};

const SelectBtns = ({ numTracks, setSelected, selected }) => {
  return (
    <HStack spacing={1} mt={8} width="100%">
      {Array.from(Array(numTracks).keys()).map((n) => {
        return (
          <Button
            key={n}
            onClick={() => setSelected(n)}
            height="6px"
            width="full"
            bg="gray.300"
            position="relative"
          >
            {selected === n ? (
              <motion.span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  background: "#1A202C",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5 }}
                onAnimationComplete={() => {
                  setSelected(selected === numTracks - 1 ? 0 : selected + 1);
                }}
              />
            ) : (
              <Box
                bg="gray.700"
                position="absolute"
                top={0}
                left={0}
                bottom={0}
                width={selected > n ? "100%" : "0%"}
              />
            )}
          </Button>
        );
      })}
    </HStack>
  );
};

const Cards = ({ testimonials, selected, setSelected }) => {
  return (
    <Box
      p={4}
      position="relative"
      height={{ base: "450px", lg: "500px" }}
      boxShadow="xl"
    >
      {testimonials.map((testimony, i) => {
        return (
          <Card
            {...testimony}
            key={i}
            position={i}
            selected={selected}
            setSelected={setSelected}
          />
        );
      })}
    </Box>
  );
};

const Card = ({
  Icon,
  description,
  name,
  title,
  position,
  selected,
  setSelected,
}) => {
  const scale = position <= selected ? 1 : 1 + 0.015 * (position - selected);
  const offset = position <= selected ? 0 : 95 + (position - selected) * 3;
  const background = position % 2 ? "#00ac69" : "white";
  const color = position % 2 ? "white" : "black";

  return (
    <motion.div
      initial={false}
      style={{
        zIndex: position,
        transformOrigin: "left bottom",
        background,
        color,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        minHeight: "100%",
        padding: "3rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
      animate={{
        x: `${offset}%`,
        scale,
      }}
      whileHover={{
        translateX: position === selected ? 0 : -3,
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={() => setSelected(position)}
    >
      <ChakraIcon as={Icon} boxSize={24} mx="auto" />
      <Text fontSize={{ base: "lg", lg: "xl" }} fontStyle="italic" my={8}>
        {description}
      </Text>
      <Box>
        <Text fontWeight="bold" fontSize="lg">
          {name}
        </Text>
        <Text fontSize="sm">{title}</Text>
      </Box>
    </motion.div>
  );
};

export default StackedCardTestimonials;

const testimonials = [
  {
    Icon: SiNike,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita sequi cupiditate harum repellendus ipsum dignissimos? Officiis ipsam dolorum magnam assumenda.",
    name: "Jane Dodson",
    title: "Marketing Director, Nike",
  },
  {
    Icon: SiAtlassian,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita sequi cupiditate harum repellendus ipsum dignissimos? Officiis ipsam dolorum magnam assumenda.",
    name: "Johnathan Rodriguez",
    title: "UX Research, Atlassian",
  },
  {
    Icon: SiDribbble,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita sequi cupiditate harum repellendus ipsum dignissimos? Officiis ipsam dolorum magnam assumenda.",
    name: "Phil Heath",
    title: "Staff Engineer, Dribbble",
  },
  {
    Icon: SiGrubhub,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita sequi cupiditate harum repellendus ipsum dignissimos? Officiis ipsam dolorum magnam assumenda.",
    name: "Andrea Beck",
    title: "Marketing Manager, GrubHub",
  },
  {
    Icon: SiKaggle,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita sequi cupiditate harum repellendus ipsum dignissimos? Officiis ipsam dolorum magnam assumenda.",
    name: "Daniel Henderson",
    title: "Engineering Manager, Kaggle",
  },
  {
    Icon: SiSlack,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita sequi cupiditate harum repellendus ipsum dignissimos? Officiis ipsam dolorum magnam assumenda.",
    name: "Anderson Lima",
    title: "Product Manager, Slack",
  },
];
