import React, { Component } from "react";
import RenderPlayer from "./components/renderPlayer.js";
import NavBar from "./components/NavBar.js";
import '../node_modules/bulma';
import './styles/styles.css';



class App extends Component {

  render() {
    return (
      <div className="App">
        <NavBar/>
        <RenderPlayer />
      </div>
    );
  }
}
export default App;
