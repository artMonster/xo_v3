import firebase from 'firebase/app';
import firestore from 'firebase/firestore';

var config = {
    apiKey: "AIzaSyD4nwr6lTBHfyTZX8J1qS-Hv0OO2T2fkIg",
    authDomain: "xoapp-f73a1.firebaseapp.com",
    databaseURL: "https://xoapp-f73a1.firebaseio.com",
    projectId: "xoapp-f73a1",
    storageBucket: "xoapp-f73a1.appspot.com",
    messagingSenderId: "74588182061",
    appId: "1:74588182061:web:81cf9578944bb7702ecaa4",
    measurementId: "G-Y9Z3H084NB"
};
const firebaseApp = firebase.initializeApp(config);
//firebaseApp.firestore().settings({ timestampsInSnapshots: false });

export default firebaseApp.firestore();