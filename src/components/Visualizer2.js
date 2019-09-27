import React, { useRef, useEffect, useState, useCallback } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";

function Visualizer2() {
  const mount = useRef(null);
  const [isAnimating, setAnimating] = useState(true);
  //let controls = useRef(null);

  useEffect(() => {
    let width = mount.current.clientWidth;
    let height = mount.current.clientHeight;
    //let frameId;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    //const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      wireframe: true
    });
    //const cube = new THREE.Mesh(geometry, material);
    //const controls = new OrbitControls(camera, mount);

    let loader = new STLLoader();
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

    camera.position.z = 85;
    //scene.add(cube);
    //renderer.setClearColor("#000000");
    renderer.setSize(width, height);

    const renderScene = () => {
      renderer.render(scene, camera);
      //window.requestAnimationFrame(renderScene());
    };

    const handleResize = () => {
      width = mount.current.clientWidth;
      height = mount.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderScene();
    };
    renderScene();
    let rotate = () => {
      let controls = new OrbitControls(camera, renderer);
      controls.update();
      initializeOrbits();
      renderScene();
    };

    var initializeOrbits = controls => {
      controls.rotateSpeed = 1.0;
      controls.zoomSpeed = 1.2;
      controls.panSpeed = 0.8;
    };
    mount.current.appendChild(renderer.domElement);
    window.addEventListener("resize", handleResize);
    window.addEventListener("contextmenu", rotate);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("contextmenu", rotate);
    };
  }, []);

  return (
    <div
      style={{ height: "500px" }}
      className="vis"
      ref={mount}
      onClick={() => setAnimating(!isAnimating)}
    />
  );
}

export default Visualizer2;
