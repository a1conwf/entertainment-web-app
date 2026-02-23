import { useCallback } from "react";

import { useAuthStore, useBookmarksStore } from "@/store";
import type { MediaItem } from "../types";

export const useBookmarkActions = (item: MediaItem) => {
	const currentUserId = useAuthStore((state) => state.currentUserId);
	const openAuthModal = useAuthStore((state) => state.openAuthModal);
	const addBookmark = useBookmarksStore((state) => state.addBookmark);
	const removeBookmark = useBookmarksStore((state) => state.removeBookmark);

	const isBookmarked = useBookmarksStore(
		useCallback(
			(state: { bookmarksByUser: Record<string, MediaItem[]> }) => {
				if (!currentUserId) {
					return false;
				}

				const userBookmarks = state.bookmarksByUser[currentUserId] ?? [];
				return userBookmarks.some(
					(bookmark) => bookmark.id === item.id && bookmark.media_type === item.media_type,
				);
			},
			[currentUserId, item.id, item.media_type],
		),
	);

	const handleBookmarkToggle = useCallback(() => {
		if (!currentUserId) {
			openAuthModal("login");
			return;
		}

		if (isBookmarked) {
			removeBookmark(currentUserId, item);
			return;
		}

		addBookmark(currentUserId, item);
	}, [addBookmark, currentUserId, isBookmarked, item, openAuthModal, removeBookmark]);

	return {
		isBookmarked,
		handleBookmarkToggle,
	};
};
