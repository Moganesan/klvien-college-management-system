const firebase = require("firebase");

firebase.initializeApp({
  apiKey: "AIzaSyBls76UenjJwxcpiruScHJ-u4pImjQ4iAk",
  authDomain: "fir-klvien.firebaseapp.com",
  projectId: "fir-klvien",
  storageBucket: "fir-klvien.appspot.com",
  messagingSenderId: "1028970982754",
  appId: "1:1028970982754:web:6152acaef605569d9c103b",
  measurementId: "G-VNREXF38P7",
});

const firestore = firebase.firestore();
const auth = firebase.auth();

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

module.exports = { firestore, auth, firebase };
