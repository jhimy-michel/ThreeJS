import React, { useEffect, useState } from "react";
//import {} from "react-three-fiber";
// a => animated
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function SpaceShip() {
  const [model, setModel] = useState();
  useEffect(() => {
    new GLTFLoader().load("scene.gltf", setModel);
  });
  //console.log(model);
  return model ? <primitive object={model.scene} /> : false;
}
export default SpaceShip;
