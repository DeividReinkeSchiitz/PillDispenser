import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCuQEuzcNeMk-It2M8CjJHn5d7Yq9Ijd10",
  authDomain: "pills-dispenser-613f5.firebaseapp.com",
  projectId: "pills-dispenser-613f5",
  storageBucket: "pills-dispenser-613f5.appspot.com",
  messagingSenderId: "868680362424",
  appId: "1:868680362424:web:b62c4963de8231581b874d",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;
