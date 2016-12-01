import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';
import './index.css';

function initializeFirebase() {
// Initialize Firebase

    var config = {
        apiKey: "XXXXXXXXXXXXX",
        authDomain: "domain.firebaseapp.com",
        databaseURL: "https://domain.firebaseio.com",
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