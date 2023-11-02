import firebase from "firebase";
const firebaseConfig = {
  apiKey: "################################",
  authDomain: "################################",
  projectId: "################################",
  storageBucket: "################################",
  messagingSenderId: "################################",
  appId: "################################",
  measurementId: "################################",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

export default firebase;
