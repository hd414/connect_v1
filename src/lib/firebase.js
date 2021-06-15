import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const config = {
    apiKey: "AIzaSyBuCTYUCjh-Ki7-rvByJXTtgy7SieJcz7I",
    authDomain: "connect-1cebd.firebaseapp.com",
    projectId: "connect-1cebd",
    storageBucket: "connect-1cebd.appspot.com",
    messagingSenderId: "456318553815",
    appId: "1:456318553815:web:e48dbb3256378e3fa0aa92"
}

export const firebase = Firebase.initializeApp(config);


export const { FieldValue } = firebase.firestore;




