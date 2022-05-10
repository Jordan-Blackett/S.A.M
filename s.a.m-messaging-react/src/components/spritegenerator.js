import { useState } from "react";
import "./spritegenerator.css";

function SpriteGenerator() {
  // --- Draw Sprite Table ----

  //function CreateTable() {
  const rows = 8;
  const cols = 8;
  const spritegrid = [];

  // Create Table
  for (let i = 0; i < rows; i++) {
    const tableColumn = [];
    for (let j = 0; j < cols; j++) {
      tableColumn.push(
        <>
          <SpriteSquare />
        </>
      );
    }
    spritegrid.push(<div style={{ display: "flex" }}>{tableColumn}</div>);
  }
  //}

  return (
    <div className="sprite-generator-container">
      <div className="spritesquare-container">{spritegrid}</div>
    </div>
  );
}

function SpriteSquare() {
  const [isActive, setActive] = useState("");

  function test() {
    setActive(!isActive);
  }

  return (
    <div
      className={isActive ? "spritesquare active" : "spritesquare"}
      onClick={test}
    ></div>
  );
}

export default SpriteGenerator;
