import React from "react";
import "./Loader.css";
function Loader() {
  return (
    <div className="lds-ring mx-auto">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;