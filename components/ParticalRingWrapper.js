"use client";

import dynamic from "next/dynamic";

// Dynamically import to disable SSR
const ParticleRing = dynamic(() => import("./ParticleRing"), {
  ssr: false,
  loading: () => <div style={{ height: "100vh", background: "#000" }} />,
});

export default ParticleRing;
