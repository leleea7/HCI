import Firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC6wtSl2YHptJY9PxmD3gP9r_dWVk9xzfA",
    authDomain: "flashcards-d13ad.firebaseapp.com",
    databaseURL: "https://flashcards-d13ad.firebaseio.com",
    projectId: "flashcards-d13ad",
    storageBucket: "flashcards-d13ad.appspot.com",
    messagingSenderId: "490117055039"
  };
  
export default firebase = Firebase.initializeApp(config);