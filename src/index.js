import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';
import './index.css';


var credentials = require('./credentials.json');

function initializeFirebase() {
// Initialize Firebase

    console.log("Credentials is:", credentials);
    var config = {
        apiKey: credentials.apiKey,
        authDomain: credentials.authDomain,
        databaseURL: credentials.databaseURL,
    };

    firebase.initializeApp(config);
}

function getFirebaseData() {
    var database = firebase.database();

    ReactDOM.render(
        <App database={database} />,
        document.getElementById('root')
    );
}

initializeFirebase();
getFirebaseData();