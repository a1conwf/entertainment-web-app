import toast from "react-hot-toast";
import { useAuthStore } from "@/store";
import { AuthModalBase } from "./index";

const SignupModal: React.FC = () => {
	const signup = useAuthStore((state) => state.signup);
	const closeAuthModal = useAuthStore((state) => state.closeAuthModal);
	const openAuthModal = useAuthStore((state) => state.openAuthModal);

	const handleSignup = async ({ email, password }: { email: string; password: string }) => {
		await signup(email, password);
		toast.success("Account created successfully.");
		closeAuthModal();
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
