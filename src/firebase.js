import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPyiIOXdTS6LfiuUKJiDuhvG7a3z7gjqs",
  authDomain: "opase-5f032.firebaseapp.com",
  projectId: "opase-5f032",
  storageBucket: "opase-5f032.appspot.com",
  messagingSenderId: "285829397938",
  appId: "1:285829397938:web:6ecc58868cc8f1449db8ab",
  measurementId: "G-CG73SV6W3H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export { db, storage };

export const getTokenFirebase = () => {
  return getToken(messaging, { vapidKey: "BCe6kH3vUo0OFcJ1Z7P1BuKeMb98apm5Uy5eSCL41uj6jiHzPJkfouKsrKDHypNMsOa86pIfKSxQOGqUEKSCSB8" })
    .then((currentToken) => {
      if (currentToken) {
        // console.log("current token for client: ", currentToken);
        return currentToken;
      } else {
        console.log("No registration token available. Request permission to generate one.");
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
};
