import React, { Component } from "react";
import firebase from "./fireBase";
import { Redirect } from "react-router-dom";
import NavBar from "./NavBar.js";
import { isCompositeComponent } from "react-dom/test-utils";

const auth = firebase.auth();
const db = firebase.firestore();

class Login extends Component {
  constructor(props) {
    super();
    this.state = { toGame: false, currentUser: null, email: null };
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.updateName = this.updateName.bind(this);
  }
  async signUp() {
    let errorMessage;
    let email = document.getElementById("createEmail");
    let password = document.getElementById("createPassword");
    let name = document.getElementById("createName");
    const promise = await auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .catch((e) => {
        errorMessage = e.code;
        alert(e.message);
      });
     // console.log(name.value)
    if (promise){
      console.log(db.collection("snames").doc(email.value));
      db.collection("snames").doc(email.value)
      .set({
        email: email.value,
        name: name.value,
        score: 0
      })
      this.setState({
        email: email.value
      })
    }
  

    if (errorMessage === undefined) {
      this.setState({ toGame: true });
    }
  }

  // "auth/invalid-email"
  // "auth/email-already-in-use"
  // "auth/wrong-password"

  async signIn() {
    let errorMessage;
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    const promise = await auth
      .signInWithEmailAndPassword(email.value, password.value)
      .catch((e) => {
        errorMessage = e.code;
        alert(e.message);
      });

    if (errorMessage === undefined) {
      this.setState({ toGame: true});
    }
  }

  async deleteUser(){
    if (firebase.auth().currentUser) {
      firebase.auth().currentUser.delete()
      .catch((e) => {
        alert(e)
      })
    }
  }

   updateName(){
    let name = document.getElementById("updateName").value
    
    db.collection("snames").doc(this.state.email).update({"name": name})
    db.collection("snames").doc(this.state.email).get().then(
      function(doc) {
        console.log(doc.data().name);
      }
    );
    this.setState({ toGame: true});
  }

  componentDidMount() {
    let me = this;
    firebase.auth().onAuthStateChanged(function (currentUser) {
      if (currentUser) {
        me.setState({
          currentUser: currentUser,
          email: currentUser.email
        });
      } else {
        me.setState({
          currentUser: null,
          email: null
        });
      }
    });
  }

  render() {
    return (
      <>
        {this.state.toGame ? <Redirect to="/game" /> : null}
        <NavBar/>
        <div>
          <head>
            <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js"></script>
            <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js"></script>
            <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.6.1/firebase-ui-auth.css"/>
          </head>
          <body>
            <div id="formContainer" className="loginContent">
              <h1>LOGIN</h1>
              <h2>Email</h2>
              <input className="userInput" type="email" placeholder="email" id="email" />
              <h2>Password</h2>
              <input className="userInput" type="password" placeholder="password" id="password" />
              <br /><br/>
              <button className="button is-primary" onClick={this.signIn} id="signIn">Sign In</button>
              
              <br/>
              <br/><hr/>
              {this.state.currentUser ?
              <div>
                <h1>UPDATE DISPLAY NAME</h1>
                <h2>Display Name</h2>
              <input className="userInput" type="text" placeholder="name" id="updateName"/>
              <br />
              <br />
              <button className="button is-primary submit" onClick={this.updateName} id="Update">Update</button>
              <button style = {{width: 118, backgroundColor: '#C9082A', color: 'white'}} className="button" onClick={this.deleteUser} id="deleteUser">Delete Account</button>
              </div>
              : 
              <div>
              <h1>CREATE ACCOUNT</h1>
              <h2>Email</h2>
              <input className="userInput" type="email" placeholder="email" id="createEmail"/>
              <h2>Password</h2>
              <input className="userInput" type="password" placeholder="password" id="createPassword"/>
              <h2>Display Name</h2>
              <input className="userInput" type="text" placeholder="name" id="createName"/>
              <br />
              <br />
              <button className="button is-primary submit" onClick={this.signUp} id="signUp">Sign Up</button>
              </div>
              }
              
             
              
            </div>
            <div id="firebaseui-auth-container"></div>
            
            <script src="fireBase.js"></script>
            <script src="temp.js" async defer></script>
          </body>
        </div>
      </>
    );
  }
}
export default Login;


/*
{this.state.leaderboard.map((x, index) => (
                    <tr key={index}>
                      <td>{x.rank}</td>
                      <td>{x.email}</td>
                      <td>{x.score}</td>
                    </tr>
                  ))}*/