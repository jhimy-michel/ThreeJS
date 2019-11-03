import React, { useRef } from "react";
//import {} from "react-three-fiber";
// a => animated
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { extend, useThree, useRender } from "react-three-fiber";
import { RGBA_ASTC_10x10_Format } from "three";
//extend({ OrbitControls });

function Plane() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeBufferGeometry
        attach="geometry"
        //constructor
        args={[100, 100]}
      />
      <meshPhysicalMaterial attach="material" color="white" />
    </mesh>
  );
}
export default Plane;
