import React, { Component } from 'react'
import Modal from 'react-modal' // https://www.npmjs.com/package/react-modal
import '../styles/styles.css'
import '../../node_modules/bulma';
import firebase from './fireBase';

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

    // implement update on modal
    updateLeaderboard () {
        const db = firebase.firestore()

        db.collection("scores").orderBy("score", "desc").limit(10).get()
        .then(function(snapshot){
            snapshot.forEach(function(document){
                console.log(document.data().email)
                console.log(document.data().score)
            })
        })
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
                        <div className="table-container">
                            <table className="table is-fullwidth is-scrollable">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Username</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                {/* <div className="tableBody"> */}
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>bossman</td>
                                            <td>15</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>aanenow</td>
                                            <td>13</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>katli</td>
                                            <td>11</td>
                                        </tr><tr>
                                            <td>4</td>
                                            <td>schow99</td>
                                            <td>9</td>
                                        </tr><tr>
                                            <td>5</td>
                                            <td>willqin</td>
                                            <td>7</td>
                                        </tr><tr>
                                            <td>6</td>
                                            <td>clairesu</td>
                                            <td>4</td>
                                        </tr><tr>
                                            <td>7</td>
                                            <td>jonjon</td>
                                            <td>3</td>
                                        </tr><tr>
                                            <td>8</td>
                                            <td>yuxuan</td>
                                            <td>2</td>
                                        </tr><tr>
                                            <td>9</td>
                                            <td>bb</td>
                                            <td>1</td>
                                        </tr><tr>
                                            <td>10</td>
                                            <td>mzhang</td>
                                            <td>0</td>
                                        </tr><tr>
                                            <td>0</td>
                                            <td>user</td>
                                            <td>00</td>
                                        </tr><tr>
                                            <td>0</td>
                                            <td>user</td>
                                            <td>00</td>
                                        </tr>
                                        <tr>
                                            <td>0</td>
                                            <td>user</td>
                                            <td>00</td>
                                        </tr><tr>
                                            <td>0</td>
                                            <td>user</td>
                                            <td>00</td>
                                        </tr><tr>
                                            <td>0</td>
                                            <td>user</td>
                                            <td>00</td>
                                        </tr><tr>
                                            <td>0</td>
                                            <td>user</td>
                                            <td>00</td>
                                        </tr>
                                        <tr>
                                            <td>0</td>
                                            <td>user</td>
                                            <td>00</td>
                                        </tr><tr>
                                            <td>0</td>
                                            <td>user</td>
                                            <td>00</td>
                                        </tr><tr>
                                            <td>0</td>
                                            <td>user</td>
                                            <td>00</td>
                                        </tr>
                                    </tbody>
                                {/* </div> */}
                            </table>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default NavBar;