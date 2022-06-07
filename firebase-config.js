import { initializeApp, } from 'firebase/app';
 const firebaseConfig = {
  apiKey: "AIzaSyABnfZ-e-fYRB9-D0NnhQU59S4QKC2xbNQ",
  authDomain: "e-commerceapp-84ea7.firebaseapp.com",
  databaseURL: "https://e-commerceapp-84ea7-default-rtdb.firebaseio.com",
  projectId: "e-commerceapp-84ea7",
  storageBucket: "e-commerceapp-84ea7.appspot.com",
  messagingSenderId: "279132883268",
  appId: "1:279132883268:web:52e525135693353582ef11"
};

const firebase=initializeApp(firebaseConfig);
export default firebase;
