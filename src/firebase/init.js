  import firebase from 'firebase'
  import firestore from 'firebase/firestore'
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDEd60GObDFj72HW38VpM343KkgZ0xLSi0",
    authDomain: "smoothies-ninja-6c25c.firebaseapp.com",
    databaseURL: "https://smoothies-ninja-6c25c.firebaseio.com",
    projectId: "smoothies-ninja-6c25c",
    storageBucket: "smoothies-ninja-6c25c.appspot.com",
    messagingSenderId: "296445799800",
    appId: "1:296445799800:web:0ec613e25dd81b56"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
 // firebaseApp.firestore().settings( {timestampsInSnapshots: true})

  //export firestore database
  export default firebaseApp.firestore()