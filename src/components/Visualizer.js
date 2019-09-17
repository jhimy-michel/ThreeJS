import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import React, { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function Visualizer() {
  const width = el.clientWidth;
  const height = el.clientHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75, // fov = field of view
    width / height, // aspect ratio
    0.1, // near plane
    1000 // far plane
  );
  const controls = new OrbitControls(camera, el);
  // set some distance from a cube that is located at z = 0
  this.camera.position.z = 85;
  const renderer = new THREE.WebGLRenderer();
  this.renderer.setSize(width, height);
  el.appendChild(this.renderer.domElement); // mount using React ref

  const handleWindowResize = () => {
    const width = el.clientWidth;
    const height = el.clientHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const sceneSetup = () => {
    /// ------ wiiiiii
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true
    });
    //const cube = new THREE.Mesh( geometry, material );
    var loader = new STLLoader();

    loader.load(
      "test.stl",
      geometry => {
        var mesh = new THREE.Mesh(geometry, material);
        var objBbox = new THREE.Box3().setFromObject(mesh);
        console.log(objBbox);
        var bboxCenter = objBbox.getCenter().clone();
        bboxCenter.multiplyScalar(-1);

        mesh.traverse(function(child) {
          if (child instanceof THREE.Mesh) {
            child.geometry.translate(bboxCenter.x, bboxCenter.y, bboxCenter.z);
          }
        });

        objBbox.setFromObject(mesh);

        scene.add(mesh);
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
    //this.scene.add(cube);
  };

  const startAnimationLoop = () => {
    renderer.render(scene, camera);
    var requestID = window.requestAnimationFrame(startAnimationLoop());
  };
  useEffect(() => {
    handleWindowResize();
    sceneSetup();
    startAnimationLoop();
    window.addEventListener("resize", handleWindowResize());
  });
  const el = useRef(null);

  return <div style={{ height: "500px" }} ref={el} />;
}

export default Visualizer;
