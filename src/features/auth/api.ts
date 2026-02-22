import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	type User,
	type Unsubscribe,
} from "firebase/auth";
import { auth } from "./firebase";

export const loginWithEmailPassword = async (email: string, password: string) => {
	const credential = await signInWithEmailAndPassword(auth, email, password);
	return credential.user;
};

export const signupWithEmailPassword = async (email: string, password: string) => {
	const credential = await createUserWithEmailAndPassword(auth, email, password);
	return credential.user;
};

export const logoutUser = async () => {
	await signOut(auth);
};

export const subscribeToAuthState = (callback: (user: User | null) => void): Unsubscribe => {
	return onAuthStateChanged(auth, callback);
};
