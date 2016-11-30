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

    getFirebaseData('CarlosP/0');

}

function getFirebaseData(table) {
    var database = firebase.database();
    var database_reference = database.ref('/' + table + '/')

    ReactDOM.render(
        <App database_reference={database_reference} />,
        document.getElementById('root')
    );
}



initializeFirebase();