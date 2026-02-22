import type { FirebaseError } from "firebase/app";

const AUTH_ERROR_MESSAGES: Record<string, string> = {
	"auth/invalid-email": "Please enter a valid email address.",
	"auth/invalid-credential": "Email or password is incorrect.",
	"auth/user-not-found": "No account found with this email.",
	"auth/wrong-password": "Email or password is incorrect.",
	"auth/email-already-in-use": "This email is already registered.",
	"auth/weak-password": "Password should be at least 6 characters.",
	"auth/too-many-requests": "Too many attempts. Please try again later.",
	"auth/network-request-failed": "Network error. Check your connection and try again.",
};

export const getAuthErrorMessage = (error: unknown) => {
	const firebaseError = error as FirebaseError;
	return AUTH_ERROR_MESSAGES[firebaseError?.code] || "Authentication failed. Please try again.";
};
