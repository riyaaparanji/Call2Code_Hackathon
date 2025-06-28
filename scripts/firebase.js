import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyDdBUo5owS1zuMrccVwH_2zerdDDAvKMS8",
  authDomain: "club-management-hackathon.firebaseapp.com",
  projectId: "club-management-hackathon",
  storageBucket: "club-management-hackathon.firebasestorage.app",
  messagingSenderId: "341316073446",
  appId: "1:341316073446:web:275f1b3d5ec9565aa38827"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
