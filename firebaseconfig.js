import firebase from "@firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDhsB4mw--bg4Rp8YJ73k8T4awfcL4Z7zw",
  authDomain: "k-mart-1cf75.firebaseapp.com",
  databaseURL: "https://k-mart-1cf75-default-rtdb.firebaseio.com/",
  projectId: "k-mart-1cf75",
  storageBucket: "k-mart-1cf75.appspot.com",
  messagingSenderId: "43837954833",
  appId: "1:43837954833:web:768248a59daa6d05704ab0",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
