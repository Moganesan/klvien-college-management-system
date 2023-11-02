import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBls76UenjJwxcpiruScHJ-u4pImjQ4iAk",
  authDomain: "fir-klvien.firebaseapp.com",
  projectId: "fir-klvien",
  storageBucket: "fir-klvien.appspot.com",
  messagingSenderId: "1028970982754",
  appId: "1:1028970982754:web:6152acaef605569d9c103b",
  measurementId: "G-VNREXF38P7",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

export default firebase;
