import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";



const firebaseConfig = {
    apiKey: "AIzaSyBCCrk78nJ-ipfhxDlodPoUlSgJSUP_jTo",
    authDomain: "guzo-v2.firebaseapp.com",
    projectId: "guzo-v2",
    storageBucket: "guzo-v2.appspot.com",
    messagingSenderId: "573309380008",
    appId: "1:573309380008:web:0ed1de3acffe7775ae299d",
    measurementId: "G-9TFLFQMJCH"
};



const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title ;
    const notificationOptions = {
      body:payload.notification.body,
      icon: '/guzo-main.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
  