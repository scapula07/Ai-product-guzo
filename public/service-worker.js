importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');



const firebaseConfig = {
    apiKey: "AIzaSyBCCrk78nJ-ipfhxDlodPoUlSgJSUP_jTo",
    authDomain: "guzo-v2.firebaseapp.com",
    projectId: "guzo-v2",
    storageBucket: "guzo-v2.appspot.com",
    messagingSenderId: "573309380008",
    appId: "1:573309380008:web:0ed1de3acffe7775ae299d",
    measurementId: "G-9TFLFQMJCH"
};
firebase.initializeApp(firebaseConfig);


const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };


  

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
  


