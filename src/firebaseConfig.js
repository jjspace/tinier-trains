import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyB5PuAoCDT_6vTyUf6KU0iIdJT9j2H1Zb8',
  authDomain: 'tinier-trains.firebaseapp.com',
  databaseURL: 'https://tinier-trains.firebaseio.com',
  projectId: 'tinier-trains',
  storageBucket: 'tinier-trains.appspot.com',
  messagingSenderId: '262101204328',
};
firebase.initializeApp(config);

export default firebase;