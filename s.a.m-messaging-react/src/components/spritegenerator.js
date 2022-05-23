import React from "react";
import "./spritegenerator.css";

class SpriteGenerator extends React.Component {
  renderSquare(i) {
    return (
      <SpriteSquare
        value={this.props.sprite[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // --- Draw Sprite Table ----
    const rows = 8;
    const cols = 8;
    const spritegrid = [];

    let index = 0;
    // Create Table
    for (let i = 0; i < rows; i++) {
      const tableColumn = [];
      for (let j = 0; j < cols; j++) {
        tableColumn.push(<>{this.renderSquare(index)}</>);
        index += 1;
      }
      spritegrid.push(<div style={{ display: "flex" }}>{tableColumn}</div>);
    }

    return (
      <div className="sprite-generator-container">
        <div className="spritesquare-container">{spritegrid}</div>
      </div>
    );
  }
}

function SpriteSquare(props) {
  return (
    <button
      className={props.value ? "spritesquare active" : "spritesquare"}
      onClick={props.onClick}
    ></button>
  );
}

export default SpriteGenerator;