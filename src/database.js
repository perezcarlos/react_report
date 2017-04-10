import firebase from 'firebase';

var credentials = require('./credentials.json');
var firebase_credentials = credentials.firebase;


function initializeFirebase() {
// Initialize Firebase

    var config = {
        apiKey: firebase_credentials.apiKey,
        authDomain: firebase_credentials.authDomain,
        databaseURL: firebase_credentials.databaseURL
    };

    firebase.initializeApp(config);
}

initializeFirebase();

export default firebase.database();
