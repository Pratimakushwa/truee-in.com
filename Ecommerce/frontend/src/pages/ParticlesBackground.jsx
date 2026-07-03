import React, { useCallback } from "react";
// import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        particles: {
          number: { value: 40 },
          color: { value: "#cbd5e1" }, // ⚡ FIX: Silver/Light Gray kar diya taaki white bg par dikhe
          links: { 
            enable: true, 
            color: "#cbd5e1", // ⚡ FIX: Lines bhi Silver kar di hain
            distance: 150,
            opacity: 0.8
          },
          move: { enable: true, speed: 0.5 },
          opacity: { value: 0.8 }
        }
      }}
      className="absolute inset-0 z-0"
    />
  );
};

export default ParticlesBackground;