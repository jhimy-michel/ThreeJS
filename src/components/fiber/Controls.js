import React, { useRef } from "react";
//import {} from "react-three-fiber";
// a => animated
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { extend, useThree, useRender } from "react-three-fiber";
extend({ OrbitControls });

function Controls() {
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  useRender(() => {
    orbitRef.current.update();
  });
  return (
    <orbitControls
      autoRotate
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
}
export default Controls;
