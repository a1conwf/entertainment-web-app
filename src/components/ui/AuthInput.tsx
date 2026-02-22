import React from "react";

type AuthInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	error?: string;
};

const AuthInput: React.FC<AuthInputProps> = ({ error, className, ...props }) => {
	return (
		<div className="relative">
			<input
				className={`input pb-4 pl-4 text-base text-white border-b ${error ? "border-red focus:border-red" : "border-greyish-blue focus:border-white"} ${className || ""}`}
				{...props}
				autoComplete="on"
			/>
			{error && <p className="absolute bottom-5 right-0 text-sm text-red">{error}</p>}
		</div>
	);
};

export default AuthInput;
