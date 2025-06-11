"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { pointsInner, pointsOuter } from "@/utils";
import { EncryptButton } from "./EncryptButton";
import Nav from "./Nav";

const ParticleRing = () => {
  return (
    <Box
      position="relative"
      height="100vh"
      bgGradient="linear(to-b, rgba(0, 15, 10, 0.8), rgba(0, 15, 10, 1))"
    >
      <Nav />
      <Canvas
        camera={{
          position: [10, -7.5, -5],
        }}
        style={{ height: "100vh" }}
      >
        <OrbitControls maxDistance={20} minDistance={10} />
        <directionalLight />
        <pointLight position={[-30, 0, -30]} power={10.0} />
        <PointCircle />
      </Canvas>

      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Heading
          as="h1"
          w={{ base: "350px", md: "1200px" }}
          fontSize={{ base: "2xl", md: "5xl", lg: "6xl" }}
          mb={4}
          fontWeight="bold"
          color="white"
        >
          WELCOME,{" "}
          <Text color="green.500" as="span">
            {`I'M KHOURY`}
          </Text>
        </Heading>
        <Text
          color="white"
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          maxW="800px"
          fontWeight="bold"
          mb={6}
        >
          GRAPHIC DESIGN, WEBSITE EXPERTISE, AND MORE.
        </Text>
        <Text
          fontSize={{ base: "sm", md: "md", lg: "lg" }}
          maxW="800px"
          mb={10}
          color="white"
        >
          {`I'm a Software Engineer. I love Call of Duty, and if I use the shotgun
  you won't have a chance. Once upon a time I thought, I was going to be
  a professional football player. Obviously that didn't happen but I'd
  bet that I am the fastest developer you ever met. We can race at
  anytime! As a Frontend Developer, I enjoy using my obsessive attention
  to detail, my unequivocal love for making things, and my
  mission-driven work ethic to literally change the world.`}
        </Text>
        <EncryptButton />
      </Box>
    </Box>
  );
};

const PointCircle = () => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
};

export default ParticleRing;
