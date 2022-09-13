import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from 'firebase/database';


const config = {
    apiKey: "AIzaSyAnhTX6iwvJhCs-8ofXFLBwavGYapWEWPQ",
    authDomain: "pizzaboy3-3e63b.firebaseapp.com",
    projectId: "pizzaboy3-3e63b",
    storageBucket: "pizzaboy3-3e63b.appspot.com",
    messagingSenderId: "297920974497",
    appId: "1:297920974497:web:3e24a113edbcdf5e95aae0",
    measurementId: "G-D780RV76TC",
    databaseURL: "https://pizzaboy3-3e63b-default-rtdb.firebaseio.com/"
};

const fire = firebase.initializeApp(config);
const auth = firebase.auth();
const database = getDatabase(fire);

export { database, auth };
export default fire;