import React, { Component } from 'react'
import STLLoaderModule from 'three-stl-loader'
const THREE = require('three')
//const STLLoader = require('three-stl-loader')(THREE)
const OrbitControls = require("three-orbit-controls")(THREE);

const STLLoader = STLLoaderModule(THREE)

export default class STL extends Component {

    constructor(props){

        super(props);
        this.animate = this.animate.bind(this);
        this.addCube = this.addCube.bind(this);
        this.initializeCamera = this.initializeCamera.bind(this);
        this.initializeOrbits = this.initializeOrbits.bind(this);
        //this.handle_load = this.handle_load.bind(this)

    }

    componentDidMount(){
        //screen size
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        //defining variables
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        this.initializeOrbits();
        this.initializeCamera();

        //Loading STL Files
        //const material = new THREE.MeshNormalMaterial();
        var loader = new STLLoader();
        loader.load( './test2.stl', function ( geometry ) {
            this.scene.add( new THREE.Mesh( geometry ) );
        });
        this.animate()
        
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

    animate(cube) {
    
        this.frameId = window.requestAnimationFrame(this.animate);
        //-------
        this.renderer.render(this.scene, this.camera);
        /* this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01; */
    
    }
    addCube(cube) {
    
        this.scene.add(cube);
    
    }
    componentDidCatch(error, info) {
        console.log(error, info)
    }
    render() {
        return (
        <div>
            <div
                id="boardCanvas"
                style = {{ width: "80vw", height: "40vw" }}
                ref={mount => {
                    this.mount = mount;
                }}
            />  
        </div>
        )
    } 
  
}
