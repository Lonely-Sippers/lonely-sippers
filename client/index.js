import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCuRy6HDzETNt6TdjUz1fpJGCwk_kLDHpw',
    authDomain: 'lonely-sippers.firebaseapp.com',
    projectId: 'lonely-sippers',
    storageBucket: 'lonely-sippers.appspot.com',
    messagingSenderId: '258715947899',
    appId: '1:258715947899:web:40f9d6c38ff5dc4532a3de',
    measurementId: 'G-2SCZTBE1L5',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
)
