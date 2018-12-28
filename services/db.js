import firebase from '@firebase/app';
import'@firebase/database';
import '@firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyAdTayoGyjr84Kl_sjBpn3uRY6x-CqDF_Y",
    authDomain: "potatosack-b92fd.firebaseapp.com",
    databaseURL: "https://potatosack-b92fd.firebaseio.com",
    projectId: "potatosack-b92fd",
    storageBucket: "potatosack-b92fd.appspot.com",
    messagingSenderId: "193201635033"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.database();
export {db,firebaseApp};