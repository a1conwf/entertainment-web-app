import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "../schemas";
import { getAuthErrorMessage } from "../errorMessages";

import AuthInput from "@/components/ui/AuthInput";

type AuthFormValues = {
	email: string;
	password: string;
	repeatPassword?: string;
};

type AuthModalBaseProps = {
	title: string;
	submitLabel: string;
	showRepeatPassword?: boolean;
	footerText: string;
	footerActionText: string;
	onFooterActionClick: () => void;
	onSubmit: (values: AuthFormValues) => Promise<void>;
	onClose: () => void;
};

const AuthModalBase: React.FC<AuthModalBaseProps> = ({
	title,
	submitLabel,
	showRepeatPassword = false,
	footerText,
	footerActionText,
	onFooterActionClick,
	onSubmit,
	onClose,
}) => {
	const schema = showRepeatPassword ? signupSchema : loginSchema;
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit: handleFormSubmit,
		formState: { errors },
	} = useForm<AuthFormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
			password: "",
			repeatPassword: "",
		},
	});

	const handleSubmit = handleFormSubmit(async (values) => {
		setIsSubmitting(true);

		try {
			await onSubmit({
				email: values.email.trim(),
				password: values.password,
				repeatPassword: values.repeatPassword || "",
			});
		} catch (error) {
			toast.error(getAuthErrorMessage(error));
		} finally {
			setIsSubmitting(false);
		}
	});

	return (
		<div className="bg-semi-dark-blue rounded-[10px] p-6 md:rounded-[20px] md:p-8 relative">
			<button
				type="button"
				onClick={onClose}
				className="absolute top-4 right-4 bg-transparent text-white text-2xl leading-none hover:text-red"
				aria-label="Close auth modal"
			>
				&times;
			</button>

			<h1 className="mb-6 md:mb-8">{title}</h1>

			<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
				<AuthInput
					type="email"
					placeholder="Email address"
					{...register("email")}
					error={errors.email?.message}
				/>
				<AuthInput
					type="password"
					placeholder="Password"
					{...register("password")}
					error={errors.password?.message}
				/>
				{showRepeatPassword && (
					<AuthInput
						type="password"
						placeholder="Repeat password"
						{...register("repeatPassword")}
						error={errors.repeatPassword?.message}
					/>
				)}

				<button
					type="submit"
					className={`btn ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
					disabled={isSubmitting}
				>
					{isSubmitting ? "Please wait..." : submitLabel}
				</button>

				<p className="text-center">
					{footerText}{" "}
					<button
						type="button"
						onClick={onFooterActionClick}
						className="text-red bg-transparent p-0"
					>
						{footerActionText}
					</button>
				</p>
			</form>
		</div>
	);
};

export default AuthModalBase;
