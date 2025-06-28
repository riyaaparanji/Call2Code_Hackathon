// scripts/auth.js

import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// ---------- Google Login ----------
const googleBtn = document.getElementById("google-signin");
if (googleBtn) {
  const provider = new GoogleAuthProvider();

  googleBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const snap = await getDoc(userDocRef);

      // Create user if not exists
      if (!snap.exists()) {
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          role: "student" // default role
        });
      }

      window.location.href = "/pages/dashboard.html";
    } catch (error) {
      alert("Google Login failed: " + error.message);
    }
  });
}

// ---------- Email/Password Login ----------
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm["email"].value;
    const password = loginForm["password"].value;

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const userSnap = await getDoc(doc(db, "users", cred.user.uid));
      const role = userSnap.data().role;

      // Role-based redirect
      if (role === "student") window.location.href = "dashboard.html";
      else if (role === "club-board") window.location.href = "club-dashboard.html";
      else if (role === "student-council") window.location.href = "council-dashboard.html";
      else if (role === "admin") window.location.href = "admin-panel.html";
    } catch (err) {
      alert("Login error: " + err.message);
    }
  });
}
