import { useMemo } from "react";

import { MediaGrid, SearchableMediaPage } from "@/features/media/components";
import { useMediaSearch } from "@/features/media/hooks/useMediaSearch";
import type { MediaItem } from "@/features/media/types";

import { useBookmarksStore, useAuthStore } from "@/store";

const getBookmarkSearchableText = (item: MediaItem) => item.title || item.name || "";

const BookmarksPage: React.FC = () => {
	const { bookmarksByUser } = useBookmarksStore();
	const { currentUserId } = useAuthStore();

	const bookmarks = useMemo(() => {
		if (!currentUserId) {
			return [];
		}

		return bookmarksByUser[currentUserId] ?? [];
	}, [bookmarksByUser, currentUserId]);

	const bookmarkedMovies = useMemo(
		() => bookmarks.filter((bookmark) => bookmark.media_type === "movie"),
		[bookmarks],
	);

	const bookmarkedTVSeries = useMemo(
		() => bookmarks.filter((bookmark) => bookmark.media_type === "tv"),
		[bookmarks],
	);

	const { searchQuery, setSearchQuery, isSearchMode, filteredItems } = useMediaSearch(
		bookmarks,
		getBookmarkSearchableText,
	);

	return (
		<>
			{bookmarks.length === 0 ? (
				<h1 className="text-center mt-8">No bookmarked shows yet...</h1>
			) : (
				<SearchableMediaPage
					searchPlaceholder="Search for bookmarked shows"
					searchQuery={searchQuery}
					onSearchQueryChange={setSearchQuery}
					isSearchMode={isSearchMode}
					filteredItems={filteredItems}
					defaultContent={
						<>
							{bookmarkedMovies.length > 0 && (
								<section className="mb-6 md:mb-10">
									<h1 className="mb-6 xl:mb-10">Bookmarked Movies</h1>
									<MediaGrid items={bookmarkedMovies} />
								</section>
							)}

							{bookmarkedTVSeries.length > 0 && (
								<section className="mb-10 xl:mb-16">
									<h1 className="mb-6 xl:mb-10">Bookmarked TV Series</h1>
									<MediaGrid items={bookmarkedTVSeries} />
								</section>
							)}
						</>
					}
				/>
			)}
		</>
	);
};

export default BookmarksPage;
