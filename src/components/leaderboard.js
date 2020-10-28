import React, { Component } from 'react'
import '../styles/styles.css'

class Leaderboard extends Component {
    render () {
        let open = this.state.open ? 'open' : 'closed';

        return (
            <div>
                <div id="bar" className={open}>

                </div>
            </div>
        )
    }
}

export default Leaderboard;