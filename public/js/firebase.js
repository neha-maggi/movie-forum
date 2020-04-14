
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDxDfLw4cdkOy4ob5UBGW53909_66jArM0",
    authDomain: "forum-7e779.firebaseapp.com",
    databaseURL: "https://forum-7e779.firebaseio.com",
    projectId: "forum-7e779",
    storageBucket: "forum-7e779.appspot.com",
    messagingSenderId: "695455954573",
    appId: "1:695455954573:web:c0a1b12c7ee7a4aa5594c4",
    measurementId: "G-D6KHSKWRV9"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();
