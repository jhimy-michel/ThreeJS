import React from "react";
import Visualizer from "./visualizer/Visualizer";
import ThreeFiberLoader from "./ThreeFiberLoader";

function Template() {
  //return <Visualizer />;
  return <ThreeFiberLoader url="/Fox.stl"></ThreeFiberLoader>;
}

export default Template;
