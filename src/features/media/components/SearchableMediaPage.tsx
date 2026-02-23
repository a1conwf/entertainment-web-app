import { memo, useCallback } from "react";
import type { ChangeEvent, ReactNode } from "react";

import type { MediaItem } from "../types";

import SearchInput from "@/components/ui/SearchInput";
import MediaGrid from "./MediaGrid";

type SearchableMediaPageProps = {
	searchPlaceholder: string;
	searchQuery: string;
	onSearchQueryChange: (value: string) => void;
	isSearchMode: boolean;
	filteredItems: MediaItem[];
	defaultContent: ReactNode;
};

const SearchableMediaPage: React.FC<SearchableMediaPageProps> = ({
	searchPlaceholder,
	searchQuery,
	onSearchQueryChange,
	isSearchMode,
	filteredItems,
	defaultContent,
}) => {
	const trimmedSearchQuery = searchQuery.trim();
	const handleSearchInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			onSearchQueryChange(event.target.value);
		},
		[onSearchQueryChange],
	);

	return (
		<>
			<SearchInput
				placeholder={searchPlaceholder}
				value={searchQuery}
				onChange={handleSearchInputChange}
			/>

			{isSearchMode ? (
				<section className="mb-14">
					<h1 className="mb-4 md:mb-6">
						Found {filteredItems.length} results for &apos;{trimmedSearchQuery}&apos;
					</h1>
					<MediaGrid items={filteredItems} />
				</section>
			) : (
				defaultContent
			)}
		</>
	);
};

export default memo(SearchableMediaPage);
