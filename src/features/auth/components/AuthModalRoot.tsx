import { useEffect } from "react";
import { createPortal } from "react-dom";
import { LoginModal, SignupModal } from "./index";
import useAuthStore from "@/store/authStore";

const AuthModalRoot: React.FC = () => {
	const authModalMode = useAuthStore((state) => state.authModalMode);
	const closeAuthModal = useAuthStore((state) => state.closeAuthModal);

	useEffect(() => {
		if (!authModalMode) {
			return;
		}

		const handleEscClose = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				closeAuthModal();
			}
		};

		window.addEventListener("keydown", handleEscClose);
		return () => window.removeEventListener("keydown", handleEscClose);
	}, [authModalMode, closeAuthModal]);

	if (!authModalMode) {
		return null;
	}

	return createPortal(
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-dark-blue/80 p-4"
			onClick={closeAuthModal}
		>
			<div
				className="w-full max-w-100"
				onClick={(event) => event.stopPropagation()}
				role="dialog"
				aria-modal="true"
			>
				{authModalMode === "login" ? <LoginModal /> : <SignupModal />}
			</div>
		</div>,
		document.body,
	);
};

export default AuthModalRoot;
