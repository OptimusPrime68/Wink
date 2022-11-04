import React from "react";
import CircleLoader from "react-spinners/CircleLoader";
import "../styles/Loader.css";

function Loader() {
  return (
    <div class="lds-roller">
      <div></div>
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
