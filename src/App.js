import React, { Component } from "react";
import RenderPlayer from "./components/renderPlayer.js";
import NavBar from "./components/NavBar.js";
import Timer from "./components/timer.js";


class App extends Component {
  state = {
    timeout: false
  }

  setTimeout(){
    this.setState({
      timeout: true
    })
  }

  render() {
    return (
      <div className="App">
        <NavBar/>       
        {/* <Timer timeoutCallback = {this.setTimeout.bind(this)}/> */}
        <RenderPlayer timeout = {this.state.timeout}/>
              
      </div>
    );
  }
}
export default App;
