import React, { useEffect, useState } from "react";
import * as THREE from "three";
// a => animated
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

function SpaceShip() {
  const [model, setModel] = useState();
  useEffect(() => {
    new STLLoader().load(
      "Fox.stl",
      geometry => {
        console.log(geometry);
        setModel(geometry);
      },
      // called when loading is in progresses
      function(xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function(error) {
        console.log("An error : ", error);
      }
    );
  }, []);
  var onchange = ({ target }) => {
    console.log(target.files);
    const { files } = target;
    var url = `${window.location.origin}` + files.name;
    console.log("URL: ", url);
    new STLLoader().load(
      url,
      geometry => {
        console.log(geometry);
        setModel(geometry);
      },
      // called when loading is in progresses
      function(xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function(error) {
        console.log("An error : ", error);
      }
    );
    const reader = new FileReader();
    reader.readAsArrayBuffer(files[0]);
    reader.onload = () => {
      console.log(reader);
      setModel(reader.result);
      //this.setState({ model: reader.result });
    };
  };
  console.log(window.location.origin);
  //console.log(window.location.origin);`${window.location.origin}`
  return (
    <>
      {/* <input type="file" onChange={e => onchange(e)}></input> */}
      {model ? (
        <mesh
          position={[-50, -50, 0]}
          material={
            new THREE.MeshBasicMaterial({
              color: 0x00ff00,
              wireframe: true
            })
          }
          geometry={model}
        ></mesh>
      ) : (
        false
      )}
    </>
  );
}
export default SpaceShip;
