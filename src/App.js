import React, { Component } from "react";
import RenderPlayer from "./components/renderPlayer.js";
import NavBar from "./components/NavBar.js";
import Login from "./components/login.js";
import '../node_modules/bulma';
import './styles/styles.css';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';


class App extends Component {

  render() {
    
    return (
      
      <div className="App">
        
        <NavBar/>
  
        <Router>
        <Route path={"/game"} component={RenderPlayer} />
        <Route path={"/login"} component={Login} />

        </Router>
      
      </div>
    );
  }
}
export default App;
