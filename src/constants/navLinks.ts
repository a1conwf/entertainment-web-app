import { ROUTES } from "./routes";

import homeIcon from "@/assets/svg/icon-nav-home.svg";
import moviesIcon from "@/assets/svg/icon-nav-movies.svg";
import tvSeriesIcon from "@/assets/svg/icon-nav-tv-series.svg";
import bookmarksIcon from "@/assets/svg/icon-nav-bookmark.svg";

export const NAV_LINKS = [
	{
		label: "home",
		icon: homeIcon,
		href: ROUTES.HOME,
	},
	{
		label: "movies",
		icon: moviesIcon,
		href: ROUTES.MOVIES,
	},
	{
		label: "tv-series",
		icon: tvSeriesIcon,
		href: ROUTES.TV_SERIES,
	},
	{
		label: "bookmarks",
		icon: bookmarksIcon,
		href: ROUTES.BOOKMARKS,
		authRequired: true,
	},
];
