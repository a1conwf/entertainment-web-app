import { useMemo, useState } from "react";
import type { MediaItem } from "../types";

const getDefaultSearchableText = (item: MediaItem) =>
	`${item.title || ""} ${item.name || ""} ${item.original_name || ""}`.trim().toLowerCase();

export const useMediaSearch = (
	items: MediaItem[],
	getSearchableText: (item: MediaItem) => string = getDefaultSearchableText,
) => {
	const [searchQuery, setSearchQuery] = useState("");

	const normalizedSearchQuery = searchQuery.trim().toLowerCase();
	const isSearchMode = normalizedSearchQuery.length > 0;

	const filteredItems = useMemo(
		() =>
			items.filter((item) => {
				const searchableText = getSearchableText(item).trim().toLowerCase();
				return searchableText.includes(normalizedSearchQuery);
			}),
		[items, getSearchableText, normalizedSearchQuery],
	);

	return {
		searchQuery,
		setSearchQuery,
		isSearchMode,
		filteredItems,
	};
};
