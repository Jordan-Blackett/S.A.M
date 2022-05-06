import React from "react";
import Matrix from "./matrix";
import "./maxsimulator.css";

function Maximulator() {
  return (
    <div className={"background active"}>
      <Modal />
    </div>
  );
}

function Modal() {
  return (
    <div className="popup-content scrolling">
      <svg
        className="close-button"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="inherit"
          d="M7.05022 7.05028C6.65969 7.4408 6.65969 8.07397 7.05022 8.46449L10.5858 12L7.05023 15.5356C6.6597 15.9261 6.6597 16.5593 7.05023 16.9498C7.44075 17.3403 8.07392 17.3403 8.46444 16.9498L12 13.4142L15.5355 16.9498C15.926 17.3403 16.5592 17.3403 16.9497 16.9498C17.3402 16.5592 17.3402 15.9261 16.9497 15.5356L13.4142 12L16.9497 8.46449C17.3402 8.07397 17.3402 7.4408 16.9497 7.05028C16.5592 6.65976 15.926 6.65976 15.5355 7.05028L12 10.5858L8.46443 7.05028C8.07391 6.65975 7.44074 6.65975 7.05022 7.05028Z"
        ></path>
      </svg>
      <h1> Scrolling Text Mode</h1>
      <div className="matrix-container">
        <p className="container-header">S.A.M</p>
        <div style={{ overflow: "hidden" }}>
          <Matrix />
        </div>
      </div>
    </div>
  );
}

export default Maximulator;
