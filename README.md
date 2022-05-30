# murkina

Food related application in the making 🍕


## Local installation


1. initialize a firebase project in [firebase console](https://console.firebase.google.com/u/0/)
2. create a web app for firebase in project overview page
3. create a firestore database in firebase console
4. edit the firestore rules so that read and write actions can be performed
5. clone repository
```sh
git clone https://github.com/jkopi/murkina.git
```
6. install dependencies by running
```sh
yarn install
```
7. create a .env file into the project root (see .env.example) and paste in the firebase web app configuration
```
REACT_APP_FIREBASE_API_KEY="<apiKey>"
REACT_APP_FIREBASE_AUTH_DOMAIN="<authDomain>"
REACT_APP_FIREBASE_PROJECT_ID="<projectId>"
REACT_APP_FIREBASE_STORAGE_BUCKET="<storageBucket>"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="<messagingSender>"
REACT_APP_FIREBASE_APP_ID="<appId>"
REACT_APP_FIREBASE_MEASUREMENT_ID="<measurementId>"
``` 