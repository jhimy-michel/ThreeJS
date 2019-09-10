import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import React, { Component } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class App extends Component {
  componentDidMount() {
    this.sceneSetup();
    //this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener('resize', this.handleWindowResize);
  }
  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };
  sceneSetup = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );

    this.controls = new OrbitControls(this.camera, this.el);

    // set some distance from a cube that is located at z = 0
    this.camera.position.z = 85;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref

    /// ------ wiiiiii
    this.material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true
    });
    //const cube = new THREE.Mesh( geometry, material );
    var loader = new STLLoader();

    loader.load(
      "test.stl",
      geometry => {
        var mesh = new THREE.Mesh(geometry, this.material);
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

        this.scene.add(mesh);
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

  startAnimationLoop = () => {
    this.renderer.render(this.scene, this.camera);
    //this.renderer.render( this.scene, this.camera );
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };
  render() {
    return <div style={{ height: "500px" }} ref={ref => (this.el = ref)} />;
  }
}

export default App;
