import React from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import "./style.css";
import Box from "./fiber/Box";
import Controls from "./fiber/Controls";
import Plane from "./fiber/Plane";
import SpaceShip from "./fiber/SpaceShip";

function Asset({ url }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 50] }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFShadowMap;
      }}
    >
      <ambientLight intensity={0.5} />
      <spotLight castShadow position={[15, 20, 25]} penumbra={1} />
      {/* <fog attach="fog" args={["black", 5, 25]} /> */}

      <Controls />
      {/* <Box />
      <Plane /> */}
      <SpaceShip />
    </Canvas>
  );
}

export default Asset;
