import React, { useEffect } from 'react';
import firestore from "@react-native-firebase/firestore";

//const app = initializeApp(firebaseConfig);
const database = firestore();

export default database;
