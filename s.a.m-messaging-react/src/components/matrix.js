import React from "react";
import SpriteGenerator from "./spritegenerator";
import TextTerminal from "./textterminal";
import SendButton from "./sendbutton";

import "./matrix.css";

class Matrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      sprite: Array(8 * 8).fill(false),
      spriteSettings: [
        {
          brightness: 0,
          duration: 0
        }
      ],
      textSettings: [
        {
          font: 0,
          speed: 0,
          brightness: 0,
          loop: 0
        }
      ]
    };
  }

  toggleSpriteSquareActive(i) {
    const sprite = this.state.sprite.slice();
    sprite[i] = !sprite[i];
    this.setState({
      sprite: sprite
    });
  }

  onChangeTerminalMessage(message) {
    this.setState({
      message: message
    });
  }

  handleSpriteSendClick() {
    var sendData = {
      Sprite: this.state.sprite,
      Settings: {
        Brightness: this.state.spriteSettings.brightness,
        Duration: this.state.spriteSettings.duration
      }
    };
    console.log(sendData);
  }

  handleTextSendClick() {
    var sendData = {
      Message: this.state.message,
      Settings: {
        Font: this.state.spriteSettings.brightness,
        Speed: this.state.spriteSettings.speed,
        Brightness: this.state.spriteSettings.brightness,
        Loop: this.state.spriteSettings.loop
      }
    };
    console.log(sendData);
  }

  render() {
    return (
      <div>
        {/* Sprite / Text */}
        <div className="sprite-text-content-container">
          {/* Sprite Generator */}
          <div className="sprite-content-container">
            <SpriteGenerator
              sprite={this.state.sprite}
              onClick={(i) => this.toggleSpriteSquareActive(i)}
            />
          </div>
          {/* Text Terminal */}
          <div className="text-content-container">
            <TextTerminal
              onChange={(message) => this.onChangeTerminalMessage(message)}
            />
          </div>
        </div>
        {/* Send Button */}
        <div className="send-button-container">
          <div className="send-button-container-primary-background"></div>
          <div className="send-button-container-secondary-background">
            <div className="send-button-container-sprite">
              <SendButton onClick={() => this.handleSpriteSendClick()} />
            </div>
            <div className="send-button-container-text">
              <SendButton onClick={() => this.handleTextSendClick()} />
            </div>
          </div>
        </div>
        {/* Settings */}
      </div>
    );
  }
}

export default Matrix;
