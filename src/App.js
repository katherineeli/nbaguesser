import React, { Component } from "react";
import "./App.css";
import RenderPlayer from "./components/renderPlayer.js";
import NavBar from "./components/navBar.js";
import Timer from "./components/timer.js";


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>       
        <Timer />
        <RenderPlayer />
              
      </div>
    );
  }
}
export default App;
