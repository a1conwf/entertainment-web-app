import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";
import { AuthModalBase } from "./index";
import type { AuthFormValues } from "./AuthModalBase";
import { getAuthErrorMessage } from "@/features/auth/errorMessages";

const LoginModal: React.FC = () => {
	const login = useAuthStore((state) => state.login);
	const closeAuthModal = useAuthStore((state) => state.closeAuthModal);
	const openAuthModal = useAuthStore((state) => state.openAuthModal);

	const handleLogin = async ({ email, password }: AuthFormValues) => {
		try {
			await login(email, password);
			toast.success("Logged in successfully.");
			closeAuthModal();
		} catch (error) {
			console.error(error);
			toast.error(getAuthErrorMessage(error));
		}
	};

	return (
		<AuthModalBase
			title="Login"
			submitLabel="Login to your account"
			footerText="Don't have an account?"
			footerActionText="Sign up"
			onFooterActionClick={() => openAuthModal("signup")}
			onSubmit={handleLogin}
			onClose={closeAuthModal}
		/>
	);
};

export default LoginModal;
