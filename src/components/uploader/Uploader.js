import React, { useState } from "react";
//import STLViewer from "react-stl-obj-viewer";
import { STLViewer} from 'react-stl-obj-viewer';

function Uploader() {
  const [file, setFile] = useState("");
  console.log(file);
  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files)}></input>
      <STLViewer
        url="/home/jmichel/Documents/tesis/ThreeJS/public/test.stl"
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
