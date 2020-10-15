import React, { Component } from 'react';
import '../styles/styles.css';


class NavBar extends Component {
    render () {
        return (
            <div id="navBar" className="navBar">
                <div id="title" className="h1 navTitle">NBA GUESSER</div> 
                <nav>
                    <a id="leaderboard" className="navButton h2" style={{left: 1194, color:"black", textDecoration:"none"}}>LEADERBOARD</a>
                    <a id="login" className="navButton h2" style={{left: 1376, color:"black", textDecoration:"none"}}>LOGIN</a>
                </nav>
            </div>
        )
    }
}

export default NavBar;