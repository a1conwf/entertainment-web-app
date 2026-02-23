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
	try {
		const credential = await signInWithEmailAndPassword(auth, email, password);
		return credential.user;
	} catch (error) {
		console.error("Error logging in with email and password");
		throw error;
	}
};

export const signupWithEmailPassword = async (email: string, password: string) => {
	try {
		const credential = await createUserWithEmailAndPassword(auth, email, password);
		return credential.user;
	} catch (error) {
		console.error("Error signing up with email and password");
		throw error;
	}
};

export const logoutUser = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error("Error logging out");
		throw error;
	}
};

export const subscribeToAuthState = (callback: (user: User | null) => void): Unsubscribe => {
	try {
		const unsubscribe = onAuthStateChanged(auth, callback);
		return () => unsubscribe();
	} catch (error) {
		console.error("Error subscribing to auth state");
		throw error;
	}
};
