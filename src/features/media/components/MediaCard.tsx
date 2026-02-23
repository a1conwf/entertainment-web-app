import { memo } from "react";
import { TrailerModal } from "@/features/media/components";
import { useTrailerPreview, useBookmarkActions, useMediaCardData } from "@/features/media/hooks";
import type { MediaItem } from "@/features/media/types";

import { IMAGE_BASE_URL } from "@/services/config";

import movieIcon from "@/assets/svg/icon-category-movie.svg";
import tvSeriesIcon from "@/assets/svg/icon-category-tv.svg";
import bookmarkEmptyIcon from "@/assets/svg/icon-bookmark-empty.svg";
import bookmarkFullIcon from "@/assets/svg/icon-bookmark-full.svg";
import playIcon from "@/assets/svg/icon-play.svg";

type MediaCardProps = {
	item: MediaItem;
};

const MediaCard: React.FC<MediaCardProps> = ({ item }) => {
	const { isBookmarked, handleBookmarkToggle } = useBookmarkActions(item);

	const { trailerKey, isTrailerLoading, handlePlayPreview, setTrailerKey } = useTrailerPreview(
		item.media_type,
		item.id,
	);

	const { title, releaseYear, adultRating, mediaType, mediaTypeText } = useMediaCardData(item);

	return (
		<article className="relative">
			<button
				className="group z-10 w-5 h-5 absolute top-1 right-1 bg-dark-blue/50 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 sm:w-8 sm:h-8 md:top-3 md:right-3"
				aria-label="Bookmark this item"
				onClick={handleBookmarkToggle}
			>
				<img
					src={isBookmarked ? bookmarkFullIcon : bookmarkEmptyIcon}
					alt="bookmark-icon"
					className="group-hover:brightness-0 transition-all duration-200 w-2 h-2 sm:w-auto sm:h-auto"
				/>
			</button>

			<div className="group relative mb-2 cursor-pointer">
				<img
					src={`${IMAGE_BASE_URL}${item.backdrop_path}`}
					alt={title}
					className="w-full aspect-video object-cover rounded-lg"
					loading="lazy"
				/>
				<div className="absolute inset-0 rounded-lg bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 flex items-center justify-center">
					<button
						type="button"
						onClick={handlePlayPreview}
						disabled={isTrailerLoading}
						className="flex items-center gap-3 rounded-full bg-white/25 px-4 py-2 hover:bg-white/35"
					>
						<img src={playIcon} alt="play-icon" />
						<span className="text-white font-medium text-sm">
							{isTrailerLoading ? "Loading..." : "Play"}
						</span>
					</button>
				</div>
			</div>

			<div className="flex flex-col gap-1">
				<ul className="flex items-center gap-1 [&>li]:text-[11px] [&>li]:opacity-75 [&>li+li]:before:mr-2 [&>li+li]:before:content-['•'] sm:gap-2 md:[&>li]:text-sm">
					<li>{releaseYear}</li>
					<li className="flex items-center gap-1">
						<img src={mediaType === "movie" ? movieIcon : tvSeriesIcon} alt={mediaTypeText} />
						{mediaTypeText}
					</li>
					<li>{adultRating}</li>
				</ul>
				<h4>{title}</h4>
			</div>

			{trailerKey && <TrailerModal youtubeKey={trailerKey} onClose={() => setTrailerKey(null)} />}
		</article>
	);
};

export default memo(MediaCard);
