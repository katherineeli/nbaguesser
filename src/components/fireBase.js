import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAxPHo1kbkqWu_ALGwR0ijJzG-E_Qdgd8s",
  authDomain: "nbaguesser.firebaseapp.com",
  databaseURL: "https://nbaguesser.firebaseio.com",
  projectId: "nbaguesser",
  storageBucket: "nbaguesser.appspot.com",
  messagingSenderId: "45637812149",
  appId: "1:45637812149:web:acbdf55d709b25f0d5a3fc",
  measurementId: "G-JVYLHEHGYB"
};

firebase.initializeApp(config);
export default firebase;