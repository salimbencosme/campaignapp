import * as firebase from 'firebase';

let config = {
  apiKey: "AIzaSyBRvcqtcy64WqRdk2hHtgx7ff1am7n8_gg",
  authDomain: "political-campaign.firebaseapp.com",
  databaseURL: "https://political-campaign.firebaseio.com",
  projectId: "political-campaign",
  storageBucket:  "political-campaign.appspot.com",
  messagingSenderId: "972194059950"
};

export default firebase.initializeApp(config);
