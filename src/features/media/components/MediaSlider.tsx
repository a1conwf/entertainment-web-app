import { Splide, SplideSlide } from "@splidejs/react-splide";
import type { MediaItem } from "../types";
import MediaCard from "./MediaCard";
import MediaCardSkeleton from "./MediaCardSkeleton";

import "@splidejs/react-splide/css";

type MediaSliderProps = {
	items: MediaItem[];
	isLoading?: boolean;
	skeletonItems?: number;
};

const MediaSlider: React.FC<MediaSliderProps> = ({ items, isLoading, skeletonItems }) => {
	const skeletonItemsArr = Array.from({ length: skeletonItems || 5 });

	return (
		<Splide
			options={{
				perPage: 1,
				gap: 16,
				arrows: false,
				pagination: false,
				mediaQuery: "min",
				breakpoints: {
					768: {
						gap: 40,
						perPage: 2,
					},
					1440: {
						perPage: 3,
						gap: 40,
					},
				},
			}}
		>
			{isLoading
				? skeletonItemsArr.map((_, index) => (
						<SplideSlide key={index} className="h-auto">
							<MediaCardSkeleton />
						</SplideSlide>
					))
				: items.map((item) => (
						<SplideSlide key={`${item.media_type}-${item.id}`}>
							<MediaCard item={item} />
						</SplideSlide>
					))}
		</Splide>
	);
};

export default MediaSlider;
