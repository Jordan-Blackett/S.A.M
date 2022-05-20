import HeaderBanner from "./components/headerbanner";
import StatusBanner from "./components/statusbanner";
import SpriteGenerator from "./components/spritegenerator";
import TextTerminal from "./components/textterminal";
import SendButton from "./components/sendbutton";

import MaxSimulator from "./components/max7219-simulator/maxsimulator";

import './App.css';

function App() {
  return (
    <div className="App">
      <HeaderBanner />
      <StatusBanner />
      {/* Sprite / Text */}
      <div className="sprite-text-content-container">
        {/* Sprite Generator */}
        <div className="sprite-content-container">
          <SpriteGenerator />
        </div>
        {/* Text Terminal */}
        <div className="text-content-container">
          <TextTerminal />
        </div>
      </div>
      {/* Send Button */}
      <div className="send-button-container">
        <div className="send-button-container-primary-background"></div>
        <div className="send-button-container-secondary-background">
          <div className="send-button-container-sprite">
            <SendButton />
          </div>
          <div className="send-button-container-text">
            <SendButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;