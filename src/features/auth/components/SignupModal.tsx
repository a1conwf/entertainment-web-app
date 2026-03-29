import toast from "react-hot-toast";
import { useAuthStore } from "@/store";
import { AuthModalBase } from "./index";
import type { AuthFormValues } from "@/features/auth/components/AuthModalBase";
import { getAuthErrorMessage } from "@/features/auth/errorMessages";

const SignupModal: React.FC = () => {
	const signup = useAuthStore((state) => state.signup);
	const closeAuthModal = useAuthStore((state) => state.closeAuthModal);
	const openAuthModal = useAuthStore((state) => state.openAuthModal);

	const handleSignup = async ({ email, password }: AuthFormValues) => {
		try {
			await signup(email, password);
			toast.success("Account created successfully.");
			closeAuthModal();
		} catch (error) {
			console.error(error);
			toast.error(getAuthErrorMessage(error));
		}
	};

	return (
		<AuthModalBase
			title="Sign Up"
			submitLabel="Create an account"
			showRepeatPassword
			footerText="Already have an account?"
			footerActionText="Login"
			onFooterActionClick={() => openAuthModal("login")}
			onSubmit={handleSignup}
			onClose={closeAuthModal}
		/>
	);
};

export default SignupModal;
