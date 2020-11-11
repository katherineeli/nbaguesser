import React, { Component } from "react";
import firebase from "./fireBase";
import { Redirect } from "react-router-dom";
import { isCompositeComponent } from "react-dom/test-utils";

const auth = firebase.auth();

class Login extends Component {
  constructor(props) {
    super();
    this.state = { toGame: false };
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  async signUp() {
    let errorMessage;
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    const promise = await auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .catch((e) => {
        errorMessage = e.code;
        alert(e.message);
      });

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
      this.setState({ toGame: true });
    }
  }

  async signOut() {
    auth.signOut();
    alert("Signed Out");
  }

  render() {
    return (
      <>
        {this.state.toGame ? <Redirect to="/game" /> : null}
        <div>
          <head>
            <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js"></script>
            <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js"></script>
            <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.6.1/firebase-ui-auth.css"/>
          </head>
          <body>
            <div id="formContainer" className="loginContent">
              <h1>LOGIN</h1>
              <h2>Username</h2>
              <input className="userInput" type="email" placeholder="email" id="email" />
              <h2>Password</h2>
              <input className="userInput" type="password" placeholder="password" id="password" />
              <br /><br/>
              <button className="button is-primary" onClick={this.signIn} id="signIn">Sign In</button>
              <button className="button is-light">Cancel</button>
              <br/>
              <button onClick={this.signOut} id="signOut">Sign Out</button>
              <br/><hr/>
              <h1>CREATE ACCOUNT</h1>
              <h2>Username</h2>
              <input className="userInput" type="email" placeholder="email" id="email"/>
              <h2>Password</h2>
              <input className="userInput" type="password" placeholder="password" id="password"/>
              <br />
              <br />
              <button className="button is-primary submit" onClick={this.signUp} id="signUp">Sign Up</button>
            </div>
            <div id="firebaseui-auth-container"></div>
            {/* <div id="loader">Loading...</div> */}
            <script src="fireBase.js"></script>
            <script src="temp.js" async defer></script>
          </body>
        </div>
      </>
    );
  }
}
export default Login;
