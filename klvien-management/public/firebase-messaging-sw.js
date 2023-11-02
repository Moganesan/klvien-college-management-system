// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
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

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
