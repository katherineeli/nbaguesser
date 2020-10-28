import React, { Component } from 'react'
import Modal from 'react-modal'
import '../styles/styles.css'

Modal.setAppElement('body');

export default class Timer extends Component {
    constructor () {
        super();
        this.state = {
            minutes: 3,
            seconds: 0,
            showModal: false,
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal () {
        this.setState({showModal: true});
    }

    closeModal () {
        this.setState({showModal: false});
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

    render() {
        const { minutes, seconds } = this.state
        return (
            <div>
                { minutes === 0 && seconds === 0
                    ? <div onClick={this.openModal} /*open modal when time runs out instead*/> 
                        <div className="h4" style={{color:"#17408B"}}>Busted!</div>
                        <Modal isOpen = {this.state.showModal}
                        onRequestClose={this.closeModal}
                        className="modal"
                        overlayClassName="overlay">
                            <div className="modContent" style={{textAlign: "center"}}>
                                <h1>TIME'S UP</h1>
                                <h1>YOUR FINAL SCORE IS:</h1>
                            </div>
                            <button id="close" className="button is-light" onClick={this.closeModal}/*not working?*/>Close</button>
                            <button id="again" className="button is-primary">Play Again</button> 
                        </Modal>
                    </div>
                    : <div className="num" style={{color:"#17408B"}}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
                }
            </div>
        )
    }
}