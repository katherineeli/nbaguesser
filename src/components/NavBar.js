import React, { Component } from "react";
import Modal from "react-modal"; // https://www.npmjs.com/package/react-modal
import "../styles/styles.css";
import "../../node_modules/bulma";
import firebase from "./fireBase";

Modal.setAppElement("body");

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      leaderboard: [],
      currentUser: null
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  // implement update on modal
  updateLeaderboard() {
    const db = firebase.firestore();
    let leaderData = [];
    let me = this
    db.collection("scores")
      .orderBy("score", "desc")
      .limit(20)
      .get()
      .then(function (snapshot) {
        let rank = 1;
        snapshot.forEach(function (document) {
          leaderData.push({
            rank: rank,
            email: document.data().email,
            score: document.data().score,
          });
          rank++;
        });
        console.log(leaderData);
        me.setState({
          leaderboard: leaderData,
        });
      });
  }

  componentDidMount(){
    let me = this
    firebase.auth().onAuthStateChanged(function(currentUser) {
        if (currentUser){
            me.setState({
                currentUser: currentUser
            })
        }
    })

  }

  componentDidUpdate(prev, state){
      if (!state.showModal & this.state.showModal){
        this.updateLeaderboard()
      }
  }

  render() {
    return (
      <div id="navBar" className="navbar">
        <a id="title" className="h3 navTitle" href="/">
          NBA GUESSER
        </a>
        <div className="navbar-menu">
          <div className="navbar-end">
            <a
              id="leaderboard"
              className="navbar-item h2"
              onClick={this.openModal}
            >
              LEADERBOARD
            </a>
            {/* TODO: change this to display userid when logged in + dropdown for sign out */}
            <a id="login" className="navbar-item h2" href="/login">
              {this.state.currentUser ? 'Welcome, ' + this.state.currentUser.email.split('@')[0] : 'LOGIN'}
            </a>
          </div>
        </div>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.closeModal}
          className="modal"
          overlayClassName="overlay"
        >
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
                <tbody id="leaderboard">
                  {this.state.leaderboard.map((x, index) => (
                    <tr key = {index}>
                      <td>{x.rank}</td>
                      <td>{x.email}</td>
                      <td>{x.score}</td>
                    </tr>
                  ))}
                </tbody>
                {/* </div> */}
              </table>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default NavBar;
