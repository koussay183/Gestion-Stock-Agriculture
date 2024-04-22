import { auth , firestore } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

export const doCreateUserWithEmailAndPassword = async (email,
  password,
  fullName,
  phoneNumber,
  ville,
  pays,
  devise) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      // Store additional user data in Firestore
      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        fullName: fullName,
        phoneNumber: phoneNumber,
        ville: ville,
        pays: pays,
        devise: devise
      });
  
      return userCredential.user;
    } catch (error) {
      throw error;
    }
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};


export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/dashboard`,
  });
};
