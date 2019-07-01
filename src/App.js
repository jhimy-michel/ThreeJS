import * as THREE from 'three'
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import React,{Component} from 'react'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

class App extends Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.initializeCamera = this.initializeCamera.bind(this);
    this.initializeOrbits = this.initializeOrbits.bind(this);
  }
componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    const scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    this.initializeOrbits();
    this.initializeCamera();
    

    var loader = new STLLoader();
				loader.load( 'test.stl', function ( geometry ) {
					var meshMaterial = new THREE.MeshBasicMaterial({ color: 0x009900, wireframe: true} );
          console.log(meshMaterial)

          var mesh = new THREE.Mesh( geometry, meshMaterial );
          console.log( mesh);
          /* mesh.position.set( 0, - 0.25, 0.6 );
          mesh.rotation.set( 0, - Math.PI / 2, 0 );
          mesh.scale.set( 0.5, 0.5, 0.5 ); */
					/* mesh.position.set( 0, - 0.25, 0.6 );
					mesh.rotation.set( 0, - Math.PI / 2, 0 );
					mesh.scale.set( 0.5, 0.5, 0.5 );
					mesh.castShadow = true;
					mesh.receiveShadow = true; */
					scene.add( mesh );
        },
        // called when loading is in progresses
        function ( xhr ) {
      
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      
        },
        // called when loading has errors
        function ( error ) {
      
          console.log( 'An error : ', error );
      
        }
    
    );

    this.animate(scene);
  }
componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    this.mount.removeChild(this.renderer.domElement);
  }
initializeOrbits() {
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
  }
initializeCamera() {
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 4;
  }
animate(scene) {
    //this.frameId = window.requestAnimationFrame(this.animate);
    this.renderer.render(scene, this.camera);
  }
render() {
    return (
      <div>
        <div
          id="boardCanvas"
          style={{ width: "80vw", height: "40vw" }}
          ref={mount => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}

export default App;