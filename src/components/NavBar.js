import React, { Component } from 'react'
import Modal from 'react-modal' // https://www.npmjs.com/package/react-modal
import '../styles/styles.css'
import '../../node_modules/bulma';


Modal.setAppElement('body');

class NavBar extends Component {
    constructor () {
        super();
        this.state = {
            showModal: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal () {
        this.setState({showModal: true});
    }

    closeModal () {
        this.setState({showModal: false});
    }
    render () {
        return (
            <div id="navBar" className="navbar">
                <a id="title" className="h3 navTitle" href="/">NBA GUESSER</a> 
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <a id="leaderboard" className="navbar-item h2" onClick={this.openModal}>LEADERBOARD</a>
                        {/* TODO: change this to display userid when logged in + dropdown for sign out */}
                        <a id="login" className="navbar-item h2" href="/login">LOGIN</a>
                    </div>
                </div>
                <Modal isOpen={this.state.showModal}
                onRequestClose={this.closeModal}
                className="modal"
                overlayClassName="overlay">
                    <button className="delete" onClick={this.closeModal}></button>
                    <div className="modContent">
                        <h1>LEADERBOARD</h1>
                        <body>fill this in with leaderboard stats</body>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default NavBar;