import React, { useState } from "react";
//import {} from "react-three-fiber";
// a => animated
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useSpring, a } from "react-spring/three";
//import { extend } from "react-three-fiber";

function Box() {
  //const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false); // useSpring needs an object
  // control re renders GAMELOOP
  /* useRender(() => {
    meshRef.current.rotation.y += 0.01;
  }) */ const props = useSpring(
    {
      scale: active ? [1.5, 1.5, 2.5] : [1, 1, 1],
      color: hovered ? "red" : "blue"
    }
  );

  return (
    <a.mesh
      //ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      //array scale x,y,z
      scale={props.scale}
      castShadow
    >
      
      <boxBufferGeometry
        attach="geometry"
        //constructor
        args={[1, 1, 1]}
      />
      <meshPhysicalMaterial attach="material" color={props.color} />
    </a.mesh>
  );
}
export default Box;
