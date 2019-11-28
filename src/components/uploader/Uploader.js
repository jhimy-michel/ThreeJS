import React, { useState, useEffect } from "react";
//import STLViewer from "react-stl-obj-viewer";
import { STLViewer } from "react-stl-obj-viewer";
//import addBypassChecker from "electron-compile";
//import STLViewer from "../../three/STLViewer";

function Uploader() {
  //const [file, setFile] = useState([{ name: "" }]);
  const [model, setModel] = useState();

  var onchange = ({ target }) => {
    console.log(target.files);
    const { files } = target;
    const reader = new FileReader();
    reader.readAsArrayBuffer(files[0]);
    reader.onload = () => {
      console.log(reader);
      setModel(reader.result);
      //this.setState({ model: reader.result });
    };
    /* const addBypassChecker = require("electron-compile").addBypassChecker;
    addBypassChecker(filePath => {
      return /\.stl/.test(filePath);
    }); */
  };
  /* useEffect(() => {
    
  }, []) */
  return (
    <div>
      <input type="file" onChange={onchange}></input>
      <STLViewer
        modelColor="#B92C2C"
        lights={[[0.5, 1, -1], [1, 1, 1]]}
        rotate={true}
        model={model}
      />
    </div>
  );
}
export default Uploader;
