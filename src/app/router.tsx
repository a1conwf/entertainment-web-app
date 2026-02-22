import { createBrowserRouter, Outlet } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import { HomePage, BookmarksPage, MoviesPage, TVSeriesPage, NotFoundPage } from "../pages";
import { ROUTES } from "../constants";

export const router = createBrowserRouter([
	{
		element: (
			<MainLayout>
				<Outlet />
			</MainLayout>
		),
		children: [
			{
				path: ROUTES.HOME,
				element: <HomePage />,
			},
			{
				path: ROUTES.MOVIES,
				element: <MoviesPage />,
			},
			{
				path: ROUTES.TV_SERIES,
				element: <TVSeriesPage />,
			},
			{
				path: ROUTES.BOOKMARKS,
				element: (
					<ProtectedRoute>
						<BookmarksPage />
					</ProtectedRoute>
				),
			},
			{
				path: ROUTES.NOT_FOUND,
				element: <NotFoundPage />,
			},
		],
	},
]);
