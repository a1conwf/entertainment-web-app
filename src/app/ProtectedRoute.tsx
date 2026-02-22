import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import useAuthStore from "@/store/authStore";
import { ROUTES } from "@/constants";

type ProtectedRouteProps = {
	children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { currentUserId } = useAuthStore();

	if (currentUserId) {
		return <>{children}</>;
	}

	return <Navigate to={ROUTES.HOME} replace />;
};

export default ProtectedRoute;
