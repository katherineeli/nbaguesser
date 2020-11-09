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
            <div id="navBar" className="navBar">
                <div id="title" className="h3 navTitle" style={{color:"black"}}>NBA GUESSER</div> 
                <nav>
                    <a id="leaderboard" className="navButton h2" style={{left: 1194, color:"black", textDecoration:"none"}}>LEADERBOARD</a>
                    <a id="login" className="navButton h2" style={{left: 1376, color:"black", textDecoration:"none"}} onClick={this.openModal}>LOGIN</a>
                </nav>
                <Modal isOpen={this.state.showModal}
                onRequestClose={this.closeModal}
                className="modal"
                overlayClassName="overlay">
                    <h1 className="modTitle">LOGIN</h1>
                    <div className="modContent">
                        <h2>Username:</h2>
                        <input className="modInput"></input>
                        <h2>Password:</h2>
                        <input className="modInput"></input>
                        <button id="cancel" onClick={this.closeModal} className="button is-light">Cancel</button>
                        <button id="submit" className="button is-primary">Submit</button>
                        <div id="cont2">
                            <div className="bigbod" style={{color:"#A7A6A6", textAlign:'center'}}>OR</div>
                            <a className="h2" style={{color:"black", textAlign:'center'}}>CREATE AN ACCOUNT</a>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default NavBar;