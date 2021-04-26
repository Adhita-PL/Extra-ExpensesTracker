import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyAyBQFd6vYm0oKY08wu_dNRvyoJ22oX0rE",
  authDomain: "empty-a50dc.firebaseapp.com",
  projectId: "empty-a50dc",
  storageBucket: "empty-a50dc.appspot.com",
  messagingSenderId: "16423506547",
  appId: "1:16423506547:web:cc613ab1c29316ef849006"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
