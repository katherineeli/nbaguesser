import React, { Component } from 'react'
import Modal from 'react-modal' // https://www.npmjs.com/package/react-modal
import '../styles/styles.css'
import '../../node_modules/bulma';
import firebase from './fireBase';

Modal.setAppElement('body');
const auth = firebase.auth();

// let user = auth.currentUser;

class NavBar extends Component {
    constructor () {
        super();
        this.state = {
            showModal: false,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.signOut = this.signOut.bind(this);
    }
    openModal () {
        this.setState({showModal: true});
    }

    closeModal () {
        this.setState({showModal: false});
    }

    async signOut() {
        auth.signOut();
        alert("Signed Out");
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
        let user = auth.currentUser;
        // let logIn;
        // if (user !== null) {
        //     logIn = <a className="navbar-item h2">{user}</a>;
        // } else {
        //     logIn = <a id="login" className="navbar-item h2" href="/login">LOGIN</a>
        // }
        return (
            <div id="navBar" className="navbar">
                <a id="title" className="h3 navTitle" href="/">NBA GUESSER</a> 
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <a id="leaderboard" className="navbar-item h2" onClick={this.openModal}>LEADERBOARD</a>
                        {/* { logIn } */}
                        <a id="login" className="navbar-item h2" href="/login">LOGIN</a>
                        <a id="signOut" className="navbar-item h2" onClick={this.signOut}>SIGN OUT</a>
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
                            </table>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default NavBar;