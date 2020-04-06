import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBwhDLR71YEVJzoEYhWsUiH_oEDY6DPoWw",
  authDomain: "trivia-d0f40.firebaseapp.com",
  databaseURL: "https://trivia-d0f40.firebaseio.com",
  projectId: "trivia-d0f40",
  storageBucket: "trivia-d0f40.appspot.com",
  messagingSenderId: "712132445884",
  appId: "1:712132445884:web:1c16941763626996aef2b9",
  measurementId: "G-S8ZCR75P4Y",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;
