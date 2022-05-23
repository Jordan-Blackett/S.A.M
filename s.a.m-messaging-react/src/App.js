import HeaderBanner from "./components/headerbanner";
import StatusBanner from "./components/statusbanner";
import Matrix from "./components/matrix";

import MaxSimulator from "./components/max7219-simulator/maxsimulator";

import './App.css';

export default function App() {
  return (
    <div className="App">
      <HeaderBanner />
      <StatusBanner />
      <Matrix />
    </div>
  );
}