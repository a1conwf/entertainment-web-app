import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { MediaItem } from "@/features/media/types";

type BookmarksStore = {
	bookmarksByUser: Record<string, MediaItem[]>;
	addBookmark: (userId: string, bookmark: MediaItem) => void;
	removeBookmark: (userId: string, bookmark: MediaItem) => void;
};

const useBookmarksStore = create<BookmarksStore>()(
	persist(
		(set) => ({
			bookmarksByUser: {},
			addBookmark: (userId: string, bookmark: MediaItem) =>
				set((state) => {
					const userBookmarks = state.bookmarksByUser[userId] || [];
					const alreadyExists = userBookmarks.some(
						(existingBookmark) =>
							existingBookmark.id === bookmark.id &&
							existingBookmark.media_type === bookmark.media_type,
					);

					if (alreadyExists) {
						return state;
					}

					return {
						bookmarksByUser: {
							...state.bookmarksByUser,
							[userId]: [...userBookmarks, bookmark],
						},
					};
				}),
			removeBookmark: (userId: string, bookmark: MediaItem) =>
				set((state) => ({
					bookmarksByUser: {
						...state.bookmarksByUser,
						[userId]: (state.bookmarksByUser[userId] || []).filter(
							(existingBookmark) =>
								!(
									existingBookmark.id === bookmark.id &&
									existingBookmark.media_type === bookmark.media_type
								),
						),
					},
				})),
		}),
		{
			name: "bookmarks-storage",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ bookmarksByUser: state.bookmarksByUser }),
		},
	),
);

export default useBookmarksStore;
