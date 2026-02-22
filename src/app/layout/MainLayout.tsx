import NavBar from "@/components/shared/NavBar";
import AuthModalRoot from "@/features/auth/components/AuthModalRoot";

type MainLayoutProps = {
	children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<div className="flex flex-col h-screen xl:flex-row">
			<NavBar />
			<main className="flex-1 mx-4 md:mx-6 xl:mx-9">{children}</main>
			<AuthModalRoot />
		</div>
	);
};

export default MainLayout;
