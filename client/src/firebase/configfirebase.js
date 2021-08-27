import firebase from "firebase/app";

import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQ6IFpy7D-hakoFy_8EbASxFdQupy5RHo",
  authDomain: "products-courses.firebaseapp.com",
  projectId: "products-courses",
  storageBucket: "products-courses.appspot.com",
  messagingSenderId: "32231507909",
  appId: "1:32231507909:web:e855d22580ac210abcedac",
  measurementId: "G-E05BCYYRPH",
};
firebase.initializeApp(firebaseConfig);

const storageInProject = firebase.storage();

export { storageInProject };
