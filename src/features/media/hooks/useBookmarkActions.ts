import { useCallback, useMemo } from "react";

import { useAuthStore, useBookmarksStore } from "@/store";
import type { MediaItem } from "../types";

export const useBookmarkActions = (item: MediaItem) => {
	const { bookmarksByUser, addBookmark, removeBookmark } = useBookmarksStore();
	const { currentUserId, openAuthModal } = useAuthStore();

	const bookmarks = useMemo(
		() => (currentUserId ? (bookmarksByUser[currentUserId] ?? []) : []),
		[bookmarksByUser, currentUserId],
	);

	const isBookmarked = useMemo(
		() =>
			bookmarks.some(
				(bookmark) => bookmark.id === item.id && bookmark.media_type === item.media_type,
			),
		[bookmarks, item.id, item.media_type],
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
		bookmarks,
		isBookmarked,
		handleBookmarkToggle,
	};
};
