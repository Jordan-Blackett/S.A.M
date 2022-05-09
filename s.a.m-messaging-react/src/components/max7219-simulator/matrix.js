import React from "react";
import "./maxsimulator.css";

function Matrix() {
  const rows = 8;
  const cols = 32;
  const dotsGrid = [];
  for (let i = 0; i < rows; i++) {
    const dotsColumn = [];
    for (let j = 0; j < cols; j++) {
      dotsColumn.push(
        <React.Fragment key={`cell-${i}:${j}`}>
          <Dot />
        </React.Fragment>
      );
    }
    dotsGrid.push(
      <React.Fragment key={`row-${i}`}>
        <div style={{ display: "flex" }}>{dotsColumn}</div>
      </React.Fragment>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "Column" }}>{dotsGrid}</div>
  );
}

function Dot() {
  return <div className="dot"></div>;
}

export default Matrix;