// Firebase Auth
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { app } from "../services/authentication.js";
import admin from "firebase-admin";
// Firebase Firestore
import { db } from '../services/database.js';
import { FieldValue } from "firebase-admin/firestore";


// Initialize firebase config
const auth = getAuth(app);

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    let user = userCredential.user;
    const doc_ref = db.collection('CoursePlannerUsers').doc(user.uid);
    const user_info = await doc_ref.get();
    const firestore_data = user_info.data();
    const result = {...user, firestore_data};
    return res.cookie("access_token", `${userCredential._tokenResponse.idToken}`, { httpOnly: true, }).json({ message: result });
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      return res.status(403).json({ error: "Invalid email or password." });
    }
    return res.status(403).json({ error: error });
  }
};

export const register = async (req, res) => {
  const { email, password, username} = req.body;
  if( !email || !password || !username){
    return res.status(403).json({ error: "Invalid registration credentials. Please fill in your email, password, and username." });
  }

  const domain = email.split("@")[1];
  if (domain !== "uon.edu.au") {
    return res.status(403).json({ error: "Only UON students are allowed to register." });
  }

  try {
    // Proceed with registration
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // const profile = updateProfile(auth.currentUser, {displayName: username});

    await sendEmailVerification(userCredential.user);

    const docRef = db.collection('CoursePlannerUsers').doc(`${userCredential.user.uid}`);

    // const { displayName, email: _email, phoneNumber, photoURL	, uid } = userCredential.user;
    // await docRef.set({displayName, _email, phoneNumber, photoURL, uid});

    const { uid } = userCredential.user;
    const curr = new Date(Date.now());  
    const month = (curr.getMonth()+1).toString().padStart(2,"0");
    const day = curr.getDate().toString().padStart(2,"0");
    const padded_date = `${curr.getFullYear()}-${month}-${day}`;
    await docRef.set({uid, username, email, roles: 'Student', date: padded_date});

    return res.cookie("user", userCredential.user, { httpOnly: false }).json({ message: userCredential.user});
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      return res.status(403).json({ error: "Email already registered." });
    }
    console.error("Error during registration:", error.message);
    return res.status(403).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
  return res.clearCookie("access_token").json({ message: "User logged out successfully" });
  // return res.json({ message: "User logged out successfully" });
};

export const reset_password = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(422).json({ email: "Email is required" });
  }
  try {
    sendPasswordResetEmail(auth, email);
    return res.json({ message: "Password reset email sent successfully!" });
  } catch (error) {
    return res.status(403).json({ error: error });
  }
};

export const setAdmin = async (req, res) => {
  const { uid } = req.body;
  try{
    const user_ref = db.collection('CoursePlannerUsers').doc(`${uid}`);
    const roles = {roles: "admin"};
    await user_ref.set(roles,{ merge: true });
    return res.json({ message: "Successfully promoted user to admin."});
  }
  catch(error){
    console.log(error.code)
    return res.json({ error: "Failed to set " + displayName + " as admin."});
  }
};

export const removeAdmin = async (req, res) => {
  const { uid } = req.body;
  try{
    const user_ref = db.collection('CoursePlannerUsers').doc(`${uid}`);
    const roles = {roles: FieldValue.delete()};
    await user_ref.update(roles,{ merge: true });
    return res.json({ message: "Successfully removed admin role from user."});
  }
  catch(error){
    console.log(error.code)
    return res.json({ error: "Failed to remove " + displayName + "'s admin role."})
  }
};

export const delete_account = async (req, res) => {
  const { uid } = req.user;
  try{
    const result = await admin.auth().deleteUser(uid);
    res.json({ message: "Deleted successfully!"})
  }
  catch(error){
    if(error.code === 'auth/user-not-found'){
      res.json({ error: "User does not exist."})
    }
    res.json({ error: "Error deleting user."})
  }
};

export const verifyUserSayingHi = async (req, res) => {
  const { user } = req;
  return res.json({ message: user });
};