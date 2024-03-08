import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB34kGqtp6MGeU73nsfbXcCyTBZJ5ggfY4",
    authDomain: "crud-fire-react-4068b.firebaseapp.com",
    projectId: "crud-fire-react-4068b",
    storageBucket: "crud-fire-react-4068b.appspot.com",
    messagingSenderId: "1014322135196",
    appId: "1:1014322135196:web:4213a145dfe0e435fbad59"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)