import React, { Component } from 'react'
import logos from './nbaCover.jpg'
import left from './left.jpg'
import right from './right.JPG'

import '../styles/styles.css'

export default class Home extends Component {

render(){
    return(
        <div>
        <div className="picture-container">
          <img src={logos}/>
          <img src={right} width = "300px"  align="right"/>
          <img src={left}  width = "280px" align="left"/>
          
          
          
        </div>
        <h1 class = "pic"> HULLO! Welcome to NBA Player Guesser! Are you a NBA fan? Do you keep up with current players and their stats? Get ready to be challenged by NBA Player Guesser! Click here to <a href="/login">Sign Up</a> or <a href="/login">Login!</a></h1>

        <h2 class = "pic"> How to play: When the games starts, you will have 3 minutes to guess as many NBA players as you can based on the given stat line. Type the NBA player's name in the search bar and click his name in the drop down. You can skip a player if you need to, but skipping will cost 4 seconds of you time. Do you have what it takes to get on and stay on our competitive leaderboard? GOOD LUCK!</h2> 
        </div>
    )
}

}