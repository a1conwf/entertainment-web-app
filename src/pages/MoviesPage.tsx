import { useMemo } from "react";
import { useMoviesQuery } from "@/features/media/queries";
import { useMediaSearch } from "@/features/media/hooks/useMediaSearch";
import type { MediaItem } from "@/features/media/types";
import { MediaGrid, SearchableMediaPage } from "@/features/media/components";

const getMovieSearchableText = (item: MediaItem) => item.title || "";

const MoviesPage: React.FC = () => {
	const { data = [], isLoading } = useMoviesQuery();
	const { searchQuery, setSearchQuery, isSearchMode, filteredItems } = useMediaSearch(
		data,
		getMovieSearchableText,
	);
	const defaultContent = useMemo(
		() => (
			<section className="mb-14">
				<h1 className="mb-6 xl:mb-10">Movies</h1>
				<MediaGrid items={data} isLoading={isLoading} skeletonItems={20} />
			</section>
		),
		[data, isLoading],
	);

	return (
		<SearchableMediaPage
			searchPlaceholder="Search for movies"
			searchQuery={searchQuery}
			onSearchQueryChange={setSearchQuery}
			isSearchMode={isSearchMode}
			filteredItems={filteredItems}
			defaultContent={defaultContent}
		/>
	);
};

export default MoviesPage;
