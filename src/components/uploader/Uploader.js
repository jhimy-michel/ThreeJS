import React, { useState } from "react";
//import STLViewer from "react-stl-obj-viewer";
import { STLViewer } from "react-stl-obj-viewer";

function Uploader() {
  const [file, setFile] = useState([{ name: "" }]);
  console.log(file);
  console.log(process.env.REACT_APP_PATH + file[0].name);
  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files)}></input>
      <STLViewer
        url={process.env.REACT_APP_PATH + file[0].name}
        width={400}
        height={400}
        modelColor="#B92C2C"
        backgroundColor="#EAEAEA"
        rotate={true}
        orbitControls={true}
      />
    </div>
  );
}
export default Uploader;
