import * as firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: "AIzaSyC0T9TesBHUnBeKloIgFgo0jacHJFniTgo",
  authDomain: "localmarto.firebaseapp.com",
  databaseURL: "https://localmarto.firebaseio.com",
  projectId: "localmarto",
  storageBucket: "localmarto.appspot.com",
  messagingSenderId: "433981902780",
  appId: "1:433981902780:web:f472b0a62905c8035165b9",
});


// firebase.functions().useFunctionsEmulator('http://localhost:5001');

export type DocumentReference<T> = firebase.firestore.DocumentReference<T>;
export const deleteValue: any = firebase.firestore.FieldValue.delete();
export const Timestamp = firebase.firestore.Timestamp;
export const TaskState = firebase.storage.TaskState;
export const TaskEvent = firebase.storage.TaskEvent;

export const Storage = firebase.storage();
export const Firestore = firebase.firestore();
export const Functions = firebase.functions();
export const Auth = firebase.auth();
