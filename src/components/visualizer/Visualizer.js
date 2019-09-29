<<<<<<< HEAD:src/App.js
import React from "react";
import Visualizer from "../src/components/Visualizer";
import Visualizer2 from "../src/components/Visualizer2";
import { Container, Row, Col } from "reactstrap";

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Visualizer2 />
        </Col>
      </Row>
    </Container>
  );
=======
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import React, { Component } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MOUSE } from "three/build/three.module";

class Visualizer extends Component {
  componentDidMount() {
    this.sceneSetup();
    //this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
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
    this.raycaster = new THREE.Raycaster();

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
        this.mesh = new THREE.Mesh(geometry, this.material);
        var objBbox = new THREE.Box3().setFromObject(this.mesh);
        this.raycaster = new THREE.Raycaster();

        console.log(objBbox);
        var bboxCenter = objBbox.getCenter().clone();
        bboxCenter.multiplyScalar(-1);

        this.mesh.traverse(function(child) {
          if (child instanceof THREE.Mesh) {
            child.geometry.translate(bboxCenter.x, bboxCenter.y, bboxCenter.z);
          }
        });

        objBbox.setFromObject(this.mesh);

        this.scene.add(this.mesh);
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
  raycast(e) {
    this.mouse = { x: 0, y: 0 };
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    //console.log(this.mouse);
    //2. set the picking ray from the camera position and mouse coordinates
    this.raycaster.setFromCamera(this.mouse, this.camera);

    //3. compute intersections
    var intersects = this.raycaster.intersectObjects(this.scene.children);

    for (var i = 0; i < intersects.length; i++) {
      console.log(intersects[i]);
      this.mesh.material.color.setHex(0xffff00);
    }
  }
  startAnimationLoop = () => {
    //console.log("what up!")
    this.renderer.render(this.scene, this.camera);
    //this.renderer.render( this.scene, this.camera );
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };
  render() {
    return (
      <div
        //onMouseDown={e => this.raycast(e)}
        //onMouseLeave={e => this.raycast(e)}
        onMouseDownCapture={e => this.raycast(e)}
        onMouseUp={() => this.mesh.material.color.setHex(0x00ff00)}
        //onClick={e => this.raycast(e)}
        style={{ height: "500px" }}
        ref={ref => (this.el = ref)}
      />
    );
  }
>>>>>>> d4bba5db2c9f585f8bae8a2f2382b4f90c9868f4:src/components/visualizer/Visualizer.js
}

export default Visualizer;
