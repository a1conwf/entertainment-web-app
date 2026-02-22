import type { MediaItem } from "../types";
import MediaCard from "./MediaCard";
import MediaCardSkeleton from "./MediaCardSkeleton";

type MediaGridProps = {
	items: MediaItem[];
	isLoading?: boolean;
	skeletonItems?: number;
};

const MediaGrid: React.FC<MediaGridProps> = ({ items, isLoading, skeletonItems }) => {
	const skeletonItemsArr = Array.from({ length: skeletonItems || 20 });

	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-7 md:gap-y-6 xl:grid-cols-4 xl:gap-x-10 xl:gap-y-8">
			{isLoading
				? skeletonItemsArr.map((_, index) => <MediaCardSkeleton key={index} />)
				: items.map((item) => <MediaCard key={`${item.media_type}-${item.id}`} item={item} />)}
		</div>
	);
};

export default MediaGrid;
