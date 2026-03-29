import useBookmarksStore from "./bookmarksStore";
import type { MediaItem } from "@/features/media/types";

const firstItem: MediaItem = {
	id: 1,
	adult: false,
	backdrop_path: "/first.jpg",
	media_type: "movie",
	title: "First Movie",
};

const secondItem: MediaItem = {
	id: 2,
	adult: false,
	backdrop_path: "/second.jpg",
	media_type: "tv",
	name: "Second Show",
};

describe("bookmarksStore", () => {
	beforeEach(() => {
		useBookmarksStore.setState({ bookmarksByUser: {} });
		window.localStorage.clear();
	});

	it("adds bookmark per user", () => {
		useBookmarksStore.getState().addBookmark("user-1", firstItem);

		expect(useBookmarksStore.getState().bookmarksByUser["user-1"]).toEqual([firstItem]);
		expect(useBookmarksStore.getState().bookmarksByUser["user-2"]).toBeUndefined();
	});

	it("does not add duplicate bookmark for same user", () => {
		useBookmarksStore.getState().addBookmark("user-1", firstItem);
		useBookmarksStore.getState().addBookmark("user-1", firstItem);

		expect(useBookmarksStore.getState().bookmarksByUser["user-1"]).toHaveLength(1);
	});

	it("keeps bookmarks isolated between users", () => {
		useBookmarksStore.getState().addBookmark("user-1", firstItem);
		useBookmarksStore.getState().addBookmark("user-2", secondItem);

		expect(useBookmarksStore.getState().bookmarksByUser["user-1"]).toEqual([firstItem]);
		expect(useBookmarksStore.getState().bookmarksByUser["user-2"]).toEqual([secondItem]);
	});

	it("removes only target bookmark for target user", () => {
		useBookmarksStore.getState().addBookmark("user-1", firstItem);
		useBookmarksStore.getState().addBookmark("user-1", secondItem);
		useBookmarksStore.getState().addBookmark("user-2", firstItem);

		useBookmarksStore.getState().removeBookmark("user-1", firstItem);

		expect(useBookmarksStore.getState().bookmarksByUser["user-1"]).toEqual([secondItem]);
		expect(useBookmarksStore.getState().bookmarksByUser["user-2"]).toEqual([firstItem]);
	});
});
