import axios from './axios/axios';
import {
  firebaseAuth,
  db,
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
} from './firebase/firebase';

export { axios, firebaseAuth, db, collection, doc, onSnapshot, setDoc, addDoc };
