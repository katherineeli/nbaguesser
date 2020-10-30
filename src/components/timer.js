import React, { Component } from 'react'
import '../styles/styles.css'

export default class Timer extends Component {
    state = {
        minutes: 3,
        seconds: 0,
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    componentDidUpdate(){
        if(!this.state.timedOut && this.state.minutes === 0 && this.state.seconds === 0){
            console.log('timer')
            this.setState({
                timedOut: true
            })
            this.props.timeoutCallback()
        }
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <div>
                { minutes === 0 && seconds === 0
                    ? <div className="h4" style={{color:"#17408B"}}>Busted!</div>
                    : <div className="num" style={{color:"#17408B"}}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
                }
            </div>
        )
    }
}