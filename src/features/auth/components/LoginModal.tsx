import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";
import { AuthModalBase } from "./index";

const LoginModal: React.FC = () => {
	const { login, closeAuthModal, openAuthModal } = useAuthStore();

	const handleLogin = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
		repeatPassword?: string;
	}) => {
		await login(email, password);
		toast.success("Logged in successfully.");
		closeAuthModal();
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
