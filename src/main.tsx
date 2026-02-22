import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { router } from "./app/router.tsx";
import { QueryProvider } from "./app/providers.tsx";
import { useAuthStore } from "./store";

import "./index.css";

useAuthStore.getState().initAuthListener();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryProvider>
			<RouterProvider router={router} />
			<Toaster position="top-center" />
		</QueryProvider>
	</StrictMode>,
);
