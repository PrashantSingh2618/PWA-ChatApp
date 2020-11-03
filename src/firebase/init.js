import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyCJIq8JLw7jEer7KYQnLBDgwMmTX_ywp7I",
  authDomain: "prashantchatapp.firebaseapp.com",
  databaseURL: "https://prashantchatapp.firebaseio.com",
  projectId: "prashantchatapp",
  storageBucket: "prashantchatapp.appspot.com",
  messagingSenderId: "121862080996",
  appId: "1:121862080996:web:46c76ef3a3d43738855ff1",
  measurementId: "G-J338C3D1MY"
};
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().settings({timestampsInSnapshots:true}) ;
  

  export default firebaseApp.firestore();
