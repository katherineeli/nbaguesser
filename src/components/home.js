import React, { Component } from 'react'
import pic from './nbaLogos.jpg' 
import logos from './nbaCover.jpg'
import kobe from './Kobe.JPG'
import '../styles/styles.css'

export default class Home extends Component {

render(){
    return(
        <div>
        <div className="picture-container">
          <img src={logos} height="1500" align="center"/>
          <img src={pic} width="280" align="right"/>
          <img src={kobe} width="225" align="left"/>
          
        </div>
        <h1 class = "pic"> HULLO! Welcome to NBA Player Guesser! Are you a NBA fan? Do you keep up with current players and their stats? Get ready to be challenged by NBA Player Guesser! Scroll up to signup or login!</h1>
        </div>
    )
}

}