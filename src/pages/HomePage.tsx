import { useMemo } from "react";

import { useRecommendedQuery, useTrendingQuery } from "@/features/media/queries";
import { MediaGrid, MediaSlider, SearchableMediaPage } from "@/features/media/components";
import { useMediaSearch } from "@/features/media/hooks/useMediaSearch";

const HomePage: React.FC = () => {
	const { data: recommendedData = [], isLoading: recommendedIsLoading } = useRecommendedQuery();
	const { data: trendingData = [], isLoading: trendingIsLoading } = useTrendingQuery();

	const uniqueItems = useMemo(() => {
		const allItems = [...trendingData, ...recommendedData];

		return Array.from(
			new Map(allItems.map((item) => [`${item.media_type}-${item.id}`, item])).values(),
		);
	}, [trendingData, recommendedData]);

	const { searchQuery, setSearchQuery, isSearchMode, filteredItems } = useMediaSearch(uniqueItems);

	return (
		<SearchableMediaPage
			searchPlaceholder="Search for movies or TV series"
			searchQuery={searchQuery}
			onSearchQueryChange={setSearchQuery}
			isSearchMode={isSearchMode}
			filteredItems={filteredItems}
			defaultContent={
				<>
					<section className="mb-6 md:mb-10">
						<h1 className="mb-4 md:mb-6">Trending</h1>
						<MediaSlider items={trendingData} isLoading={trendingIsLoading} skeletonItems={5} />
					</section>

					<section className="mb-14">
						<h2 className="mb-4 md:mb-6">Recommended for you</h2>
						<MediaGrid
							items={recommendedData}
							isLoading={recommendedIsLoading}
							skeletonItems={20}
						/>
					</section>
				</>
			}
		/>
	);
};

export default HomePage;
