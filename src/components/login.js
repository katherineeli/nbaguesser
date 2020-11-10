import React, { Component } from 'react'
import firebase from './fireBase';
import { Redirect } from 'react-router-dom';
import { isCompositeComponent } from 'react-dom/test-utils';

const auth = firebase.auth();

 class Login extends Component {
  constructor(props) {
    super();
    this.state = {toGame : false}
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);

  }
    async signUp() {
      var errorMessage = "";
      var email = document.getElementById("email");
      var password = document.getElementById("password");
      const promise = await auth.createUserWithEmailAndPassword(email.value, password.value)
      .catch((e) => { 
        errorMessage = e.code;
        alert(e.message);
      });

      if (errorMessage === undefined) {
        this.setState({toGame: true})
      }
    }



    // "auth/invalid-email"
    // "auth/email-already-in-use"
    // "auth/wrong-password"
  
    async signIn() {
      var errorMessage;
      var email = document.getElementById("email");
      var password = document.getElementById("password");

      const promise = await auth.signInWithEmailAndPassword(email.value, password.value)
      .catch((e) => { 
        errorMessage = e.code;
        alert(e.message);
      });

      if (errorMessage === undefined) {
        this.setState({toGame: true})
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
        <html>
          <head>

            <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js"></script>
            <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js"></script>
            

            <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.6.1/firebase-ui-auth.css" />

          </head>



          <body>
            <h1>Login1</h1>
            <div id="formContainer">
              <div id="header"></div>
              <input type="email" placeholder="email" id="email" />
              <input type="password" placeholder="password" id="password" />

              <button onClick={this.signUp} id="signUp">Sign Up</button>
              <button onClick={this.signIn} id="signIn">Sign In</button>
              <button onClick={this.signOut} id="signOut">Sign Out</button>
            </div>

            <div id="firebaseui-auth-container"></div>
            {/* <div id="loader">Loading...</div> */}
            <script src="fireBase.js"></script>
            <script src="temp.js" async defer></script>

          </body>

        </html>
      </div>

      </>
    );
  };
}
export default Login;