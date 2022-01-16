import React from "react";
import "./App.css";
import FeeCalculartor from "./screens/FeeCalculartor";

function App() {
  return (
    <>
      <div className="App">
        <FeeCalculartor />
      </div>
      <footer>
        <div>
          Made By
          <a href="http://baonguyendev.com"> Bao Nguyen</a>
        </div>
      </footer>
    </>
  );
}

export default App;
