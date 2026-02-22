import { useTVSeriesQuery } from "@/features/media/queries";
import { useMediaSearch } from "@/features/media/hooks/useMediaSearch";
import type { MediaItem } from "@/features/media/types";
import { MediaGrid, SearchableMediaPage } from "@/features/media/components";

const getTVSeriesSearchableText = (item: MediaItem) => item.name || "";

const TVSeriesPage: React.FC = () => {
	const { data = [], isLoading } = useTVSeriesQuery();
	const { searchQuery, setSearchQuery, isSearchMode, filteredItems } = useMediaSearch(
		data,
		getTVSeriesSearchableText,
	);

	return (
		<SearchableMediaPage
			searchPlaceholder="Search for TV series"
			searchQuery={searchQuery}
			onSearchQueryChange={setSearchQuery}
			isSearchMode={isSearchMode}
			filteredItems={filteredItems}
			defaultContent={
				<section className="mb-14">
					<h1 className="mb-6 xl:mb-10">TV Series</h1>
					<MediaGrid items={data} isLoading={isLoading} skeletonItems={20} />
				</section>
			}
		/>
	);
};

export default TVSeriesPage;
