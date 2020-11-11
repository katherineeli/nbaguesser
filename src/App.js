import React, { Component } from "react";
import RenderPlayer from "./components/renderPlayer.js";
import NavBar from "./components/NavBar.js";
<<<<<<< HEAD
import Login from "./components/login.js";
import '../node_modules/bulma';
import './styles/styles.css';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';


=======
import '../node_modules/bulma';
import './styles/styles.css';



>>>>>>> 10cffb4737d49826fc285b4c1b84872b2a713a19
class App extends Component {

  render() {
    
    return (
      
      <div className="App">
<<<<<<< HEAD
        
        <NavBar/>
  
        <Router>
        <Route path={"/game"} component={RenderPlayer} />
        <Route path={"/login"} component={Login} />

        </Router>
      
=======
        <NavBar/>
        <RenderPlayer />
>>>>>>> 10cffb4737d49826fc285b4c1b84872b2a713a19
      </div>
    );
  }
}
export default App;
