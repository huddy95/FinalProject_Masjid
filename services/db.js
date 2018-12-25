import firebase from '@firebase/app';
import'@firebase/database';



const firebaseConfig = {
  apiKey: "AIzaSyAdTayoGyjr84Kl_sjBpn3uRY6x-CqDF_Y",
    authDomain: "potatosack-b92fd.firebaseapp.com",
    databaseURL: "https://potatosack-b92fd.firebaseio.com",
    projectId: "potatosack-b92fd",
    storageBucket: "potatosack-b92fd.appspot.com"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.database();