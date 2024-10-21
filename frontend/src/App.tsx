import React from "react";
import { RateChart } from "./components/RateChart";

const App: React.FC = () => {
  return (
    <div className="App">
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "24px",
          color: "#000000",
        }}
      >
        pufETH Conversion Rate Tracker
      </h2>
      <RateChart />
    </div>
  );
};

export default App;
