import React, { Component } from "react";
import "./App.css";
import RenderPlayer from "./components/renderPlayer.js";

class App extends Component {
  render() {
    return (
      <div className="App">
                
        <form className="guess-player">
                    
          <input className="player-input" type="text" />
                  
        </form>
        <RenderPlayer />
              
      </div>
    );
  }
}
export default App;
