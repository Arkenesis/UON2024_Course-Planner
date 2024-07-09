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
    const user = userCredential.user;
    return res.cookie("access_token", `${userCredential._tokenResponse.idToken}`, { httpOnly: true, }).json({ message: userCredential.user });
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      return res.status(403).json({ error: "Invalid email or password." });
    }
  }
};

export const register = async (req, res) => {
  const { email, password, username} = req.body;
  if( !email || !password || !username){
    return res.status(403).json({ error: "Invalid register credentials. Kindly fill in the information of email, password and username." });
  }

  const domain = email.split("@")[1];
  if (domain !== "uon.edu.au") {
    return res.status(403).json({ error: "Only UON students are allowed to register." });
  }

  try {
    // Proceed with registration
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const profile = updateProfile(auth.currentUser, {displayName: username});
    await sendEmailVerification(userCredential.user);
    const docRef = db.collection('CoursePlannerUsers').doc(`${userCredential.user.uid}`);
    const { displayName, email: _email, phoneNumber, photoURL	, uid } = userCredential.user;
    await docRef.set({displayName, _email, phoneNumber, photoURL, uid});
    return res.cookie("user", userCredential.user, { httpOnly: false }).json({ message: userCredential.user});
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      return res.status(403).json({ error: "Email already registered on the website." });
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
  return res.clearCookie("access_token");
  return res.json({ message: "User logged out successfully" });
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
    return res.json({ message: "Successfully promote user to admin."});
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
    return res.json({ message: "Successfully remove user from admin."});
  }
  catch(error){
    console.log(error.code)
    return res.json({ error: "Failed to remove " + displayName + " admin roles."})
  }
};

export const delete_account = async (req, res) => {
  const { uid } = req.user;
  try{
    const result = await admin.auth().deleteUser(uid);
    res.json({ message: "Delete successfully!"})
  }
  catch(error){
    if(error.code === 'auth/user-not-found'){
      res.json({ error: "User does not exist."})
    }
    res.json({ error: "Error in deleting user."})
  }
};

export const verifyUserSayingHi = async (req, res) => {
  const { user } = req;
  return res.json({ message: user });
};