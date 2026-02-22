import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { User } from "firebase/auth";

import { auth } from "@/features/auth/firebase";
import {
	loginWithEmailPassword,
	logoutUser,
	signupWithEmailPassword,
	subscribeToAuthState,
} from "@/features/auth/api";

type AuthModalMode = "login" | "signup";

type AuthStore = {
	user: User | null;
	isAuthReady: boolean;
	lastUserId: string | null;
	currentUserId: string | null;
	authModalMode: AuthModalMode | null;
	initAuthListener: () => void;
	openAuthModal: (mode: AuthModalMode) => void;
	closeAuthModal: () => void;
	login: (email: string, password: string) => Promise<void>;
	signup: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
};

let authUnsubscribe: (() => void) | null = null;
const initialUser = auth.currentUser;

const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			user: initialUser,
			isAuthReady: Boolean(initialUser),
			lastUserId: initialUser?.uid ?? null,
			currentUserId: initialUser?.uid ?? null,
			authModalMode: null,
			initAuthListener: () => {
				if (authUnsubscribe) {
					return;
				}

				authUnsubscribe = subscribeToAuthState((user) => {
					const nextUserId = user?.uid ?? null;
					set({
						user,
						isAuthReady: true,
						lastUserId: nextUserId,
						currentUserId: nextUserId,
					});
				});
			},
			openAuthModal: (mode) => set({ authModalMode: mode }),
			closeAuthModal: () => set({ authModalMode: null }),
			login: async (email, password) => {
				await loginWithEmailPassword(email, password);
			},
			signup: async (email, password) => {
				await signupWithEmailPassword(email, password);
			},
			logout: async () => {
				set({ user: null, isAuthReady: true, lastUserId: null, currentUserId: null });
				await logoutUser();
			},
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				lastUserId: state.lastUserId,
				currentUserId: state.currentUserId,
			}),
		},
	),
);

export default useAuthStore;
