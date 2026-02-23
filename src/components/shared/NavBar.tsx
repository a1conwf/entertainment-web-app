import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

import { NAV_LINKS, ROUTES } from "@/constants";
import { useAuthStore } from "@/store";

import logoIcon from "@/assets/svg/logo.svg";
import loginIcon from "@/assets/svg/icon-login.svg";
import logoutIcon from "@/assets/svg/icon-logout.svg";

const NavBar: React.FC = () => {
	const currentUser = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);
	const openAuthModal = useAuthStore((state) => state.openAuthModal);

	const isAuthenticated = Boolean(currentUser);

	const handleLogout = async () => {
		await logout();
		toast.success("Logged out successfully.");
	};

	return (
		<nav className="bg-semi-dark-blue flex items-center justify-between min-h-14 px-4 md:min-h-18 md:px-6 md:rounded-[10px] md:m-6 xl:flex-col xl:m-8 xl:rounded-[20px] xl:p-8 xl:justify-start">
			<NavLink to={ROUTES.HOME}>
				<img src={logoIcon} alt="logo-icon" className="cursor-pointer" />
			</NavLink>

			<ul className="flex items-center gap-6 md:gap-8 xl:gap-10 xl:flex-col xl:mt-18.75">
				{NAV_LINKS.filter((link) => !link.authRequired || isAuthenticated).map((link) => (
					<li key={link.label}>
						<NavLink to={link.href}>
							{({ isActive }) => (
								<img
									src={link.icon}
									alt={`${link.label}-icon`}
									className={`w-4 h-4 cursor-pointer ${isActive ? "brightness-0 invert" : "icon-hover-red"} md:w-5 md:h-5`}
								/>
							)}
						</NavLink>
					</li>
				))}
			</ul>

			{isAuthenticated ? (
				<button type="button" onClick={handleLogout} className="xl:mt-auto" aria-label="Logout">
					<img
						src={logoutIcon}
						alt="logout-icon"
						className="w-4 h-4 icon-default-blue icon-hover-red md:w-5 md:h-5"
					/>
				</button>
			) : (
				<button
					type="button"
					onClick={() => openAuthModal("login")}
					className="xl:mt-auto"
					aria-label="Login"
				>
					<img
						src={loginIcon}
						alt="login-icon"
						className="w-4 h-4 icon-default-blue icon-hover-red md:w-5 md:h-5"
					/>
				</button>
			)}
		</nav>
	);
};

export default NavBar;
