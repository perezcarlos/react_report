import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';
import './index.css';


var credentials = require('./credentials.json');
var firebase_credentials = credentials.firebase;
var amazon3ws_credentials = credentials.amazon3ws;

function initializeFirebase() {
// Initialize Firebase

    var config = {
        apiKey: firebase_credentials.apiKey,
        authDomain: firebase_credentials.authDomain,
        databaseURL: firebase_credentials.databaseURL
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