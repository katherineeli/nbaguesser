import React, { Component } from "react";
import Modal from "react-modal"; // https://www.npmjs.com/package/react-modal
import "../styles/styles.css";
import "../../node_modules/bulma";
import firebase from "./fireBase";

Modal.setAppElement("body");
const auth = firebase.auth();
const db = firebase.firestore()
class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      leaderboard: [],
      currentUser: null,
      name: null
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.signOut = this.signOut.bind(this);
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
    let me = this;
    db.collection("snames")
      .orderBy("score", "desc")
      .limit(20)
      .get()
      .then(function (snapshot) {
        let rank = 1;
        snapshot.forEach(function (document) {
          leaderData.push({
            rank: rank,
            name: document.data().name,
            score: document.data().score,
          });
          rank++;
        });
        me.setState({
          leaderboard: leaderData,
        });
      });
  }
  signOut() {
    auth.signOut();
  }

  componentDidMount() {
    let me = this;
    firebase.auth().onAuthStateChanged(function (currentUser) {
      if (currentUser) {
        firebase.firestore().collection("snames").doc(currentUser.email)
        .get()
        .then(function(doc){
          me.setState({
            currentUser: currentUser,
            name: doc.data().name
          });
        })
        
      } else {
        me.setState({
          currentUser: null,
        });
      }
    });
  }

  componentDidUpdate(prev, state) {
    if (!state.showModal & this.state.showModal) {
      this.updateLeaderboard();
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
          {this.state.currentUser ?
            <a
              id="game"
              className="h2 navbar-item"
              href="/game"
            >
              GAME
            </a>
            : ""} 
            <a
              id="leaderboard"
              className="navbar-item h2"
              onClick={this.openModal}
            >
              LEADERBOARD
            </a>
            <a id="login" className="navbar-item h2" href="/login">
              
              {this.state.currentUser
                ? "WELCOME, " + this.state.name.toUpperCase()
                : "LOGIN"}
            </a>
            
            {this.state.currentUser ?
            <a
              id="signOut"
              className="navbar-item h2"
              onClick={this.signOut}
              href="/login"
            >
              SIGN OUT
            </a>
            : ""} 
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
                  {/* {this.state.leaderboard.map(function(x, index){
                    firebase.firestore().collection("names").doc(x.email)
                    .get()
                    .then(function(doc){
                      return (<tr key={index}>
                      <td>{doc.data().name}</td>
                      <td>{x.score}</td>
                    </tr>)
                    }); */}
                    {/* {console.log(this.state.leaderboard)} */}
                    {this.state.leaderboard.map((x, index) => (
                    <tr key={index}>
                      <td>{x.rank}</td>
                      <td>{x.name}</td>
                      <td>{x.score}</td>
                    </tr>
                    ))}
               
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default NavBar;
