import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const config = {
    apiKey: "AIzaSyCfpb8BF3puSorD3yaxpO_GO35_LMLPUZ0",
    authDomain: "pizzaboy-a7ab6.firebaseapp.com",
    projectId: "pizzaboy-a7ab6",
    storageBucket: "pizzaboy-a7ab6.appspot.com",
    messagingSenderId: "453084038974",
    appId: "1:453084038974:web:7d2aa691496038100cce6f",
    measurementId: "G-9KJQJ1G6Z9"
}
const fire = firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth };
export default fire;