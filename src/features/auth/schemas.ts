import { z } from "zod";

export const loginSchema = z.object({
	email: z.email({ message: "Invalid email address" }),
	password: z.string().nonempty({ message: "Can't be empty" }),
});

export const signupSchema = z
	.object({
		email: z.email({ message: "Invalid email address" }),
		password: z.string().nonempty({ message: "Can't be empty" }),
		repeatPassword: z.string().nonempty({ message: "Passwords do not match" }),
	})
	.refine((data) => data.password === data.repeatPassword, {
		path: ["repeatPassword"],
		message: "Passwords do not match",
	});
